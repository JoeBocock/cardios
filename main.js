const { app, BrowserWindow } = require('electron');

function createWindow () {
    const win = new BrowserWindow({
        minWidth: 1280,
        maxWidth: 1280,
        minHeight: 800,
        maxHeight: 800,
        width: 1280,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('index.html');
    // win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
