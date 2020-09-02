const { app, BrowserWindow } = require('electron')
const url = require("url");
const path = require("path");
const ipcMain = require('electron').ipcMain;

let mainWindow

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		},
		frame: false
	})

	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, `/dist/scheduling-app/index.html`),
			protocol: "file:",
			slashes: true
		})
	);

	mainWindow.setMenuBarVisibility(false)

	mainWindow.on('closed', function () {
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
	if (mainWindow === null) createWindow()
})

ipcMain.on('close-window', () => {
	mainWindow.close();
})

ipcMain.on('maximize-window', () => {
	mainWindow.maximize();
})

ipcMain.on('unmaximize-window', () => {
	mainWindow.unmaximize();
})

ipcMain.on('minimize-window', () => {
	mainWindow.minimize();
})