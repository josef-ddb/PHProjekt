<?php
/**
 * Configuration Module Controller for PHProjekt 6.0
 *
 * This software is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License version 2.1 as published by the Free Software Foundation
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * @copyright  Copyright (c) 2008 Mayflower GmbH (http://www.mayflower.de)
 * @license    LGPL 2.1 (See LICENSE file)
 * @version    $Id$
 * @author     Gustavo Solt <solt@mayflower.de>
 * @package    PHProjekt
 * @subpackage Administration
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 */

/**
 * Configuration Module Controller for PHProjekt 6.0
 *
 * @copyright  Copyright (c) 2008 Mayflower GmbH (http://www.mayflower.de)
 * @version    Release: @package_version@
 * @license    LGPL 2.1 (See LICENSE file)
 * @package    PHProjekt
 * @subpackage Administration
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 * @author     Gustavo Solt <solt@mayflower.de>
 */
class Administration_IndexController extends IndexController
{
    /**
     * Init function
     *
     * Only admin users can access to these actions,
     * if the user is not an admin, is redirected to the login form or throws an exception.
     *
     * @throws Phprojekt_PublishedException If the user is not an admin.
     *
     * @return void
     */
    public function init()
    {
        parent::init();

        if (!Phprojekt_Auth::isAdminUser()) {
            // If is a GET, show the login page
            // If is a POST, send message in json format
            if (!$this->getFrontController()->getRequest()->isGet()) {
                throw new Phprojekt_PublishedException('Admin section is only for admin users', 500);
            } else {
                $this->_redirect(Phprojekt::getInstance()->getConfig()->webpath . 'index.php/Login/logout');
            }
            exit;
        }
    }

    /**
     * Returns all the modules that contain configurations.
     *
     * Returns a list of modules that have a Configuration class, with:
     * <pre>
     *  - name  => Name of the module.
     *  - label => Display for the module.
     * </pre>
     *
     * The return is in JSON format.
     *
     * @return void
     */
    public function jsonGetModulesAction()
    {
        $configuration = Phprojekt_Loader::getModel('Administration', 'Configuration');
        $data          = $configuration->getModules();

        Phprojekt_Converter_Json::echoConvert($data);
    }

    /**
     * Returns the configuration fields and data for one module.
     *
     * The return have:
     *  - The metadata of each field.
     *  - The data of the setting.
     *  - The number of rows.
     *
     * OPTIONAL request parameters:
     * <pre>
     *  - string <b>moduleName</b> Name of the module.
     * </pre>
     *
     * The return is in JSON format.
     *
     * @return void
     */
    public function jsonDetailAction()
    {
        $module   = Cleaner::sanitize('alnum', $this->getRequest()->getParam('moduleName', null));
        $moduleId = (int) Phprojekt_Module::getId($module);

        $configuration = Phprojekt_Loader::getModel('Administration', 'Configuration');
        $configuration->setModule($module);
        $metadata = $configuration->getModel()->getFieldDefinition();
        $records  = $configuration->getList($moduleId, $metadata);

        $data = array("metadata" => $metadata,
                      "data"     => $records,
                      "numRows"  => count($records));

        Phprojekt_Converter_Json::echoConvert($data);
    }

    /**
     * Saves the configuration for one module.
     *
     * OPTIONAL request parameters:
     * <pre>
     *  - string <b>moduleName</b>              Name of the module.
     *  - mixed  <b>all other module fields</b> All the fields values to save.
     * </pre>
     *
     * The return is a string in JSON format with:
     * <pre>
     *  - type    => 'success' or 'error'.
     *  - message => Success or error message.
     *  - code    => 0.
     *  - id      => 0.
     * </pre>
     *
     * @throws Phprojekt_PublishedException On error in the action save or wrong id.
     *
     * @return void
     */
    public function jsonSaveAction()
    {
        $module        = Cleaner::sanitize('alnum', $this->getRequest()->getParam('moduleName', null));
        $configuration = Phprojekt_Loader::getModel('Administration', 'Configuration');
        $configuration->setModule($module);

        $message = $configuration->validateConfigurations($this->getRequest()->getParams());

        if (!empty($message)) {
            $message = Phprojekt::getInstance()->translate($message);
            $type    = "error";
        } else {
            $message = Phprojekt::getInstance()->translate(self::EDIT_TRUE_TEXT);
            $configuration->setConfigurations($this->getRequest()->getParams());
            $type = "success";
        }

        $return = array('type'    => $type,
                        'message' => $message,
                        'code'    => 0,
                        'id'      => 0);

        Phprojekt_Converter_Json::echoConvert($return);
    }
}
