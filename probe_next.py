#!/usr/bin/env python3
"""
Find the 'Next puzzle' button on the solving page, list all buttons.
Also intercept how the next puzzle API call is triggered.
"""
import asyncio, json, sys
if hasattr(sys.stdout, 'reconfigure'): sys.stdout.reconfigure(encoding='utf-8')

async def main():
    from playwright.async_api import async_playwright
    api_calls = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page    = await browser.new_page(
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        )
        async def on_resp(r):
            if '/api/puzzle/C/' in r.url or '/api/puzzle/challenge' in r.url:
                try:
                    body = await r.body()
                    api_calls.append({'url': r.url, 'body': body.decode('utf-8')[:500]})
                except: pass
        page.on('response', on_resp)

        # Load lobby, enter puzzle
        await page.goto('https://play.xiangqi.com/puzzle', timeout=30000)
        await page.wait_for_timeout(2000)
        btn = await page.query_selector('.puzzle-room-btn.primary-btn')
        if btn:
            await btn.click()
            await page.wait_for_timeout(2500)
        print(f'Puzzle URL: {page.url}')

        # List ALL buttons on page
        buttons = await page.evaluate("""
        () => Array.from(document.querySelectorAll('button, [role=button], [class*=btn]'))
             .map(el => ({
                 tag: el.tagName,
                 cls: el.className.slice(0,80),
                 txt: el.textContent.slice(0,50).trim(),
                 vis: el.offsetWidth > 0,
             }))
             .filter(b => b.vis && b.txt)
             .slice(0,30)
        """)
        print('\n--- All visible buttons ---')
        for b in buttons:
            print(f'  [{b["tag"]}] "{b["txt"]}"  cls={b["cls"][:60]}')

        # Now: simulate solving the puzzle (just skip it)
        # Try clicking various "skip/next" candidates
        print('\n--- Trying to advance to next puzzle ---')
        for sel in [
            'button:has-text("Skip")', 'button:has-text("Next")',
            'button:has-text("Pass")', 'button:has-text("Give Up")',
            '[class*="skip"]', '[class*="next"]', '[class*="pass"]',
            'button:has-text("Go Easy")', 'button:has-text("Hint")',
        ]:
            try:
                el = await page.query_selector(sel)
                if el:
                    txt = await el.inner_text()
                    cls = await el.get_attribute('class') or ''
                    print(f'  Found: "{txt.strip()}"  sel={sel}  cls={cls[:60]}')
            except: pass

        print('\n--- API calls intercepted ---')
        for c in api_calls:
            print(f'{c["url"]}\n  {c["body"][:200]}\n')

        await browser.close()

asyncio.run(main())
