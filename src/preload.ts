// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron/renderer";

export interface ElectronAPI {
  saveFile: () => Promise<string>;
}

contextBridge.exposeInMainWorld("electronAPI", {
  saveFile: () => ipcRenderer.invoke("dialog:saveFile"),
});
