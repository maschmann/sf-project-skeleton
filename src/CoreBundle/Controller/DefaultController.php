<?php

namespace CoreBundle\Controller;

use Core\Controller\BaseController as Controller;

/**
 * Class DefaultController
 *
 * @package CoreBundle\Controller
 */
class DefaultController extends Controller
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
