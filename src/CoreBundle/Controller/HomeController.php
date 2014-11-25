<?php

namespace CoreBundle\Controller;

use Core\Controller\BaseController as Controller;

/**
 * Class HomeController
 *
 * @package CoreBundle\Controller
 */
class HomeController extends Controller
{

    /**
     * @return mixed
     */
    public function indexAction()
    {
        return $this->render(
            $this->getTemplatePath(),
            array()
        );
    }
}
