#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const { exec } = require("child_process");
const readline = require("readline");
const chalk = require("chalk");
const crypto = require("crypto");

const args = process.argv.slice(2);

/* ===============================
   HELP COMMAND
================================= */
if (!args[0] || args.includes("--help") || args.includes("-h")) {
  console.log(
    chalk.cyan(`
Usage:
  npx express-create-backend <project-name>
  npx express-create-backend@latest <project-name>

Examples:
  npx express-create-backend my-backend
  npx express-create-backend api-v2

Options:
  --help, -h     Show this help message
`),
  );
  process.exit(0);
}

const folderName = args[0].trim();
if (!folderName || folderName === ".") {
  console.error(chalk.red("Error: Please provide a valid project name"));
  console.log(
    chalk.yellow("Example: npx express-create-backend my-backend-app"),
  );
  process.exit(1);
}

const targetPath = path.resolve(process.cwd(), folderName);
const templatePath = path.join(__dirname, "templates");

// Validate path to prevent path traversal
const relativePath = path.relative(process.cwd(), targetPath);
const isSubdirectory = relativePath && !relativePath.startsWith("..") && !path.isAbsolute(relativePath);

if (!isSubdirectory) {
  console.error(
    chalk.red("Error: Project folder must be a subdirectory of the current working directory"),
  );
  process.exit(1);
}

console.log(
  chalk.blue(
    `\nCreating production-ready Express backend → ${chalk.bold(folderName)}`,
  ),
);
console.log(chalk.dim(`Target directory: ${targetPath}\n`));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/* ===============================
   SAFE EXIT HANDLER
================================= */
let isExiting = false;
function safeExit(code = 0) {
  if (isExiting) return;
  isExiting = true;
  try {
    rl.close();
  } catch (e) {}
  process.exit(code);
}
process.on("SIGINT", () => {
  console.log(chalk.red("\nCancelled by user"));
  safeExit(0);
});

/* ===============================
   ASK QUESTION UTILITY
================================= */
const askQuestion = (query) =>
  new Promise((resolve) =>
    rl.question(query, (answer) => resolve(answer.trim().toLowerCase())),
  );

/* ===============================
   MAIN FUNCTION
================================= */
(async function main() {
  try {
    // Check if folder exists
    if (await fs.pathExists(targetPath)) {
      console.log(
        chalk.yellow(`Directory ${chalk.bold(folderName)} already exists.`),
      );

      const answer = await askQuestion(
        chalk.yellow("Do you want to overwrite it? [y/N]: "),
      );
      if (!["y", "yes"].includes(answer)) {
        console.log(chalk.red("Operation cancelled."));
        return safeExit(0);
      }

      console.log(chalk.yellow("Removing existing directory..."));
      await fs.remove(targetPath);
    }

    console.log(chalk.green("Creating project from template..."));
    await fs.copy(templatePath, targetPath);
    console.log(chalk.green("✓ Template copied successfully"));

    // Generate secure random JWT secret and replace default in target .env
    const destEnvPath = path.join(targetPath, ".env");
    if (await fs.pathExists(destEnvPath)) {
      let envContent = await fs.readFile(destEnvPath, "utf8");
      const secureSecret = crypto.randomBytes(32).toString("hex");
      envContent = envContent.replace("JWT_SECRET=supersecretkey", `JWT_SECRET=${secureSecret}`);
      await fs.writeFile(destEnvPath, envContent, "utf8");
    }

    // Detect the package manager that launched the CLI
    const userAgent = process.env.npm_config_user_agent || "";
    let packageManager = "npm";
    if (userAgent.includes("pnpm")) {
      packageManager = "pnpm";
    } else if (userAgent.includes("yarn")) {
      packageManager = "yarn";
    } else if (userAgent.includes("bun")) {
      packageManager = "bun";
    }

    const installCommand = `${packageManager} install`;

    console.log(
      chalk.yellow(
        `\nInstalling dependencies using ${packageManager} (this may take a few minutes)...`,
      ),
    );
    await new Promise((resolve, reject) => {
      const install = exec(installCommand, { cwd: targetPath });
      install.stdout.pipe(process.stdout);
      install.stderr.pipe(process.stderr);
      install.on("exit", (code) =>
        code === 0 ? resolve() : reject(new Error(`${installCommand} failed`)),
      );
    });

    console.log(chalk.green.bold("\nSuccess! Your backend is ready 🚀"));
    console.log(`  ${chalk.cyan("cd")} ${folderName}`);
    console.log(`  ${chalk.cyan("npm start")}\n`);

    safeExit(0);
  } catch (err) {
    console.error(chalk.red("\nError occurred:"), err.message || err);
    safeExit(1);
  }
})();
