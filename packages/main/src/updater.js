/**
 * updater.js
 *
 * Please use manual update only when it is really required, otherwise please use recommended non-intrusive auto update.
 *
 * Import steps:
 * 1. create `updater.js` for the code snippet
 * 2. require `updater.js` for menu implementation, and set `checkForUpdates` callback from `updater` for the click property of `Check Updates...` MenuItem.
 */
 import { dialog } from 'electron';
 import { autoUpdater } from 'electron-updater';
 // let updater
 autoUpdater.autoDownload = false;
 
 autoUpdater.on('error', (error) => {
   dialog.showErrorBox('Error: ', error == null ? 'unknown' : (error.stack || error).toString());
 });
 
 autoUpdater.on('update-available', (info) => {
   dialog.showMessageBox({
     type: 'info',
     title: '更新提示',
     message: '發現有新版本'+ info.version +'，是否更新？',
     buttons: ['更新', '不要'],
     cancelId: 1,
   }).then(index => {
     if (index.response == 0) {
       autoUpdater.downloadUpdate();
     }
     else {
       // updater.enabled = true
       // updater = null
     }
   });
 });
 
 autoUpdater.on('update-not-available', () => {
   dialog.showMessageBox({
     title: '提示',
     message: '暫無更新',
   });
   // updater.enabled = false
   // updater = null
 });
 
 autoUpdater.on('update-downloaded', () => {
   dialog.showMessageBox({
     type: 'info',
     title: '安裝更新',
     buttons: ['安裝', '稍後安裝'],
     message: '安裝包已經下載完畢，是否現在安裝？',
     cancelId: 1,
   }).then(index => {
     if (index.response == 0) {
       autoUpdater.quitAndInstall();
     }
   });
 });
 
 // export this to MenuItem click callback
 export function checkForUpdates() {
   // updater = menuItem
   // updater.enabled = false
   autoUpdater.checkForUpdates();
 }
 