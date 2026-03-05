# api-forge

![npm version](https://img.shields.io/npm/v/@matrixmind/api-forge)
![GitHub repo size](https://img.shields.io/github/repo-size/DE-IGNIS/api-forge)

api-forge is a CLI tool that instantly scaffolds development-ready API backends with clean architecture, best practices, and modern tooling baked in. It eliminates repetitive setup work and lets you start building features immediately. With support for multiple frameworks, databases, and authentication strategies.

## Installation

```sh
npm install -g @matrixmind/api-forge
```

## Usage

```sh
api-forge init <project-name>
```

## Supported Stacks

| Category   | Options Supported           |
| ---------- | --------------------------- |
| Frameworks | Express , Fastify , Hono    |
| Databases  | PostgreSQL, MongoDB, SQLite |
| Auth       | JWT, API Key, None          |

## Generated Project Structure

```
projectName/
│
├── src/
|    └── index.js
│    └── middleware/
│       └── auth.js ← only when JWT or API KEY
| 
├── package.json
├── README.md
├── .env
└── .gitignore
```