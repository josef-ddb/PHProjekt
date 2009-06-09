<?php
/**
 * A model that receives information about Setting models of other modules
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
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 */

/**
 * A model that receives information about Setting models of other modules
 *
 * @copyright  Copyright (c) 2008 Mayflower GmbH (http://www.mayflower.de)
 * @version    Release: @package_version@
 * @license    LGPL 2.1 (See LICENSE file)
 * @package    PHProjekt
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 * @author     Gustavo Solt <solt@mayflower.de>
 */
class Setting_Models_Setting extends Phprojekt_ActiveRecord_Abstract
{
    /**
     * The name of a module
     *
     * @var string
     */
    protected $_module = 'User';

    /**
     * The module Id
     *
     * @var integer
     */
    protected $_moduleId = 0;

    /**
     * Class of the setting module
     *
     * @var Object class
     */
    protected $_object = null;

    /**
     * A list of directories that are not included in the search.
     * Usually Default and Administration
     *
     * @var array
     */
    protected static $_excludePaths = array('Default', 'Administration', 'Setting', 'Core', '.svn');

    /**
     * Returns a set of modules available and have setting sections
     *
     * @return array
     */
    public function getModules()
    {
        $results = array();
        // System settings
        $moduleClass = sprintf('UserSetting');
        $model = Phprojekt_Loader::getModel('Core', $moduleClass);
        if ($model) {
            $results[] = array('name'  => 'User',
                               'label' => Phprojekt::getInstance()->translate('User'));
        }
        // Module settings
        foreach (scandir(PHPR_CORE_PATH) as $dir) {
            $path = PHPR_CORE_PATH . DIRECTORY_SEPARATOR . $dir;
            if ($dir == '.' || $dir == '..' || in_array($dir, self::$_excludePaths)) {
                continue;
            }
            if (is_dir($path)) {
                $settingClass = Phprojekt_Loader::getModelClassname($dir, sprintf('%sSetting', $dir));
                if (Phprojekt_Loader::tryToLoadClass($settingClass)) {
                    $results[] = array('name'  => $dir,
                                       'label' => Phprojekt::getInstance()->translate($dir));
                }
            }
        }
        return $results;
    }

    /**
     * Define the current module to use in the settings
     *
     * @param string $module The module name
     *
     * @return void
     */
    public function setModule($module)
    {
        $this->_moduleId = Phprojekt_Module::getId($module);
        $this->_module   = $module;
    }

    /**
     * Get the object class to use for manage the settings
     *
     * @return Object class
     */
    public function getModel()
    {
        if (null === $this->_object) {
            // System settings
            if ($this->_module == 'User') {
                $this->_object = Phprojekt_Loader::getModel('Core', sprintf('%sSetting', $this->_module));
            } else {
                $this->_object = Phprojekt_Loader::getModel($this->_module, sprintf('%sSetting', $this->_module));
            }
        }
        return $this->_object;
    }

    /**
     * Return the value of one setting
     *
     * @param string  $settingName The name of the setting
     * @param integer $userId      The user id, if is not setted, the current user is used.
     *
     * @return mix
     */
    public function getSetting($settingName, $userId = 0)
    {
        $toReturn = null;
        if (!$userId) {
            $userId = Phprojekt_Auth::getUserId();
        }

        $settingNamespace = new Zend_Session_Namespace('Setting_Models_Setting-getSetting-' . $userId);
        if (!isset($settingNamespace->$settingName)) {
            $where = sprintf('user_id = %d AND key_value = %s AND module_id = %d', (int) $userId,
                $this->_db->quote($settingName), (int) $this->_moduleId);
            $record = $this->fetchAll($where);
            if (!empty($record)) {
                $toReturn = $record[0]->value;
            }
            $settingNamespace->$settingName = $toReturn;
        } else {
            $toReturn = $settingNamespace->$settingName;
        }

        return $toReturn;
    }

    /**
     * Collect all the values of the settings and return it in one row
     *
     * @param integer $moduleId The current moduleId
     * @param array   $metadata Array with all the fields
     *
     * @return array
     */
    public function getList($moduleId, $metadata, $userId = null)
    {
        $settings = array();

        if ($userId === null) {
            $userId = (int) Phprojekt_Auth::getUserId();
        }

        $where  = sprintf('module_id = %d AND user_id = %d', (int) $moduleId, (int) $userId);
        $record = $this->fetchAll($where);

        $data       = array();
        $data['id'] = 0;
        foreach ($metadata as $meta) {
            $data[$meta['key']] = '';
            foreach ($record as $oneSetting) {
                if ($oneSetting->keyValue == $meta['key']) {
                    $getter = 'get'.ucfirst($oneSetting->keyValue);
                    if (method_exists($this->getModel(), $getter)) {
                        $data[$meta['key']] = call_user_func(array($this->getModel(), $getter), $oneSetting->value);
                    } else {
                        $data[$meta['key']] = $oneSetting->value;
                    }
                    break;
                }
            }
        }
        $settings[] = $data;

        return $settings;
    }

    /**
     * Validation functions for all the values
     *
     * @param array $params $_POST fields
     *
     * @return string
     */
    public function validateSettings($params)
    {
        $message = null;

        if (method_exists($this->getModel(), 'validateSettings')) {
            $message = call_user_func(array($this->getModel(), 'validateSettings'), $params);
        }

        return $message;
    }

    /**
     * Save the settings into the table
     *
     * @param array   $params $_POST fields
     * @param integer $userId The user id, if is not setted, the current user is used.
     *
     * @return void
     */
    public function setSettings($params, $userId = 0)
    {
        if (!$userId) {
            $userId = Phprojekt_Auth::getUserId();
        }

        $settingNamespace = new Zend_Session_Namespace('Setting_Models_Setting-getSetting-' . $userId);
        $settingNamespace->unsetAll();

        if (method_exists($this->getModel(), 'setSettings')) {
            call_user_func(array($this->getModel(), 'setSettings'), $params, $userId);
        } else {
            $fields = $this->getModel()->getFieldDefinition();
            foreach ($fields as $data) {
                foreach ($params as $key => $value) {
                    if ($key == $data['key']) {
                        $where  = sprintf('user_id = %d AND key_value = %s AND module_id = %d', (int) $userId,
                            $this->_db->quote($key), (int) $this->_moduleId);
                        $record = $this->fetchAll($where);
                        if (isset($record[0])) {
                            $record[0]->keyValue = $key;
                            $record[0]->value    = $value;
                            $record[0]->save();
                        } else {
                            $clone             = clone $this;
                            $clone->userId     = $userId;
                            $clone->moduleId   = (int) $this->_moduleId;
                            $clone->keyValue   = $key;
                            $clone->value      = $value;
                            $clone->identifier = $this->_module;
                            $clone->save();
                        }
                        break;
                    }
                }
            }
        }
    }
}
