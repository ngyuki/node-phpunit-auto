var sys = require('sys');
var fs = require('fs');
var os = require('os');
var path = require('path');
var exec = require('child_process').exec;
var watchr = require('watchr');
var colors = require('colors');

var escapeShellArg = require('./escapeShellArg');

var command;
var running = false;
var pending = false;

function watch(paths, options)
{
    command = buildCommand(options);

    executeCommand();

    watchr.watch({
        paths: paths,
        listener: listener,
        duplicateDelay: false
    });
}

function buildCommand(options)
{
    var tmp = options.slice(0);
    tmp.unshift(detectBinary());
    return tmp.map(function (v) { return escapeShellArg(v) }).join(" ");
}

function detectBinary()
{
    var fn = path.join('vendor', 'bin', 'phpunit');

    if (os.platform() === 'win32')
    {
        fn += '.bat';
    }

    if (fs.existsSync(fn))
    {
        return fn;
    }
    else
    {
        return 'phpunit';
    }
}

function listener(event, filename)
{
    if (!filename.match(/\.php$/))
    {
        return;
    }

    executeCommand(event, filename);
}

function executeCommand(event, filename)
{
    if (!running)
    {
        running = true;

        if (event && filename)
        {
            sys.puts((" " + event + " " + filename + "\n").magenta);
        }

        executeReality(function () {
            running = false;
            sys.print("\nWaiting...".cyan);
        });
    }
}

function executeReality(done)
{
    var term = exec(command, function(error, stdout, stderr) {
        done();
    });

    term.stdout.on('data', function(data) {
        process.stdout.write(data);
    });

    term.stderr.on('data', function(data) {
        process.stderr.write(data);
    });
}

module.exports = {
    watch: watch
};
