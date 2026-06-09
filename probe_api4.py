#!/usr/bin/env python3
"""Find valid puzzle IDs and capture the first found schema."""
import asyncio, json, sys
if hasattr(sys.stdout, 'reconfigure'): sys.stdout.reconfigure(encoding='utf-8')

async def main():
    from playwright.async_api import async_playwright

    found = {}  # id -> response body

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page    = await browser.new_page(
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        )

        async def on_response(response):
            url = response.url
            if '/api/puzzle/P/' in url:
                try:
                    body = await response.body()
                    text = body.decode('utf-8', errors='replace')
                    pid  = url.split('/P/')[-1]
                    found[pid] = text
                except: pass

        page.on('response', on_response)

        # First load the main page to get a guest session
        await page.goto('https://play.xiangqi.com/puzzle', timeout=20000)
        await page.wait_for_timeout(2000)

        # Then navigate to the puzzle list / lobby to trigger puzzle API
        # Try clicking any puzzle link or button
        html = await page.content()
        # Find puzzle links in page
        links = await page.eval_on_selector_all(
            'a[href*="puzzle"]',
            'els => els.map(e => e.href)'
        )
        print('Puzzle links found:', links[:10])

        # Try navigating directly to a range of IDs
        for pid in [2, 3, 10, 50, 200, 500, 1000, 5000]:
            url = f'https://play.xiangqi.com/puzzle/{pid}'
            await page.goto(url, timeout=10000)
            await page.wait_for_timeout(1000)
            if pid in [str(i) for i in [2,3]] or str(pid) in found:
                print(f'  ID {pid}: {"FOUND" if str(pid) in found else "not found"}')

        await browser.close()

    print(f'\n=== Valid puzzle IDs found: {list(found.keys())} ===')
    for pid, body in list(found.items())[:5]:
        print(f'\n--- Puzzle {pid} ---')
        try:
            data = json.loads(body)
            if 'message' not in data:
                print(json.dumps(data, indent=2, ensure_ascii=False)[:4000])
            else:
                print(f'  Not found: {body}')
        except:
            print(body[:500])

asyncio.run(main())
