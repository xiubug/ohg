const chalk = require('chalk')
const inquirer = require('inquirer')
const shell = require('shelljs')

async function create (options) {

  const { action } = await inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: chalk.red.bold('请选择所需要的功能: '),
      choices: [
        { name: chalk.green('拉取远程分支到本地，用于修复生产环境指定分支的问题'), value: 'ggpull' },
        { name: chalk.green('推送本地分支到远程，用于开发完成且执行git commit完成'), value: 'ggpush' }
      ]
    }
  ]);

  switch (action) {
    case 'ggpull':
      pullRemoteBranch();
      break;
    case 'ggpush':
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
    message: chalk.green('请输入远程分支名称（例如：v1.0）: '),
    default: 'master' // 默认值
  }, {
    name: 'local',
    type: 'input',
    message: chalk.green('请输入本地分支名称（例如：v1.0）: '),
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
  return create(...args).catch(err => console.error(err))
}
