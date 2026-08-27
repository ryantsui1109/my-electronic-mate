import { BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { fileURLToPath } from "url";
import { isPackaged } from "electron-is-packaged";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let prefix = "../";
if (isPackaged) {
  prefix = "../../../";
}

function startConfiguration() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
  });
  win.loadFile(path.join(__dirname, prefix, "dist", "index.html"));
}

export default startConfiguration;
