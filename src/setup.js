import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";

async function loadingSpinner(answers) {
  const spinner = ora(
    chalk.cyan.bold("Loading ") + chalk.red("initial prompts"),
  ).start();

  setTimeout(() => {
    ((spinner.color = "yellow"),
      (spinner.text =
        chalk.yellowBright("Loading ") +
        chalk.magentaBright("configuration...")));
  }, 1000);

  console.log(
    chalk.blueBright.bold("\nProject Name Confirmation: "),
    chalk.green(answers.projectConfirm),
  );
  console.log(
    chalk.blueBright.bold("Project Framework : "),
    chalk.cyan(answers.framework),
  );
  console.log(
    chalk.blueBright.bold("Project Database: "),
    chalk.yellow(answers.database),
  );
  console.log(
    chalk.blueBright.bold("Project AuthType: "),
    chalk.magenta(answers.authType),
  );

  spinner.succeed(chalk.green.bold("Done!"));
}

export async function createBoilerPlate(options) {
  //   console.log(options); -> trying out project name

  const answers = await inquirer.prompt([
    {
      name: "projectConfirm",
      type: "confirm",
      message: chalk.cyan(
        `Are you sure about the project name ${chalk.yellow.bold(options)}?`,
      ),
      choices: ["Y", "N"],
    },
    {
      name: "framework",
      type: "select",
      message: chalk.cyan("Choose a Framework for your project: "),
      choices: [
        chalk.green("Express"),
        chalk.blue("Fastify"),
        chalk.magenta("Hono"),
      ],
    },
    {
      name: "database",
      type: "select",
      message: chalk.cyan("Choose a Database for your project: "),
      choices: [
        chalk.blueBright("PostgreSQL"),
        chalk.greenBright("MongoDB"),
        chalk.cyanBright("SQLite"),
      ],
    },
    {
      name: "authType",
      type: "select",
      message: chalk.cyan("Choose a Auth type for your project: "),
      choices: [chalk.yellow("JWT"), chalk.red("API Key"), chalk.gray("None")],
    },
  ]);

  await loadingSpinner(answers);
}
