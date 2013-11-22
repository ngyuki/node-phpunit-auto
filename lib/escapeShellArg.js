// https://github.com/joyent/node/pull/6314/files

var escapeShellArg;
if (process.platform === 'win32') {
    escapeShellArg = function(arg) {
        // If arg contains spaces or some special character...
        if (/["<>\s\|]/.test(arg)) {
            // Enclose arg in double quotes and escape double quotes.
            return '"' + arg.replace(/(")/g, '"$1') + '"';
        }
        return arg;
    };
} else {
    escapeShellArg = function(arg) {
        // If arg contains spaces or some special character...
        if (/[!"#$&'()*<>\s\\\|`{}]/.test(arg)) {
            // Enclose arg in single quotes and escape single quotes.
            return "'" + arg.replace(/(')/g, '\\$1') + "'";
        }
        return arg;
    };
}

module.exports = escapeShellArg;
