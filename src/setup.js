import inquirer from "inquirer";

export function createBoilerPlate(options) {
//   console.log(options); -> trying out project name
  const answers = inquirer
    .prompt([
      {
        name: "Question 1",
        type: "confirm",
        message: `Are you sure about the project name ${options}?`,
        choices: ["Y", "N"],
      },
      {
        name: "Question 2",
        type: "select",
        message: "Choose a Framework for your project: ",
        choices: ["Express", "Fastify", "Hono"],
      },
      {
        name: "Question 3",
        type: "select",
        message: "Choose a Database for your project: ",
        choices: ["PostgreSQL", "MongoDB", "SQLite"],
      },
      {
        name: "Question 4",
        type: "select",
        message: "Choose a Auth type for your project: ",
        choices: ["JWT", "API Key", "None"],
      },
    ])
    .then((answers) => {
      console.log(
        `\nUser has chosen:,
        Project Name ${options}: ${answers["Question 1"]},
        Framework for project  : ${answers["Question 2"]},
        DataBase for project   : ${answers["Question 3"]},
        Auth Type for project  : ${answers["Question 4"]},
      `,
      );
    });
}
