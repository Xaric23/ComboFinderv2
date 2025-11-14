⚠️ IMPORTANT - READ THIS FIRST ⚠️
=====================================

THE APP CANNOT RUN BY JUST OPENING index.html!

WHY?
----
The Commander Spellbook API blocks requests from file:// URLs
due to CORS (Cross-Origin Resource Sharing) security policy.

This is a browser security feature that cannot be bypassed.


HOW TO RUN THE APP:
==================

✅ EASIEST METHOD (Recommended):
-------------------------------
Double-click: EASY_START.bat

This will:
1. Auto-detect if you have Node.js or Python
2. Start a local web server
3. Open the app in your browser automatically

KEEP THE BLACK WINDOW OPEN while using the app!
Press Ctrl+C in that window to stop the server.


✅ IF EASY_START.BAT DOESN'T WORK:
---------------------------------
You need to install ONE of these (both are free):

Option A: Node.js (Recommended)
- Download: https://nodejs.org
- Install with default settings
- Run EASY_START.bat again

Option B: Python
- Download: https://python.org
- Install and check "Add to PATH"
- Run EASY_START.bat again


✅ ALTERNATIVE - Browser Extensions:
-----------------------------------
Install one of these browser extensions:

Chrome/Edge:
- "Web Server for Chrome"
- Point it to the 'dist' folder

VS Code Users:
- Install "Live Server" extension
- Right-click index.html → "Open with Live Server"


❌ WILL NOT WORK:
----------------
- Double-clicking index.html
- Using START_APP.bat (old method)
- Opening file directly in browser

These will show a white screen due to CORS errors.


WHAT IS CORS?
-------------
CORS prevents websites from making requests to APIs
when opened as local files for security reasons.

Running a local server solves this by serving the app
through HTTP protocol instead of file:// protocol.


NEED HELP?
----------
1. Make sure you have Node.js or Python installed
2. Run EASY_START.bat
3. Keep the black window open
4. The app will open at http://localhost:8080

Questions? Check QUICK_FIX.md for detailed troubleshooting.
