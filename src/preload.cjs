const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  send: (channel, args) => ipcRenderer.send(channel, args),
});

contextBridge.exposeInMainWorld("electronStore", {
  get: (key) => ipcRenderer.invoke("electron-store-get", key),
  set: (key, val) => ipcRenderer.invoke("electron-store-set", key, val),
});