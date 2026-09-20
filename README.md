# Streamer.bot HTML Alerts

Ever wanted to use Streamer.bot but you don't want to be dependent on StreamElements or StreamLabs?  
Well this is the repository for you!!

## Features

✓ Works(?)  
✓ Customizability  
✓ Sounds!!!!  
✓ Funni Gifs  
✓ Optional Mambo  

## Instructions

This assumes you have Streamer.bot setup.

1. Download [Streamer.bot HTML Overlay](https://docs.streamer.bot/guide/extra-features/html-overlay) and extract it.
2. Download the repository ZIP and extract it to the `Content` folder in HTML Overlay or clone it to the `Content` folder in HTML Overlay.
3. Navigate to the `Content` folder and open `index.html` with a text editor.
4. Underneath `<!-- Custom Overlay Commands -->` on a new line add `<script type="module" src="alerts.js"></script>`
5. Save and exit `index.html`
6. Open Streamer.bot and navigate to the left sidebar, look for 'Servers/Clients', click on it and find 'WebSocket Server'. Set it to 'Auto Start' and 'Start Server'. (It should be 127.0.0.1:8080/)
7. Now, if you're on Windows you're supposed to open the `HTMLWindowsOverlay.exe` executable but on Linux it does not seem to work with Wine and therefore I don't know how to use it.
8. On Linux or MacOS run `http-server.sh` inside of `Content` and go to http://localhost:8000/ on your browser. It should show a white screen, if it doesn't load you may not have python installed.
9. To test if the alerts are working you can head to Streamer.bot and on the left sidebar find 'Actions & Queues' then 'Actions'. Make a temporary action, select it, and in 'Triggers' you can right click and find `Add -> Twitch -> Channel -> Follow`. Right click the new 'Trigger' and press 'Simulate'. On the previous webpage it should show the alert and make a sound. (If the sound isn't blocked by your browser)
10. Now if your test worked you can modify the alerts to your liking. Edit `alerts.js` in the HTML Overlay `Contents` folder. Within `const CONFIG` you'll find different settings, like font (The default font may not work on your system by default), accent color, sounds, GIFs, volume, and text. When adding new GIFs or sound effects add them to the `Contents/effects` folder. The length of the alert is determined by the sound effect you use.
11. Once you're happy with your alerts you can add it to OBS as a `Browser Source` with the URL http://localhost:8000/
12. Have fun don't die :D
