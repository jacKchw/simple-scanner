import { app } from "electron";
import { writeFile, readFileSync } from "fs";
import path from "path";

export class Config {
  private static instance: Config;
  private config: Record<string, any>;
  private fileName: string = "config.json";
  private filePath: string = path.join(app.getPath("userData"), this.fileName);

  public constructor() {
    this.config = {};
    this.loadConfig();
  }

  private loadConfig(): void {
    try {
      const data = readFileSync(this.filePath, "utf-8");
      this.config = JSON.parse(data);
    } catch (error) {
      console.error("Error loading config file:", error);
      this.config = {};
    }
  }

  private saveConfig(): void {
    try {
      const data = JSON.stringify(this.config, null, 2);
      writeFile(this.filePath, data, (err) => {
        if (err) {
          console.error("Error saving config file:", err);
        }
      });
    } catch (error) {
      console.error("Error saving config file:", error);
    }
  }

  public get(key: string): any {
    return this.config[key];
  }

  public set(key: string, value: any): void {
    this.config[key] = value;
    this.saveConfig();
  }
}
