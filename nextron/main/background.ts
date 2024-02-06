import path from 'path';
import { BrowserWindow, app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';


const windows: BrowserWindow[] = [];
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

async function createNewWindow() {
  const newWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  windows.push(newWindow);
  if (isProd) {
    await newWindow.loadURL('app://./home');
  } else {
    const port = process.argv[2];
    await newWindow.loadURL(`http://localhost:${port}/home`);
    newWindow.webContents.openDevTools();
  }

  return newWindow;
}

app.whenReady().then(createNewWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  windows.forEach(window => {
    window.close();
  });
});

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`);
});
