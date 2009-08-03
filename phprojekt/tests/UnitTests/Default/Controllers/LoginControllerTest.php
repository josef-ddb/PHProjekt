<?php
/**
 * Unit test
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
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 */
require_once 'PHPUnit/Framework.php';

/**
 * Tests for Login Controller
 *
 * @copyright  Copyright (c) 2008 Mayflower GmbH (http://www.mayflower.de)
 * @license    LGPL 2.1 (See LICENSE file)
 * @version    Release: @package_version@
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 * @author     Gustavo Solt <solt@mayflower.de>
 * @group      default
 * @group      controller
 * @group      default-controller
 */
class Phprojekt_LoginController_Test extends FrontInit
{
    /**
     * Test if the login page is displayed correctly
     */
    public function testLoginIndexAction()
    {
        $this->request->setActionName('index');
        $this->request->setBaseUrl($this->config->webpath . 'index.php');
        $this->request->setPathInfo('Login/index');
        $this->request->setRequestUri('/Login/index');
        $response = $this->getResponse();
        $this->assertContains("function init()", $response);
    }

    /**
     * Tests login action on login controller
     */
    public function testLoginLoginAction()
    {
        $this->setRequestUrl('Login/login');

        // This is the only way I found to set POST values on request
        $_POST['username'] = 'david';
        $_POST['password'] = 'test';

        try {
            $this->front->dispatch($this->request, $this->response);
        } catch (Zend_Controller_Response_Exception $error) {
            $this->assertEquals(0, $error->getCode());
            $authNamespace = new Zend_Session_Namespace('Phprojekt_Auth-login');
            $this->assertEquals(1, $authNamespace->userId);
            $this->assertEquals(1, $authNamespace->admin);
            return;
        }

        $this->fail('An error occured on login action');
    }

    /**
     * Tests login action on login controller, with Keep Logged set to 'on'
     */
    public function testLoginLoginKeepLoggedAction()
    {
        $this->setRequestUrl('Login/login');

        // This is the only way I found to set POST values on request
        $_POST['username']   = 'david';
        $_POST['password']   = 'test';
        $_POST['keepLogged'] = 'on';

        try {
            $this->front->dispatch($this->request, $this->response);
        } catch (Zend_Controller_Response_Exception $error) {
            $this->assertEquals(0, $error->getCode());
            // Fetch logged data in settings table
            $settingsModel = new Setting_Models_Setting();
            $settingsModel->setModule('User');
            $hash = $settingsModel->getSetting(Phprojekt_Auth::LOGGED_TOKEN . '_hash', 1);
            $this->assertEquals(32, strlen($hash));
            $response = $settingsModel->getSetting(Phprojekt_Auth::LOGGED_TOKEN . '_expires', 1);
            $this->assertTrue((int) $response > time());

            return;
        }

        $this->fail('An error occurs on login action');
    }

    /**
     * Tests logout action on login controller
     */
    public function testLoginLogoutAction()
    {
        $this->setRequestUrl('Login/logout');
        try {
            $this->front->dispatch($this->request, $this->response);
        } catch (Zend_Controller_Response_Exception $error) {
            $this->assertEquals(0, $error->getCode());
            try {
                $authNamespace = new Zend_Session_Namespace('Phprojekt_Auth-login');
            } catch (Zend_Session_Exception $error) {
                $this->assertEquals(0, $error->getCode());
                // Try to fetch login data in settings table to assure it has been deleted
                $settingsModel = new Setting_Models_Setting();
                $settingsModel->setModule('User');
                $db    = Phprojekt::getInstance()->getDb();
                $where = sprintf("user_id = 1 AND key_value LIKE %s", $db->quote(Phprojekt_Auth::LOGGED_TOKEN . '%'));
                $rows  = $settingsModel->fetchAll($where);
                $this->assertTrue(count($rows) == 0);

                return;
            }
        }

        $this->fail('An error occured on logout action');
    }
}
