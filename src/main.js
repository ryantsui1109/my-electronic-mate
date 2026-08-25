import { app, BrowserWindow,ipcMain } from "electron";
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
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
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

  win.loadFile(path.join(__dirname, prefix, "dist", "index.html"));
};

app.whenReady().then(() => {
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

