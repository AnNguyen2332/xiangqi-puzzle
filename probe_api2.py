#!/usr/bin/env python3
"""Probe: get guest JWT then fetch puzzle data directly."""
import asyncio, json, sys, urllib.request
if hasattr(sys.stdout, 'reconfigure'): sys.stdout.reconfigure(encoding='utf-8')

def api_get(url, jwt=None):
    headers = {
        'Origin':     'https://play.xiangqi.com',
        'Referer':    'https://play.xiangqi.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept':     'application/json',
    }
    if jwt:
        headers['Authorization'] = f'Bearer {jwt}'
    req = urllib.request.Request(url, headers=headers)
    r   = urllib.request.urlopen(req, timeout=15)
    return json.loads(r.read())

async def main():
    from playwright.async_api import async_playwright

    # ── Step 1: grab guest JWT via browser ──────────────────────────────────
    jwt_token  = None
    puzzle_resps = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page    = await browser.new_page(
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        )

        async def on_response(response):
            nonlocal jwt_token
            url = response.url
            if 'guest_jwt' in url:
                try:
                    data = await response.json()
                    jwt_token = data.get('jwt')
                    print(f'JWT obtained (first 40 chars): {jwt_token[:40]}...')
                except: pass
            if '/api/puzzle/P/' in url:
                try:
                    body = await response.body()
                    text = body.decode('utf-8', errors='replace')
                    puzzle_resps.append({'url': url, 'body': text})
                    print(f'Puzzle API: {url}')
                except: pass

        page.on('response', on_response)
        # Go to a puzzle page to trigger the puzzle API
        await page.goto('https://play.xiangqi.com/puzzle', timeout=30000)
        await page.wait_for_timeout(4000)
        await browser.close()

    print(f'\nJWT: {jwt_token[:20] if jwt_token else "none"}')
    print(f'Puzzle API responses intercepted: {len(puzzle_resps)}')

    # ── Step 2: show puzzle API response bodies ──────────────────────────────
    for r in puzzle_resps[:3]:
        print(f'\n=== {r["url"]} ===')
        print(r['body'][:3000])

    # ── Step 3: try direct call with JWT ────────────────────────────────────
    if jwt_token:
        print('\n--- Direct API call with JWT ---')
        try:
            data = api_get('https://api.xiangqi.com/api/puzzle/P/100', jwt_token)
            print(json.dumps(data, indent=2, ensure_ascii=False)[:3000])
        except Exception as e:
            print(f'Direct call failed: {e}')

asyncio.run(main())
