<?php
namespace Core\Config;

/**
 * Interface ConfigManagerInterface
 *
 * @package Core\Config
 * @author Marc Aschmann <maschmann@motorpresse.de>
 */
interface ConfigManagerInterface
{
    /**
     * @param string $type
     * @param string $file filename
     * @param int $ttl
     * @return \Asm\Config\ConfigInterface
     */

    public function get($type, $file, $ttl = 900);
}
