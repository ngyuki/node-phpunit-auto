
## Install

```console
$ npm install -g ngyuki/node-phpunit-auto
```

## Usage

```console
$ phpunit-auto <path>... [--] [options]...
```

## Options

**path**

Watching paths.

**options**

PHPUnit command line options.

## Example

**1.** execute `phpunit -c tests/ --colors` with watching src/ and tests/.

```console
$ phpunit-auto src/ tests/ -c tests/ --colors
```

**2.** execute `phpunit tests/` with watching src/ and tests/.

```console
$ phpunit-auto src/ tests/ -- tests/
```
