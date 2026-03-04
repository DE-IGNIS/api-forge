import chalk from "chalk";
import fse from "fs-extra/esm";
// import { readFileSync } from "fs";
// import { readFile } from "fs-promises";
// import { outputFile, outputFileSync } from "fs-extra/esm";

// Pseudocode — your job to implement
// 1. Take answers object as input
// 2. Determine which framework template folder to copy
// 3. Copy base/ templates into project root
// 4. Copy framework/src/index.js into project src/
// 5. Replace {{projectName}}, {{framework}}, {{database}} placeholders
// 6. Write a generated package.json with correct dependencies
// 7. Wrap steps 2-6 in ora spinner

// D:\templates\base
// D:\[08] SIDE PROJECTS\CLI TOOLS\api-forge\src\templates
// src\templates

export function generateProjectFiles(answers) {
  if (answers.framework == "Express") {
    fse
      .copy("src/templates/base", "/api-forge")
      .then(() => {
        console.log("Success!");
      })
      .catch((err) => {
        console.error(err);
      });
    console.log("Express");
  } else if (answers.framework == "Fastify") {
    console.log("Fastify");
  } else {
    console.log("Hono");
  }

  //   console.log(
  //     chalk.blueBright("\nProject name confirmation:"),
  //     chalk.green(answers.projectConfirm),
  //   );
  //   console.log(
  //     chalk.blueBright("Project framework:"),
  //     chalk.cyan(answers.framework),
  //   );
  //   console.log(
  //     chalk.blueBright("Project database:"),
  //     chalk.yellow(answers.database),
  //   );
  //   console.log(
  //     chalk.blueBright("Project authType:"),
  //     chalk.magenta(answers.authType),
  //   );
}
