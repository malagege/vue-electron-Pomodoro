import {contextBridge, ipcRenderer } from 'electron';

const apiKey = 'electron';
/**
 * @see https://github.com/electron/electron/issues/21437#issuecomment-573522360
 */


const api = {
  versions: process.versions,
  maximize: ()=> ipcRenderer.send('window-maximize'),
  unmaximize: ()=> ipcRenderer.send('window-unmaximize'),
  minimize: ()=> ipcRenderer.send('window-minimize'),
  close: ()=> ipcRenderer.send('window-close'),
  enableWindowAlwaysOnTop: ()=> ipcRenderer.send('enable-window-always-on-top'),
  diseableWindowAlwaysOnTop: ()=> ipcRenderer.send('diseable-window-always-on-top'),
  getWindowAlwaysOnTop: ()=> ipcRenderer.sendSync('get-window-always-on-top'), //ipcRenderer.send('get-window-always-on-top'),
  
};
// [[ Day 9 ] - 動物聊天室(二) - IPC 與訊息交換 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10235110?sc=iThomeR)

/**
 * The "Main World" is the JavaScript context that your main renderer code runs in.
 * By default, the page you load in your renderer executes code in this world.
 *
 * @see https://www.electronjs.org/docs/api/context-bridge
 */
contextBridge.exposeInMainWorld(apiKey, api);
