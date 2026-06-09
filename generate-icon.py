#!/usr/bin/env python3
"""
Generates app launcher icons for all mipmap densities.
Design: dark bg, red border, red 将 character (matching logo).
"""
from PIL import Image, ImageDraw, ImageFont
import os, sys

BASE = os.path.dirname(os.path.abspath(__file__))
ANDROID_RES = os.path.join(BASE, "android", "app", "src", "main", "res")

SIZES = {
    "mipmap-mdpi":    48,
    "mipmap-hdpi":    72,
    "mipmap-xhdpi":   96,
    "mipmap-xxhdpi":  144,
    "mipmap-xxxhdpi": 192,
}

BG_COLOR      = (26, 8, 0, 255)         # #1a0800
INNER_BG      = (20, 6, 0, 255)         # slightly lighter
BORDER_OUTER  = (139, 0, 0, 255)        # #8b0000
BORDER_INNER  = (204, 32, 32, 220)      # #cc2020
TEXT_COLOR    = (204, 32, 32, 255)      # #cc2020

def find_font(size):
    """Find a CJK-capable font on Windows."""
    candidates = [
        r"C:\Windows\Fonts\msyh.ttc",        # Microsoft YaHei
        r"C:\Windows\Fonts\simsun.ttc",       # SimSun
        r"C:\Windows\Fonts\simhei.ttf",       # SimHei
        r"C:\Windows\Fonts\STKAITI.TTF",      # STKaiti
        r"C:\Windows\Fonts\STFANGSO.TTF",     # STFangsong
        r"C:\Windows\Fonts\msyhbd.ttc",       # Microsoft YaHei Bold
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                pass
    # Fallback: default font (won't render Chinese well)
    print("WARNING: No CJK font found, using fallback.")
    return ImageFont.load_default()

def generate_icon(size):
    img = Image.new("RGBA", (size, size), BG_COLOR)
    draw = ImageDraw.Draw(img)

    pad   = max(3, size // 20)
    r     = max(6, size // 12)   # corner radius

    # Outer rounded rect (dark red border)
    border_w = max(2, size // 24)
    draw.rounded_rectangle(
        [pad, pad, size - pad, size - pad],
        radius=r, outline=BORDER_OUTER, width=border_w
    )

    # Inner rounded rect (red border, thinner)
    pad2 = pad + border_w + max(2, size // 30)
    inner_w = max(1, size // 48)
    draw.rounded_rectangle(
        [pad2, pad2, size - pad2, size - pad2],
        radius=max(4, r - border_w), outline=BORDER_INNER, width=inner_w
    )

    # 将 character
    font_size = int(size * 0.58)
    font = find_font(font_size)
    char = "将"

    # Center the character
    bbox = draw.textbbox((0, 0), char, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    x = (size - w) // 2 - bbox[0]
    y = (size - h) // 2 - bbox[1] + int(size * 0.02)  # slight vertical nudge

    draw.text((x, y), char, font=font, fill=TEXT_COLOR)

    return img

def main():
    print("Generating app icons...")
    for folder, size in SIZES.items():
        out_dir = os.path.join(ANDROID_RES, folder)
        os.makedirs(out_dir, exist_ok=True)

        icon = generate_icon(size)
        path = os.path.join(out_dir, "ic_launcher.png")
        icon.save(path)

        round_icon = generate_round_icon(size)
        round_path = os.path.join(out_dir, "ic_launcher_round.png")
        round_icon.save(round_path)

        print(f"  {folder:20s} {size}x{size}px  ->  {path}")

    print("Done.")

def generate_round_icon(size):
    """Circular version of the icon."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Fill circle
    draw.ellipse([0, 0, size, size], fill=BG_COLOR)

    # Border
    border_w = max(2, size // 20)
    pad = border_w
    draw.ellipse([pad, pad, size - pad, size - pad],
                 outline=BORDER_OUTER, width=border_w)
    pad2 = pad + border_w + max(2, size // 30)
    draw.ellipse([pad2, pad2, size - pad2, size - pad2],
                 outline=BORDER_INNER, width=max(1, size // 48))

    # Character
    font_size = int(size * 0.58)
    font = find_font(font_size)
    char = "将"
    bbox = draw.textbbox((0, 0), char, font=font)
    w = bbox[2] - bbox[0]; h = bbox[3] - bbox[1]
    x = (size - w) // 2 - bbox[0]
    y = (size - h) // 2 - bbox[1] + int(size * 0.02)
    draw.text((x, y), char, font=font, fill=TEXT_COLOR)

    return img

main()
