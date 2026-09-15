import startConfiguration from "./startConfiguration.js";

export const trayMenu = [
  { label: "MEM by ryantsui", enabled: false },
  { type: "separator" },
  {
    label: "Open Configuration",
    accelerator: "CommandOrControl+,",
    click: () => {
      startConfiguration();
    },
  },
  { label: "Run on startup", type: "checkbox" },
  { type: "separator" },
  {
    label: "Exit",
    role: "quit",
  },
];

const editMenu = {
  label: "Edit",
  submenu: [
    { role: "undo" },
    { role: "redo" },
    { type: "separator" },
    { role: "cut" },
    { role: "copy" },
    { role: "paste" },
    { role: "selectAll" },
  ],
};

export function buildAppMenu(appName) {
  if (process.platform === "darwin") {
    return [{ label: appName, submenu: trayMenu }, editMenu];
  }
  return [{ label: "File", submenu: trayMenu }, editMenu];
}
