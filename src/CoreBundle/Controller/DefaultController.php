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
     * @param string $name
     * @return mixed
     */
    public function indexAction($name)
    {
        return $this->render('CoreBundle:Default:index.html.twig', array('name' => $name));
    }
}
