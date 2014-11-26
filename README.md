#sf-project-skeleton
The skeleton is optimized for fast sf project bootstrapping and includes following bundles, ideas and scripts:

* Asm/php-utilities
* default nginx (dev) config for linking into sites-enabled. Best used with maschmann/devbox-ansible
* additional apache2 config for older systems
* local node/gulp installer, including basic gulp tasks for css/js mergeing/minification
* some helper classes, inheriting from Controller and ContainerAwareCommand to ease e.g. Template-finding
* basic project structure, following the one-bundle + core lib approach

# installation
Just do the normal composer install.
Afterwards start the install-node script from project root, which will install a current stable version of node plus gulp and gulp modules, locally. Start builiding with ./gulp from project root.

#License
sf-project-skeleton is licensed under the MIT license. See the [LICENSE](Resources/meta/LICENSE) for the full license text.
