import type IForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { EnvironmentPlugin } from "webpack";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: "webpack-infrastructure",
  }),
  new EnvironmentPlugin(["FILLESUFFIX"]),
];
