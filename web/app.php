<?php

use Symfony\Component\ClassLoader\ApcClassLoader;
use Symfony\Component\HttpFoundation\Request;

$loader = require_once __DIR__.'/../app/bootstrap.php.cache';

$devServer = array(
    'mps-api_dev.dev.local',
    'mps-api.dev.local',
);

$testServer = array(
    'stage.mps-api.de',
);

$serverEnv = getenv('SF_SERVER_ENVIRONMENT');
$serverName = $_SERVER['HTTP_HOST'];
$debug = false;
switch (true) {
    case in_array($serverName, $testServer) || $serverEnv == 'test':
        $env = 'test';
        break;
    case  in_array($serverName, $devServer) || $serverEnv == 'dev':
        $env = 'dev';
        $debug = true;
        break;
    default:
        $env = 'prod';
        break;
}

// Use APC for autoloading to improve performance.
// Change 'sf2' to a unique prefix in order to prevent cache key conflicts
// with other applications also using APC.
if ('dev' != $env) {
    $apcLoader = new ApcClassLoader('sf2#', $loader);
    $loader->unregister();
    $apcLoader->register(true);
}

require_once __DIR__.'/../app/AppKernel.php';
require_once __DIR__.'/../app/AppCache.php';

$kernel = new AppKernel($env, $debug);
$kernel->loadClassCache();

if ('dev' != $env) {
    $kernel = new AppCache($kernel);
}

// When using the HttpCache, you need to call the method in your front controller instead of relying on the configuration parameter
Request::enableHttpMethodParameterOverride();
$request = Request::createFromGlobals();
$response = $kernel->handle($request);
$response->send();
$kernel->terminate($request, $response);
