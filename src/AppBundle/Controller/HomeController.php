<?php
namespace AppBundle\Controller;

use Core\Controller\BaseServiceController;

/**
 * Class HomeController
 *
 * @package AppBundle\Controller
 */
class HomeController extends BaseServiceController
{
    /**
     * @return mixed
     */
    public function indexAction()
    {
        return $this->templating->renderResponse(
            $this->getTemplatePath(),
            array()
        );
    }
}
