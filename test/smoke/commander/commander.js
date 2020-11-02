var commands = [
    {
        name: 'init',
        alias: 'c',
        type: String,
        usage: 'init [scaffold]',
        description: 'Initialize a new webpack configuration',
    },
    {
        name: 'migrate',
        alias: 'm',
        type: String,
        usage: 'migrate',
        description: 'Migrate a configuration to a new version',
    },
];


var commander = require("commander")
// console.log("commander",commander)
//Command {
//     _events: [Object: null prototype] {},
//     _eventsCount: 0,
//     _maxListeners: undefined,
//     commands: [],
//     options: [],
//     parent: null,
//     _allowUnknownOption: false,
//     _args: [],
//     rawArgs: null,
//     _scriptPath: null,
//     _name: '',
//     _optionValues: {},
//     _storeOptionsAsProperties: true,
//     _storeOptionsAsPropertiesCalled: false,
//     _passCommandToAction: true,
//     _actionResults: [],
//     _actionHandler: null,
//     _executableHandler: false,
//     _executableFile: null,
//     _defaultCommandName: null,
//     _exitCallback: null,
//     _aliases: [],
//     _combineFlagAndOptionalValue: true,
//     _hidden: false,
//     _hasHelpOption: true,
//     _helpFlags: '-h, --help',
//     _helpDescription: 'display help for command',
//     _helpShortFlag: '-h',
//     _helpLongFlag: '--help',
//     _hasImplicitHelpCommand: undefined,
//     _helpCommandName: 'help',
//     _helpCommandnameAndArgs: 'help [command]',
//     _helpCommandDescription: 'display help for command',
//     program: [Circular],
//     Command: [class Command extends EventEmitter],
//     Option: [class Option],
//     CommanderError: [class CommanderError extends Error],
//     [Symbol(kCapture)]: false
//   }

var command = new commander.Command()
command.name('wumao test')//给command命名
// console.log("command",command)
//再次返回的command中name属性变为 wumao test
// Command {
//     _name: 'wumao test',
//   }
command.storeOptionsAsProperties(false);
commands.reduce((parserInstance, cmd) => {
    // console.log(parserInstance,'yellow')
    // console.log(cmd,'pink')
    command
        .command(cmd.name)
        .alias(cmd.alias)
        .description(cmd.description)
        .usage(cmd.usage)
        .allowUnknownOption(true)
        .action(async () => {
            const cliArgs = args.slice(args.indexOf(cmd.name) + 1 || args.indexOf(cmd.alias) + 1);

            return await require('./resolve-command')(defaultCommands[cmd.name], ...cliArgs);
        });

    return command;
}, command);
console.log(command)