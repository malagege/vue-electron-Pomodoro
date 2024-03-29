import {app, BrowserWindow, ipcMain, powerMonitor} from 'electron';
import {join} from 'path';
import {URL} from 'url';


// [[ Day 9 ] - 動物聊天室(二) - IPC 與訊息交換 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10235110)
// 退出程序
ipcMain.on('window-close', function () {
  app.quit();  // 多視窗處理 https://segmentfault.com/a/1190000038480763
  // 但我改用 window.close();
});
// 最小化
ipcMain.on('window-minimize', function () {
  mainWindow.minimize();
});
// 全屏
ipcMain.on('window-maximize', function () {
  if(mainWindow.isMaximized()){
    mainWindow.unmaximize();
  }else{
    mainWindow.maximize();
  }
});

// 退出全屏
// [環境 | Electron + Python + Vue. 採坑筆記 | by d.l.spm | Medium](https://cbb104002.medium.com/%E7%92%B0%E5%A2%83-electron-python-vue-fa164eb20250)
ipcMain.on('window-unmaximize', function () {
  mainWindow.unmaximize();
});

ipcMain.on('enable-window-always-on-top', function () {
  mainWindow.setAlwaysOnTop(true);
});

ipcMain.on('diseable-window-always-on-top', function () {
  mainWindow.setAlwaysOnTop(false);
});

ipcMain.on('get-window-always-on-top', function (event) {
  event.returnValue = mainWindow.isAlwaysOnTop();
});

ipcMain.on('open-notify-window', function (event, args) {
  if( notifyWindow?.isVisible() ){

    let hash = 'notifyWindow';
    let urlParam  = args;
    const pageUrl = import.meta.env.MODE === 'development' && import.meta.env.VITE_DEV_SERVER_URL !== undefined
    ? import.meta.env.VITE_DEV_SERVER_URL+`#/${hash || ''}${urlParam}`
    : new URL(`../renderer/dist/index.html#/${hash || ''}${urlParam}`, 'file://' + __dirname).toString();

    notifyWindow.loadURL(pageUrl);
    notifyWindow.focus();
  }else{
    let closeEvent = () => {
      notifyWindow = null;
    };
    createWindow('notifyWindow',{width:600,height: 300}, args, closeEvent, (win) => notifyWindow=win);
  }
});

ipcMain.on('window-show', function () {
  mainWindow.show();
});


ipcMain.on('get-window-desktop-idle', function (event) {
  event.returnValue = powerMonitor.getSystemIdleTime();
});

ipcMain.on('check-update', function(){
  // import {checkForUpdates} from './updater.js'; // 會發生  error  Parsing error: 'import' and 'export' may only appear at the top level
  (() => import('./updater.js'))().then(({checkForUpdates})=> checkForUpdates());
});


const isSingleInstance = app.requestSingleInstanceLock();

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

app.disableHardwareAcceleration();

// Install "Vue.js devtools"
if (import.meta.env.MODE === 'development') {
  app.whenReady()
    .then(() => import('electron-devtools-installer'))
    .then(({default: installExtension, VUEJS3_DEVTOOLS}) => installExtension(VUEJS3_DEVTOOLS, {
      loadExtensionOptions: {
        allowFileAccess: true,
      },
    }))
    .catch(e => console.error('Failed install extension:', e));
}

let mainWindow = null;
/*eslint-disable no-unused-vars*/
let notifyWindow = null;

const createWindow = async (hash,{width,height} = {width:200,height:600}, urlParam = '',closeEvent,chgWindowFun) => {
  let tmpWindow = new BrowserWindow({
    show: false, // Use 'ready-to-show' event to show window
    webPreferences: {
      nativeWindowOpen: true,
      preload: join(__dirname, '../../preload/dist/index.cjs'),
      // nodeIntegration: true,
      // contextIsolation: false
    },
    alwaysOnTop: true,
    width,height,
    frame: false,
    transparent: true,
    // resizable: false,
    parent: mainWindow,
  });

  if(mainWindow == null){
    mainWindow = tmpWindow;
  }

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  tmpWindow.on('ready-to-show', () => {
    tmpWindow?.show();

    if (import.meta.env.MODE === 'development') {
      tmpWindow?.webContents.openDevTools();
    }
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl = import.meta.env.MODE === 'development' && import.meta.env.VITE_DEV_SERVER_URL !== undefined
    ? import.meta.env.VITE_DEV_SERVER_URL+`#/${hash || ''}${urlParam}`
    : new URL(`../renderer/dist/index.html#/${hash || ''}${urlParam}`, 'file://' + __dirname).toString();

  if(closeEvent){
    tmpWindow.on('close',closeEvent);
  }
  if(chgWindowFun){
    chgWindowFun(tmpWindow);
  }
  await tmpWindow.loadURL(pageUrl);
};


app.on('second-instance', () => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.whenReady()
  .then(createWindow)
  // .then(() => createWindow('about',{width:200,height: 200}))
  .catch((e) => console.error('Failed create window:', e));


// Auto-updates
if (import.meta.env.PROD) {
  app.whenReady()
    .then(() => import('electron-updater'))
    .then(({autoUpdater}) => autoUpdater.checkForUpdatesAndNotify({
      title: '程式已經準備好更新',
      body: '{appName} 版本 {version} 已經下載完成，重開應用程式可進行安裝',
    }))
    .catch((e) => console.error('Failed check updates:', e));
}

