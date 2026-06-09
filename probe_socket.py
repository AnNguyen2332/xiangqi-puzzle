#!/usr/bin/env python3
"""
Intercept Socket.IO messages and window state from the puzzle page.
Also try extracting from the Redux store directly.
"""
import asyncio, json, sys
if hasattr(sys.stdout, 'reconfigure'): sys.stdout.reconfigure(encoding='utf-8')

async def main():
    from playwright.async_api import async_playwright

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page    = await browser.new_page(
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        )

        # Intercept ALL socket.io polling responses for puzzle data
        socket_msgs = []
        async def on_response(response):
            url = response.url
            if 'socket.io' in url and 'transport=polling' in url:
                try:
                    body = (await response.body()).decode('utf-8', errors='replace')
                    if 'fen' in body.lower() or 'puzzle' in body.lower() or 'move' in body.lower():
                        socket_msgs.append(body[:3000])
                except: pass

        page.on('response', on_response)

        print('Loading main puzzle page...')
        await page.goto('https://play.xiangqi.com/puzzle', timeout=30000)
        await page.wait_for_timeout(5000)  # wait longer for socket data

        # Try to get puzzle data from Redux store or window globals
        state = await page.evaluate("""
        () => {
            // Try Redux store
            const root = document.querySelector('#app');
            const fiberKey = Object.keys(root).find(k => k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'));
            function findRedux(fiber) {
                if (!fiber) return null;
                if (fiber.memoizedState) {
                    const s = fiber.memoizedState;
                    if (s.queue && s.queue.dispatch) {
                        // This is a useState hook
                    }
                }
                return findRedux(fiber.child) || findRedux(fiber.sibling);
            }

            // Try window globals
            const globals = {};
            for (const k of Object.keys(window)) {
                if (k.startsWith('_') || k === 'location' || k === 'document') continue;
                try {
                    const v = window[k];
                    if (v && typeof v === 'object') {
                        const s = JSON.stringify(v);
                        if (s.includes('"fen"') || s.includes('"puzzle"')) {
                            globals[k] = s.slice(0, 1000);
                        }
                    }
                } catch(e) {}
            }

            // Try localStorage for puzzle data
            const ls = {};
            for (let i=0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const val = localStorage.getItem(key);
                if (val && (val.includes('fen') || val.includes('puzzle'))) {
                    ls[key] = val.slice(0, 500);
                }
            }

            return { globals: Object.keys(globals).slice(0, 5), ls };
        }
        """)
        print('Window globals with fen/puzzle:', state)

        # Try to click the first puzzle
        print('\nLooking for puzzle UI...')
        content = await page.content()
        # Find if there's board data in DOM
        board_data = await page.evaluate("""
        () => {
            // Look for React component data
            const allEls = document.querySelectorAll('[class*="puzzle"], [class*="board"], [class*="chess"]');
            return Array.from(allEls).slice(0, 10).map(el => ({
                tag: el.tagName,
                cls: el.className.slice(0, 60),
                txt: el.textContent.slice(0, 100)
            }));
        }
        """)
        print('Board elements:', json.dumps(board_data, indent=2, ensure_ascii=False))

        await page.wait_for_timeout(3000)

        # Try extracting current puzzle by looking at the page after it's loaded
        puzzle_data = await page.evaluate("""
        () => {
            // Look in React fiber tree for puzzle state
            function traverse(node, depth=0) {
                if (!node || depth > 30) return null;
                if (node.memoizedState) {
                    let s = node.memoizedState;
                    while (s) {
                        if (s.memoizedState && typeof s.memoizedState === 'object') {
                            const str = JSON.stringify(s.memoizedState);
                            if (str && str.includes('"fen"')) return str.slice(0, 2000);
                        }
                        s = s.next;
                    }
                }
                return traverse(node.child, depth+1) || traverse(node.sibling, depth+1);
            }
            const root = document.querySelector('#app');
            const fk = Object.keys(root).find(k => k.startsWith('__reactFiber') || k.startsWith('__reactIntern'));
            if (fk) return traverse(root[fk]);
            return null;
        }
        """)
        print('\nReact fiber puzzle data:', puzzle_data)

        await browser.close()

    print(f'\nSocket messages with puzzle data: {len(socket_msgs)}')
    for m in socket_msgs[:5]:
        print(m[:500])

asyncio.run(main())
