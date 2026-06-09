#!/usr/bin/env python3
"""Navigate to specific puzzle pages and capture the full API response."""
import asyncio, json, sys
if hasattr(sys.stdout, 'reconfigure'): sys.stdout.reconfigure(encoding='utf-8')

async def main():
    from playwright.async_api import async_playwright

    captured = {}  # url -> body

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page    = await browser.new_page(
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        )

        async def on_response(response):
            url = response.url
            if '/api/puzzle/' in url and 'socket' not in url and 'themes' not in url:
                try:
                    body = await response.body()
                    text = body.decode('utf-8', errors='replace')
                    captured[url] = text
                    print(f'HIT: {url}  ({len(text)} bytes)')
                except Exception as e:
                    print(f'  err reading {url}: {e}')

        page.on('response', on_response)

        # Try navigating directly to puzzle pages
        for test_url in [
            'https://play.xiangqi.com/puzzle?lang=vi',
            'https://play.xiangqi.com/puzzle/1',
            'https://play.xiangqi.com/puzzle/100',
        ]:
            print(f'\n>>> GET {test_url}')
            await page.goto(test_url, timeout=20000)
            await page.wait_for_timeout(3000)

        # Also try clicking through on the main puzzle page
        print('\n>>> clicking start/next on main puzzle page...')
        await page.goto('https://play.xiangqi.com/puzzle?lang=vi', timeout=20000)
        await page.wait_for_timeout(2000)
        # Try to find and click a puzzle start button
        for sel in ['button:has-text("Start")', 'button:has-text("Play")',
                    'button:has-text("Solve")', '[data-testid="start-puzzle"]',
                    'a[href*="/puzzle/"]']:
            try:
                el = await page.query_selector(sel)
                if el:
                    print(f'  clicking: {sel}')
                    await el.click()
                    await page.wait_for_timeout(3000)
                    break
            except: pass

        await browser.close()

    print(f'\n=== {len(captured)} puzzle API responses ===')
    for url, body in list(captured.items())[:5]:
        print(f'\nURL: {url}')
        try:
            parsed = json.loads(body)
            print(json.dumps(parsed, indent=2, ensure_ascii=False)[:3000])
        except:
            print(body[:500])

asyncio.run(main())
