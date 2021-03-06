const flask = require("codeflask");
const { app, BrowserWindow, Menu } = require("electron");
const url = require("url");
const path = require("path");

if (process.env.NODE_ENV != "production") {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "../node_modules", ".bin", "electron"),
  });
}

let mainWindow;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences:{
      nodeIntegration: true,
    }
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "views/index.html"),
      protocol: "file",
      slashes: true,
    })
  );
  const mainMenu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on("closed", () => {
    app.quit();
  });
});

const templateMenu = [
  {
    label: "File",
    submenu: [
      {
        label: "Clean",
        click() {},
      },
      {
        label: "Exit",
        click() {
          app.quit();
        },
      },
    ],
  },
];

if (process.env.NODE_ENV !== "production") {
  templateMenu.push({
    label: "DevTools",
    submenu: [
      {
        label: "Show/Hide Dev Tools",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: "reload",
      },
    ],
  });
}
