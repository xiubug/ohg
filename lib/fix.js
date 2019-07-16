const chalk = require('chalk')
const inquirer = require('inquirer')
const shell = require('shelljs')

async function fix (options) {

  const { action } = await inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: chalk.red.bold('Check the features needed for your project: '),
      choices: [
        { name: chalk.green('Pull remote branch to local'), value: 'pull' },
        { name: chalk.green('Push local branch to remote'), value: 'push' }
      ]
    }
  ]);

  switch (action) {
    case 'pull':
      pullRemoteBranch();
      break;
    case 'push':
      pushLocalBranch();
      break;
    default:
  }
}

async function pullRemoteBranch() {
  const { remote, local } = await getBranch()

  shell.exec(`git checkout -b ${local} origin/${remote}`)
}

async function pushLocalBranch() {
  const { remote, local } = await getBranch()

  shell.exec(`git push origin ${local}:${remote}`)
}

async function getBranch() {
  return await inquirer.prompt([{
    name: 'remote',
    type: 'input',
    message: chalk.green('Please enter the remote branch name (ex: v1.0): '),
    default: 'master' // 默认值
  }, {
    name: 'local',
    type: 'input',
    message: chalk.green('Please enter the local branch name (ex: v1.0): '),
    default: 'master' // 默认值
  }])
}

function exec (command) {
  const result = shell.exec(command, { silent: true })
  if (result.code) {
    shell.echo('')
    shell.exit(1)
  }
  return result.stdout.trim()
}

module.exports = (...args) => {
  return fix(...args).catch(err => console.error(err))
}
