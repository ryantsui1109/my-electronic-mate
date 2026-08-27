import { app, BrowserWindow, ipcMain, screen, Tray, Menu } from "electron";
import * as path from "path";
import { fileURLToPath } from "node:url";
import { isPackaged } from "electron-is-packaged";
import Store from "electron-store";
import menu from "./menu.js";

const store=new Store();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let prefix = "../";
if (isPackaged) {
  prefix = "../../../";
}

ipcMain.on("close-window", (e) => {
  const webContent = e.sender;
  const win = BrowserWindow.fromWebContents(webContent);
  win.close();
});
ipcMain.on("maximize-window", (e) => {
  const webContent = e.sender;
  const win = BrowserWindow.fromWebContents(webContent);
  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
});
ipcMain.on("minimize-window", (e) => {
  const webContent = e.sender;
  const win = BrowserWindow.fromWebContents(webContent);
  win.minimize();
});
ipcMain.on("resize", (e) => {
  const webContent = e.sender;
  const win = BrowserWindow.fromWebContents(webContent);
  win.setSize(800, 600);
});

ipcMain.handle("electron-store-get", async (event, key) => {
  return store.get(key);
});

ipcMain.handle("electron-store-set", async (event, key, val) => {
  store.set(key, val);
});

const startMate = ({ winMate }) => {
  winMate.loadFile(path.join(__dirname, prefix, "dist", "mate.html"));
  winMate.setAlwaysOnTop(true, "screen-saver");
};

app.whenReady().then(() => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  const tray = new Tray(path.resolve("assets/saijo_takato_head.png"));

  const winMate = new BrowserWindow({
    width: 250,
    height: 450,
    frame: false,
    x: width - 300,
    y: height - 450,
    transparent: true,
    type: "toolbar",
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
  });
  const contextMenu = Menu.buildFromTemplate(menu);
  tray.setToolTip("MEM by ryantsui");
  tray.setContextMenu(contextMenu);
  startMate({ winMate });
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) startMate({ win, winMate });
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
