#!/usr/bin/env python3
"""Probe xiangqi.com puzzle API — dump first response to see JSON schema."""
import asyncio, json, sys
if hasattr(sys.stdout, 'reconfigure'): sys.stdout.reconfigure(encoding='utf-8')

async def main():
    from playwright.async_api import async_playwright
    captured = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        )

        async def on_response(response):
            url = response.url
            if 'api.xiangqi.com' in url or 'puzzle' in url.lower():
                try:
                    body = await response.body()
                    text = body.decode('utf-8', errors='replace')
                    captured.append({'url': url, 'body': text[:5000]})
                    print(f'CAPTURED: {url}')
                except Exception as e:
                    print(f'  err: {e}')

        page.on('response', on_response)
        await page.goto('https://play.xiangqi.com/puzzle?lang=vi', timeout=30000)
        await page.wait_for_timeout(5000)
        await browser.close()

    print(f'\n--- {len(captured)} responses ---\n')
    for c in captured[:8]:
        print(f'\nURL: {c["url"]}')
        print(f'BODY: {c["body"][:2000]}')
        print('---')

asyncio.run(main())
