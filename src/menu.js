import startConfiguration from "./startConfiguration.js";

const menu = [
  { label: "MEM by ryantsui" },
  { label: "============" },

  {
    label: "Open Configuration",
    click: () => {
      startConfiguration();
    },
  },
  { label: "Run on startup", type: "checkbox" },
  {
    label: "Exit",
    role: "quit",
  },
];
export default menu;
