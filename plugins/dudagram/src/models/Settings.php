<?php

/**
 * dudagram plugin for Craft CMS 3.x
 *
 * Grab Instagram content through the Instagram Basic Display API
 *
 * @link      https://dudagroup.com
 * @copyright Copyright (c) 2020 Dudagroup
 */

namespace dudagroup\dudagram\models;

use dudagroup\dudagram\Dudagram;

use Craft;
use craft\base\Model;

/**
 * @author    Dudagroup
 * @package   Dudagram
 * @since     1.0.0
 */
class Settings extends Model
{
    // Public Properties
    // =========================================================================

    /**
     * @var string
     */
    public $appId = '';
    public $appSecret = '';
    public $longAccessToken = '';

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['appId', 'appSecret'], 'required'],
            ['longAccessToken', 'string']
        ];
    }
}
