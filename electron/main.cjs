const path = require('path');
const { app, BrowserWindow } = require('electron');

const isDev = !app.isPackaged;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 980,
    minHeight: 640,
    autoHideMenuBar: true,
    backgroundColor: '#1a1b26',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    return;
  }

  mainWindow.webContents.on('did-fail-load', (_event, code, description, validatedURL) => {
    const html = `
      <html>
        <body style="margin:0;font-family:system-ui;background:#1a1b26;color:#e6e9ef;display:grid;place-items:center;height:100vh;">
          <div style="max-width:720px;padding:24px;line-height:1.5;">
            <h2 style="margin-top:0;">No se pudo cargar la aplicacion</h2>
            <p>Error: ${code} - ${description}</p>
            <p>URL: ${validatedURL || 'n/a'}</p>
            <p>Verifica que la build de escritorio use rutas relativas (base=./).</p>
          </div>
        </body>
      </html>
    `;
    mainWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
  });

  mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
