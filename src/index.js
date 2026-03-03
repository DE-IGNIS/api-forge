#!/usr/bin/env node
import { program } from "commander";
import chalk from "chalk";

program
  .name("api-forge")
  .description(
    `${chalk.blueBright("A CLI tool that scaffolds production ready REST & GraphQL API projects")}`,
  )
  .version(`${chalk.greenBright("1.0.0")}`);

program
  .command("api-forge")
  .description("Command for Basic API boilerplate")
  .option("init ,init <project>", "Project Name") // flag -> project name
  .action();
program.parse();
