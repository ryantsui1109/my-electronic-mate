import { app, BrowserWindow, ipcMain, screen, Tray, Menu } from "electron";
import * as path from "path";
import { fileURLToPath } from "node:url";
import { isPackaged } from "electron-is-packaged";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let prefix = "../";
if (isPackaged) {
  prefix = "../../../";
}

const createWindow = () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
  });
  const winMate = new BrowserWindow({
    width: 250,
    height: 450,
    frame: false,
    x: width - 250,
    y: height - 450,
    transparent: true,
    type: "toolbar",
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  ipcMain.on("close-window", () => {
    win.close();
  });
  ipcMain.on("maximize-window", () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });
  ipcMain.on("minimize-window", () => {
    win.minimize();
  });
  ipcMain.on("resize", () => {
    win.setSize(800, 600);
  });
  winMate.loadFile(path.join(__dirname, prefix, "dist", "mate.html"));
  winMate.setAlwaysOnTop(true, "screen-saver");
  win.loadFile(path.join(__dirname, prefix, "dist", "index.html"));
};

app.whenReady().then(() => {
  const tray = new Tray(path.resolve("assets/saijo_takato_head.png"));
  const contextMenu = Menu.buildFromTemplate([
    { label: "MEM by ryantsui" },
    { label: "============" },
    { label: "Exit" },
    { label: "Open Configuration" },
    { label: "Run on startup" },
  ]);
  tray.setToolTip("MEM by ryantsui");
  tray.setContextMenu(contextMenu);
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
