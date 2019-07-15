const chalk = require('chalk')
const inquirer = require('inquirer')
const shell = require('shelljs')

async function fix (options) {

  const { action } = await inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: `请选择所需要的功能`,
      choices: [
        { name: '拉取远程分支到本地', value: 'ggpull' },
        { name: '推送本地分支到远程', value: 'ggpush' }
      ]
    }
  ]);

  switch (action) {
    case 'ggpull':
      console.log('修复生产环境指定分支的问题');
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
    message: '请输入远程分支名称（例如：v1.0）:',
    default: "master" // 默认值
  }, {
    name: 'local',
    type: 'input',
    message: '请输入本地分支名称（例如：v1.0）:',
    default: "master" // 默认值
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
