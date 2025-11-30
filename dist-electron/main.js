import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
let mainWindow = null;
let splash = null;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
function createWindow() {
  splash = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    transparent: true
  });
  splash.loadFile(path.join(process.env.VITE_PUBLIC, "splash.html"));
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    show: false,
    // <-- don’t show until ready
    icon: path.join(process.env.VITE_PUBLIC, "favicon.png"),
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  if (splash) {
    setTimeout(() => {
      splash == null ? void 0 : splash.close();
      splash = null;
      mainWindow == null ? void 0 : mainWindow.show();
    }, 5e3);
  } else {
    mainWindow == null ? void 0 : mainWindow.show();
  }
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow == null ? void 0 : mainWindow.webContents.send(
      "main-process-message",
      (/* @__PURE__ */ new Date()).toLocaleString()
    );
  });
}
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
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
