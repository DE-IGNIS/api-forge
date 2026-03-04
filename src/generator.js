import path from "path";
import fse from "fs-extra/esm";
import { fileURLToPath } from "url";

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateProjectFiles(answers, projectName) {
  const dependencies = {
    ...dependencyMap[answers.framework],
    ...dbDependencyMap[answers.database],
  };

  const targetDir = path.join(process.cwd(), projectName);
  const templateDir = path.join(__dirname, "templates");

  await fse.ensureDir(targetDir);

  await fse.copy(path.join(templateDir, "base"), targetDir);

  await fse.writeJson(path.join(targetDir, "package.json"), {
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

  await fse.copy(path.join(templateDir, fmw), path.join(targetDir, "src"));
}
