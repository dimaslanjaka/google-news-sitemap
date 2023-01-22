import { spawn } from "cross-spawn";
import { rm, writeFile } from "fs";
import { join } from "path";
import pkg from "./package.json";
const cwd = __dirname;

/**
 * build typescript
 * @returns
 */
const build = () => {
  return new Promise((resolve) => {
    rm(join(__dirname, "dist"), { recursive: true, force: true }, () => {
      const child = spawn("tsc", { cwd: __dirname, stdio: "inherit" }, {});
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
  return new Promise((resolve: (id: string) => any) => {
    git("log", "--pretty=tformat:%h", "-n1", "src").then((data) => {
      resolve(data.stdout.trim());
    });
  });
};

/**
 * Update version based on commit
 */
const update = () => {
  srcCommit().then((id) => {
    git("describe", "--tags").then((data) => {
      const describe = data.stdout.trim().split("-");
      const current = pkg.version.split("-");
      current[1] = describe[1];
      current[2] = id;
      const newVersion = current.join("-");
      console.log("version build", newVersion);
      // pkg.version = newVersion;
      writeFile(join(__dirname, "package.json"), JSON.stringify(pkg, null, 2) + "\n", () => {
        git("add", "package*.json").then(() => {
          git("commit", "-m", `update from ${id}`);
        });
      });
    });
  });
};

build().then(() => {
  srcCommit().then((id) => {
    spawn("git", ["add", "dist"], { cwd }).on("close", () => {
      spawn("git", ["commit", "-m", `build from ${id}`], { cwd }).on("close", () => {
        console.log(`success build from ${id}`);
        update();
      });
    });
  });
});

/**
 * git command
 * @param args
 * @returns
 */
function git(...args: string[]) {
  return spawnPromise("git", ...args);
}

function spawnPromise(...args: string[]) {
  return new Promise(
    (
      resolve: (args: { code: number; stdout: string; stderr: string }) => any,
      reject: (args: { args: string[]; err: Error }) => any
    ) => {
      const cmd = args[0];
      args.shift();
      const child = spawn(cmd, args, {
        cwd: __dirname,
      });
      let stdout = "";
      child.stdout?.on("data", (chunk) => {
        stdout += chunk;
      });
      let stderr = "";
      child.stderr?.on("data", (chunk) => {
        stderr += chunk;
      });
      child.on("close", function (code) {
        // Should probably be 'exit', not 'close'
        // *** Process completed
        return resolve({
          code: parseInt(String(code)),
          stdout: stdout.trim(),
          stderr: stderr.trim(),
        });
      });
      child.on("error", function (err) {
        // *** Process creation failed
        return reject({ args: args, err: err });
      });
    }
  );
}
