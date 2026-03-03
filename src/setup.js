import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";

async function generateProjectFiles(answers) {
  console.log(
    chalk.blueBright("\nProject name confirmation:"),
    chalk.green(answers.projectConfirm),
  );
  console.log(
    chalk.blueBright("Project framework:"),
    chalk.cyan(answers.framework),
  );
  console.log(
    chalk.blueBright("Project database:"),
    chalk.yellow(answers.database),
  );
  console.log(
    chalk.blueBright("Project authType:"),
    chalk.magenta(answers.authType),
  );
}

export async function createBoilerPlate(options) {
  const answers = await inquirer.prompt([
    {
      name: "projectConfirm",
      type: "confirm",
      message: `Are you sure about the project name ${chalk.yellow(options)}?`,
    },
    {
      name: "framework",
      type: "select",
      message: "Choose a Framework for your project:",
      choices: [
        { name: chalk.green("Express"), value: "Express" },
        { name: chalk.blue("Fastify"), value: "Fastify" },
        { name: chalk.magenta("Hono"), value: "Hono" },
      ],
    },
    {
      name: "database",
      type: "select",
      message: "Choose a Database for your project:",
      choices: [
        { name: chalk.blue("PostgreSQL"), value: "PostgreSQL" },
        { name: chalk.green("MongoDB"), value: "MongoDB" },
        { name: chalk.cyan("SQLite"), value: "SQLite" },
      ],
    },
    {
      name: "authType",
      type: "select",
      message: "Choose an Auth type for your project:",
      choices: [
        { name: chalk.yellow("JWT"), value: "JWT" },
        { name: chalk.red("API Key"), value: "API KEY" },
        { name: chalk.gray("None"), value: "None" },
      ],
    },
  ]);

  // spinner would be added when generating folder / files
  //   const spinner = ora("Loading initial prompts...").start();
  await generateProjectFiles(answers);
  //   setTimeout(() => {
  //     spinner.color = "yellow";
  //     spinner.text = chalk.yellow("Loading configuration...");
  //   }, 1000);
  //   spinner.succeed(chalk.green("Project created successfully!"));
}
