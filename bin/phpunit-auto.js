#!/usr/bin/env node

var sys = require('sys');

function usage()
{
    /**
     * Usage: phpunit-auto <path>... [--] [options]...
     *
     *     path        Watching paths.
     *     options     PHPUnit command line options.
     *
     * e.g.)
     *
     *     1. Watching src/ tests/ and execute "phpunit -c tests/ --colors"
     *
     *         phpunit-auto src/ tests/ -c tests/ --colors
     *
     *     2. Watching src/ tests/ and execute "phpunit tests/"
     *
     *         phpunit-auto src/ tests/ -- tests/
     */

    usage.toString().match(/^[ \t]+\*(?: .*)?$/gm).forEach(function (line) {
        sys.error(line.replace(/^\s+\*\s?/, ''));
    });

    process.exit(1);
}

var paths = [];
var options = [];

function parseargs(args)
{
    var flg = false;

    args.forEach(function (v) {
        if (!flg)
        {
            if (v.charAt(0) !== '-')
            {
                paths.push(v);
                return;
            }

            flg = true;

            if (v === '--')
            {
                return;
            }
        }
        if (flg)
        {
            options.push(v);
        }
    });
}

parseargs(process.argv.slice(2));

if (paths.length === 0)
{
    usage();
}

require('../lib/autorun').watch(paths, options);
