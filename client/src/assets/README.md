Place your site logo here:

- File path: client/src/assets/logo.png (or logo.svg)
- Recommended formats: SVG for crisp scaling; PNG allowed (128x128 or 256x256 recommended for header)

How to add the file:
1. Copy your logo into the assets folder. Example from project root (Windows PowerShell):
   ```
   cp "C:/path/to/your/logo.png" client/src/assets/logo.png
   ```

2. Commit and push:
   ```
   git add client/src/assets/logo.png
   git commit -m "Add logo asset"
   git push
   ```

3. The Header component imports '@/assets/logo.png'. If you use an SVG named logo.svg, update the import accordingly.

