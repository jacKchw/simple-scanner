// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron/renderer";

export interface ElectronAPI {
  saveFile: (data: string[]) => Promise<string>;
}

contextBridge.exposeInMainWorld("electronAPI", {
  saveFile: (data: string[]) => ipcRenderer.invoke("dialog:saveFile", data),
});
