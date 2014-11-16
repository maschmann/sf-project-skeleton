<?php

namespace Core\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Class BaseController
 *
 * @package Core\Controller
 */
class BaseController extends Controller
{
    /**
     * get the template path for current bundle, controller and action
     *
     * @param string $method action name or namespace
     * @return string symfony formatted template path
     */
    protected function getTemplatePath($method = 'index')
    {
        /**
         * true for SF application bundle controllers
         * classpath always consists of:
         *
         * n namespace_base\
         * 1 BundleNameBundle\
         * 1 Controller\
         * 1 ControllerNameController\
         *********************************************************************/
        $classPath  = explode('\\', get_called_class());
        $controller = str_replace('Controller', '', array_pop($classPath));
        if (3 == count($classPath)) {
            $namespace = array_shift($classPath);
        } else {
            $namespace = '';
        }
        array_pop($classPath); // remove "Controller"
        $bundle = str_replace('Bundle', '', array_pop($classPath));

        // check if action is __METHOD__ or simple string
        if (0 < strpos($method, '::')) {
            // extract action
            $context = explode(
                '::',
                str_replace(
                    'Action',
                    '',
                    $method
                )
            );
            $action  = $context[1];
        } else {
            $action = str_replace('Action', '', $method);
        }

        // return reconstructed template path NamespaceMyBundle:Controller:action.html.twig
        return $namespace . $bundle . 'Bundle:' . $controller . ':' . $action . '.html.twig';
    }


    /**
     * config loader for bundles
     * Bundle conf file or complete bundle path (+ subpath) file.yml
     * complete path: (at)NamespaceNameOfBundle/Resources/config/file.yml
     *
     * @param string $resource
     * @return \Asm\Data\Data
     * @throws \ErrorException
     */
    protected function loadBundleConf($resource)
    {
        if (0 == preg_match('/@/', $resource)) {
            // get bundle name
            $calledClass = get_called_class();
            preg_match('/\\\(.*)Bundle/', $calledClass, $matches);
            $classPath = explode('\\', $calledClass);
            $namespace = array_shift($classPath);
            if (0 !== count($matches)) {
                $bundleName = $matches[1] . 'Bundle';
            } else {
                $bundleName = '';
            }

            $resource  = '@' . $namespace . $bundleName . '/Resources/config/' . $resource;
        }

        try {
            $cache  = $this->get('doctrine_cache.providers.default');
            $config = $cache->fetch($resource);

            if (false === $config) {
                $config = new Data();
                $config->setByArray(
                    Yaml::parse(
                        $this->get('kernel')
                            ->locateResource($resource)
                    )
                );

                $cache->save($resource, $config, 7200);
            }

            return $config;
        } catch (\Exception $e) {
            throw new \ErrorException(
                '--  ( ' . __FILE__ . ' ) ( ' . __LINE__ . ' ) -- error while loading bundle conf (' .
                $resource . '): ' . $e->getMessage()
            );
        }
    }
}
