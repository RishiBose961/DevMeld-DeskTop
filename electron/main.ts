import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";

let mainWindow: BrowserWindow | null = null;
let splash: BrowserWindow | null = null;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

function createWindow() {
  splash = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
  });
  splash.loadFile(path.join(process.env.VITE_PUBLIC, "splash.html"));

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    show: false, // <-- don’t show until ready
    icon: path.join(process.env.VITE_PUBLIC, "favicon.png"),
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(RENDERER_DIST, "index.html"));
  }

  // Show when ready
  // mainWindow.once("ready-to-show", () => {
  //   if (splash) {
  //     splash.close();
  //   }
  //   if (mainWindow) {
  //     mainWindow.show();
  //   }
  // });

    if (splash) {
    // Keep splash visible for 5 seconds
    setTimeout(() => {
      splash?.close()
      splash = null
      mainWindow?.show()
    }, 5000) // 5000 ms = 5 sec
  } else {
    mainWindow?.show()
  }

  // Optional: send test message
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow?.webContents.send(
      "main-process-message",
      new Date().toLocaleString()
    );
  });
}

// App lifecycle
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    mainWindow = null;
  }
});

app.commandLine.appendSwitch(
  "disable-features",
  "OutOfBlinkCors,TranslateUI,MediaSessionService,HardwareMediaKeyHandling"
);
app.commandLine.appendSwitch("disable-renderer-backgrounding");
app.commandLine.appendSwitch("disable-background-timer-throttling");

app.disableHardwareAcceleration();

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
