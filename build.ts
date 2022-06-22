import spawn from "cross-spawn";
import { rm } from "fs";
import { join } from "path";
const cwd = __dirname;
/**
 * build typescript
 * @returns
 */
const build = () => {
  return new Promise((resolve) => {
    rm(join(__dirname, "dist"), { recursive: true, force: true }, () => {
      const child = spawn("tsc", { cwd: __dirname, stdio: "inherit" });
      child.on("close", () => {
        resolve(null);
      });
    });
  });
};
/**
 * get latest src commit hash
 * @returns
 */
const srcCommit = () => {
  return new Promise((resolve) => {
    let scriptOutput = "";
    const child = spawn("git", ["log", '--pretty=tformat:"%h"', "-n1", "src"], { cwd });
    if (child.stdout) {
      child.stdout.setEncoding("utf8");
      child.stdout.on("data", function (data) {
        //console.log("stdout: " + data);

        data = data.toString();
        scriptOutput += data;
      });
    }

    if (child.stderr) {
      child.stderr.setEncoding("utf8");
      child.stderr.on("data", function (data) {
        //console.log("stderr: " + data);

        data = data.toString();
        scriptOutput += data;
      });
    }

    child.on("close", function (_code) {
      resolve(scriptOutput);
    });
  });
};

build().then(() => {
  srcCommit().then((id) => {
    spawn("git", ["add", "dist"], { cwd });
    spawn("git", ["commit", "-m", `build from ${id}`], { cwd });
    console.log(`build from ${id}`);
  });
});
