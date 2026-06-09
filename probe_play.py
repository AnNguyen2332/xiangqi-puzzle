#!/usr/bin/env python3
"""Click 'Play Puzzle', navigate through 5 puzzles, capture API schema."""
import asyncio, json, sys
if hasattr(sys.stdout, 'reconfigure'): sys.stdout.reconfigure(encoding='utf-8')

async def main():
    from playwright.async_api import async_playwright

    api_data = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page    = await browser.new_page(
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        )

        async def on_response(response):
            url = response.url
            if 'api.xiangqi.com' in url and 'socket' not in url and 'analytics' not in url:
                try:
                    body = (await response.body()).decode('utf-8', errors='replace')
                    api_data.append({'url': url, 'body': body})
                    print(f'API: {url[:80]}  ({len(body)}b)')
                except: pass

        page.on('response', on_response)

        print('1. Loading puzzle lobby...')
        await page.goto('https://play.xiangqi.com/puzzle', timeout=30000)
        await page.wait_for_timeout(2000)
        print(f'   URL: {page.url}')

        # Click the primary "Play Puzzle" button
        print('2. Clicking Play Puzzle...')
        try:
            el = await page.query_selector('.puzzle-room-btn.primary-btn')
            if el:
                await el.click()
                await page.wait_for_timeout(3000)
                print(f'   URL after click: {page.url}')
        except Exception as e:
            print(f'   Click failed: {e}')

        # Show what puzzle state we can extract
        state_js = await page.evaluate("""
        () => {
            function deepSearch(obj, target, depth=0) {
                if (!obj || depth > 8 || typeof obj !== 'object') return null;
                for (const k of Object.keys(obj)) {
                    if (k === target) return obj[k];
                    const r = deepSearch(obj[k], target, depth+1);
                    if (r) return r;
                }
                return null;
            }
            // React fiber search for fen
            function fiberSearch(fiber, depth=0) {
                if (!fiber || depth > 50) return null;
                const pending = fiber.pendingProps;
                const memo    = fiber.memoizedProps;
                for (const p of [pending, memo]) {
                    if (!p) continue;
                    const s = JSON.stringify(p);
                    if (s && s.includes('"fen"') && s.length < 20000) return s.slice(0,3000);
                }
                let s = fiber.memoizedState;
                while (s) {
                    const ms = s.memoizedState;
                    if (ms && typeof ms === 'object') {
                        const str = JSON.stringify(ms);
                        if (str && str.includes('"fen"') && str.length < 20000) return str.slice(0,3000);
                    }
                    s = s.next;
                }
                return fiberSearch(fiber.child, depth+1) || fiberSearch(fiber.sibling, depth+1);
            }
            const root = document.querySelector('#app');
            const fk = Object.keys(root).find(k => k.startsWith('__reactFiber') || k.startsWith('__reactIntern'));
            if (fk) return fiberSearch(root[fk]);
            return null;
        }
        """)
        print(f'\nReact state with fen: {state_js}')
        print(f'\nCurrent URL: {page.url}')
        print(f'\nTotal API calls: {len(api_data)}')

        await browser.close()

    print('\n=== All non-socket API responses ===')
    for d in api_data[:15]:
        print(f'\n{d["url"]}')
        try:
            parsed = json.loads(d['body'])
            # Only show if it has interesting keys
            keys = list(parsed.keys()) if isinstance(parsed, dict) else f'list[{len(parsed)}]'
            print(f'  keys: {keys}')
            if isinstance(parsed, dict) and any(k in str(parsed) for k in ['fen','move','position','piece']):
                print(json.dumps(parsed, indent=2, ensure_ascii=False)[:3000])
        except:
            print(f'  raw: {d["body"][:200]}')

asyncio.run(main())
