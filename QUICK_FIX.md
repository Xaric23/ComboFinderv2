# White Screen Fix Guide

## Quick Diagnosis

**Run this first:**
```
Double-click: TROUBLESHOOTING.bat
```

This will open a diagnostic page that tests everything automatically.

---

## Common Causes & Fixes

### 1. **Browser Security (Most Common)**

**Problem:** Browsers block JavaScript from `file://` URLs

**Fix Options:**

#### Option A: Use Local Server (Best)
```
Double-click: START_WITH_SERVER.bat
```
Requires: Python or Node.js

#### Option B: Enable File Access in Browser

**Chrome:**
1. Close all Chrome windows
2. Right-click Chrome shortcut
3. Add to target: `--allow-file-access-from-files`
4. Example: `"C:\Program Files\Google\Chrome\Application\chrome.exe" --allow-file-access-from-files`

**Firefox:**
1. Type in address bar: `about:config`
2. Accept the risk
3. Search: `security.fileuri.strict_origin_policy`
4. Set to: `false`

**Edge:**
Same as Chrome but use Edge executable

---

### 2. **Missing Files**

**Check:** Do you see these files in the `dist` folder?
- `index.html`
- `assets/index-dNFuyEEd.js`
- `assets/index-CJEoHy2k.css`

**Fix:** Run `npm run build` again

---

### 3. **JavaScript Disabled**

**Check:** Is JavaScript enabled in your browser?

**Fix:**
- Chrome: Settings → Privacy → Site Settings → JavaScript → Allowed
- Firefox: Settings → Privacy → Permissions → Enable JavaScript
- Edge: Settings → Cookies and site permissions → JavaScript → Allowed

---

### 4. **Antivirus Blocking**

**Check:** Is your antivirus blocking the files?

**Fix:**
- Add exception for `C:\Games\ComboChecker\dist`
- Temporarily disable antivirus and test

---

## Press F12 in Browser

Open the browser console (F12) and look for errors:

### Common Errors:

**"CORS policy" error:**
→ Use START_WITH_SERVER.bat instead

**"Cannot read property of undefined":**
→ Try rebuilding: `npm run build`

**"Failed to fetch":**
→ Check internet connection
→ Commander Spellbook API might be down

**"Unexpected token '<'":**
→ File path issue, try server method

---

## Still Not Working?

1. **Try Different Browser**
   - Chrome
   - Firefox  
   - Edge

2. **Use Server Method**
   ```
   START_WITH_SERVER.bat
   ```

3. **Check Console**
   - Press F12
   - Go to Console tab
   - Copy any red errors
   - Search online for the specific error

4. **Test Manually**
   ```
   cd dist
   python -m http.server 8000
   ```
   Then open: http://localhost:8000

---

## Nuclear Option: Clean Rebuild

```bash
# Delete everything and start fresh
npm install
npm run build
```

Then try START_WITH_SERVER.bat

---

## Need More Help?

Open `dist/test.html` directly in browser - it will show you exactly what's wrong!
