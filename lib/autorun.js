var sys = require('sys');
var fs = require('fs');
var os = require('os');
var path = require('path');
var spawn = require('child_process').spawn;
var watchr = require('watchr');
var colors = require('colors');

var command;
var args;
var running = false;
var pending = false;

function watch(paths, options)
{
    command = detectBinary();
    args = options.slice(0);

    executeCommand();

    watchr.watch({
        paths: paths,
        listener: listener,
        duplicateDelay: false
    });
}

function detectBinary()
{
    var fn = path.join('vendor', 'bin', 'phpunit');
    var win = os.platform() === 'win32';

    if (win)
    {
        fn += '.bat';
    }

    if (fs.existsSync(fn))
    {
        return fn;
    }
    else if (win)
    {
        return 'phpunit.batx';
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
    var proc = spawn(command, args, {stdio: 'inherit'});

    proc.on('error', function (err) {
        sys.print(("\n" + err + "\n").redBG);
        done();
    });

    proc.on('exit', function(){
        done();
    });
}

module.exports = {
    watch: watch
};
