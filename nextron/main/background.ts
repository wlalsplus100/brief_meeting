import path from 'path';
import { BrowserWindow, app, ipcMain } from 'electron';
import serve from 'electron-serve';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

async function createMainWindow(port: string, preloadPath: string) {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: preloadPath,
    },
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home');
  } else {
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

  return mainWindow;
}

async function createSecondWindow(port: string, preloadPath: string) {
  const secondWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: preloadPath,
    },
  });

  if (isProd) {
    await secondWindow.loadURL('app://./home');
  } else {
    await secondWindow.loadURL(`http://localhost:${port}/home`);
    secondWindow.webContents.openDevTools();
  }

  return secondWindow;
}

app.whenReady().then(() => {
  const preloadPath = path.join(__dirname, 'preload.js');
  const port = process.argv[2] || '3000'; // Default port 3000

  createMainWindow(port, preloadPath);

  // Check command-line arguments to determine whether to open a second window
  if (process.argv[3].includes('--second-window')) {
    createSecondWindow(port, preloadPath);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  // Add any cleanup tasks here if needed
});

ipcMain.on('message', async (event, arg) => {
  // Echo the message back to the sender
  event.reply('message', `${arg} World!`);
});
