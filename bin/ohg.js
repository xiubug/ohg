#!/usr/bin/env node

const chalk = require('chalk')
const didYouMean = require('didyoumean')
const program = require('commander')

// 常见错误消息
const enhanceErrorMessages = require('../util/enhanceErrorMessages')

enhanceErrorMessages('missingArgument', argName => {
  return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`
})

enhanceErrorMessages('unknownOption', optionName => {
  return `Unknown option ${chalk.yellow(optionName)}.`
})

enhanceErrorMessages('optionMissingArgument', (option, flag) => {
  return `Missing required argument for option ${chalk.yellow(option.flags)}` + (
    flag ? `, got ${chalk.yellow(flag)}` : ``
  )
})

// 将编辑距离设置为输入字符串长度的 60%
didYouMean.threshold = 0.6

program
  .version(require('../package').version)
  .usage('<command> [options]')

program
  .command('fix')
  .description('A simple CLI scaffolding for git.')
  .action(cmd => {
    const options = cleanArgs(cmd)

    require('../lib/fix')(options)
  })

// 输出未知命令的帮助信息
program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
    suggestCommands(cmd)
  })

// 添加一些有关帮助的有用信息
program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`ohu <command> --help`)} for detailed usage of given command.`)
  console.log()
})

program.commands.forEach(c => c.on('--help', () => console.log()))

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

function suggestCommands (cmd) {
  const availableCommands = program.commands.map(cmd => {
    return cmd._name
  })

  const suggestion = didYouMean(cmd, availableCommands)
  if (suggestion) {
    console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`))
  }
}

function camelize (str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

// commander 将 the Command object itself 作为 options，将 options 组装成新对象返回
function cleanArgs (cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // 如果选项不存在且 Command 具有相同名称的方法，则不复制该选项
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}
