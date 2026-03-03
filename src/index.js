#!/usr/bin/env node
import { program } from "commander";
import chalk from "chalk";
import { createBoilerPlate } from "./setup.js";

program
  .name("api-forge")
  .description(
    `${chalk.blueBright("A CLI tool that scaffolds production ready REST & GraphQL API projects")}`,
  )
  .version(`${chalk.greenBright("1.0.0")}`);

program
  .command("init <projectName>")
  .description("Command for Basic API boilerplate")
  .option("-y,--init <project>", "Project Name") // flag -> project name
  .action(createBoilerPlate);

program.parse();
