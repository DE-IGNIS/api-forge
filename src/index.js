#!/usr/bin/env node
import { program } from "commander";
import chalk from "chalk";
import { createBoilerPlate } from "./setup.js";

program
  .name(chalk.cyan.bold("api-forge"))
  .description(
    chalk.blueBright(
      "A CLI tool that scaffolds production ready REST & GraphQL API projects",
    ),
  )
  .version(chalk.greenBright.bold("1.0.0"));

program
  .command("init <projectName>")
  .description(chalk.magenta("Command for Basic API boilerplate"))
  .option("-y,--init <project>", chalk.gray("Project Name"))
  .action(createBoilerPlate);

program.parse();
