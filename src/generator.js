import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { generateAuthMiddleware } from "./generateAuth.js";

const dependencyMap = {
  Express: { express: "^4.18.2" },
  Fastify: { fastify: "^4.26.0" },
  Hono: { hono: "^4.1.0" },
};

const dbDependencyMap = {
  PostgreSQL: { pg: "^8.11.0" },
  MongoDB: { mongoose: "^8.2.0" },
  SQLite: { "better-sqlite3": "^9.4.3" },
};

const authDependencyMap = {
  JWT: { jsonwebtoken: "^9.0.2" },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateProjectFiles(answers, projectName) {
  let generateProject = true;

  // console.log(answers.projectConfirm);
  if (!answers.projectConfirm) {
    // console.log("Project won't be created");
    generateProject = false;
    return generateProject;
  }

  const specialChars = /[^a-zA-Z0-9-]/;

  if (specialChars.test(projectName)) {
    console.log("Project name is invalid");
    generateProject = false;
    return generateProject;
  }

  const dependencies = {
    ...dependencyMap[answers.framework],
    ...dbDependencyMap[answers.database],
    ...authDependencyMap[answers.authType],
  };

  const targetDir = path.join(process.cwd(), projectName);
  const templateDir = path.join(__dirname, "templates");

  let exist = await fs.pathExists(targetDir);

  if (exist) {
    console.log("\nDirectoy Already exists");
    generateProject = false;
    return generateProject;
  }

  await fs.ensureDir(targetDir);

  // copy base (template)
  await fs.copy(path.join(templateDir, "base"), targetDir);
  await fs.move(
    path.join(targetDir, "env.template"),
    path.join(targetDir, ".env"),
  );
  await fs.move(
    path.join(targetDir, "gitignore.template"),
    path.join(targetDir, ".gitignore"),
  );

  await fs.writeJson(path.join(targetDir, "package.json"), {
    name: projectName,
    version: "1.0.0",
    description: "",
    type: "module",
    scripts: {
      dev: "node src/index.js",
    },
    license: "ISC",
    dependencies,
  });

  const fmw = answers.framework.toLowerCase();

  // copy framework (template)
  await fs.copy(path.join(templateDir, fmw), path.join(targetDir, ""));

  await modifyTemplate(answers, targetDir, projectName);
  await generateAuthMiddleware(answers, targetDir);

  return generateProject;
}

export async function modifyTemplate(answers, targetDir, projectName) {
  const readme_content = `
# ${projectName} 
A ${answers.framework} API with ${answers.database} and ${answers.authType} auth.
    
## Getting Started
npm install
npm run dev
    
## Contributing
Follow the project contribution guidelines when modifying templates.
`;

  const readme_file = path.join(targetDir, "README.md");
  await fs.outputFile(readme_file, readme_content);

  const index_file = path.join(targetDir, "src/index.js");

  const data = await fs.readFile(index_file, "utf8");
  const result = data.replace(/\{\{projectName\}\}/g, `${projectName}`);

  await fs.outputFile(index_file, result);

  if (answers.authType == "JWT") {
    const env_file = path.join(targetDir, ".env");
    await fs.outputFile(env_file, "PORT = 8080\nJWT_SECRET = SECRET");
  } else if (answers.authType == "API KEY") {
    const env_file = path.join(targetDir, ".env");
    await fs.outputFile(env_file, "PORT = 8080\nAPI_KEY = KEY");
  } else {
    const env_file = path.join(targetDir, ".env");
    await fs.outputFile(env_file, "PORT = 8080");
  }
}
