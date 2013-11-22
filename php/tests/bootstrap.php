<?php
$dirs = array(
    dirname(__DIR__) . DIRECTORY_SEPARATOR . 'src',
    dirname(__DIR__) . DIRECTORY_SEPARATOR . 'tests',
);

spl_autoload_register(function ($class) use ($dirs) {

    $file = str_replace('\\', DIRECTORY_SEPARATOR, $class) . '.php';

    foreach ($dirs as $dir)
    {
        $path = $dir . DIRECTORY_SEPARATOR . $file;

        if (is_readable($path))
        {
            return include $path;
        }
    }
});
