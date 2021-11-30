#!/usr/bin/env node
import meow from 'meow'
import inquirer from 'inquirer'
import { execSync } from 'child_process'

import { FRAMEWORKS, CliTool, ALL_CLI_TOOLS } from './options.js' // ts w/o a bundler is hell - https://github.com/nodejs/node/issues/30927

const help = `
  Usage:
    $ npx frondent

  Flags:
    --help, -h          Show this help message
    --version, -v       Show the version of this script
`

run().then(
  () => {
    // process.exit(0)
  },
  (error) => {
    console.error(error)
    process.exit(1)
  },
)

async function run() {
  const { flags, showHelp, showVersion } = meow(help, {
    flags: {
      help: {
        type: 'boolean',
        default: false,
        alias: 'h',
      },
      version: {
        type: 'boolean',
        default: false,
        alias: 'v',
      },
    },
    importMeta: import.meta,
  })

  if (flags.help) {
    showHelp()
  }
  if (flags.version) {
    showVersion()
  }

  const { framework }: { framework: keyof typeof FRAMEWORKS | 'ALL' } = await inquirer.prompt([
    {
      name: 'framework',
      type: 'list',
      message: 'What framework/library do you want to use?',
      loop: true,
      choices: [
        ...Object.entries(FRAMEWORKS).map(([key, value]) => ({
          name: value.name,
          value: key,
        })),
        {
          name: 'Show All',
          value: 'ALL',
        },
      ],
    },
  ])

  const cliTools = framework === 'ALL' ? ALL_CLI_TOOLS : FRAMEWORKS[framework].cliList

  const { tool, dir } = await inquirer.prompt([
    {
      name: 'tool',
      type: 'list',
      message: 'What do you want to use to initialize a project?',
      loop: true,
      choices: cliTools.map((cliTool: CliTool) => ({
        name: cliTool.name,
        value: cliTool.name,
      })),
    },
    {
      type: 'input',
      name: 'dir',
      message: 'Where would you like to create your app?',
      default: 'new-app',
    },
  ])

  const command = cliTools.find((cli) => cli.name == tool).command

  execSync(command + ' ' + dir, { stdio: 'inherit' })

  const { shouldOpenInVsCode } = await inquirer.prompt([
    {
      name: 'shouldOpenInVsCode',
      type: 'boolean',
      message: 'Open the project in VS Code?',
      default: true,
    },
  ])

  if (shouldOpenInVsCode) {
    execSync('code ' + dir, { stdio: 'inherit' })
  }
}
