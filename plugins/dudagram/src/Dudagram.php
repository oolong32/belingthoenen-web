<?php

/**
 * dudagram plugin for Craft CMS 3.x
 *
 * Grab Instagram content through the Instagram Basic Display API
 *
 * @link      https://dudagroup.com
 * @copyright Copyright (c) 2020 Dudagroup
 */

namespace dudagroup\dudagram;

use dudagroup\dudagram\services\DudagramService as DudagramServiceService;
use dudagroup\dudagram\variables\DudagramVariable;
use dudagroup\dudagram\models\Settings;

use Craft;
use craft\base\Plugin;
use craft\services\Plugins;
use craft\events\PluginEvent;
use craft\web\UrlManager;
use craft\helpers\UrlHelper;
use craft\web\twig\variables\CraftVariable;
use craft\events\RegisterUrlRulesEvent;

use yii\base\Event;

/**
 * Class Dudagram
 *
 * @author    Dudagroup
 * @package   Dudagram
 * @since     1.0.0
 *
 * @property  DudagramServiceService $dudagramService
 */
class Dudagram extends Plugin
{
    // Static Properties
    // =========================================================================

    /**
     * @var Dudagram
     */
    public static $plugin;

    // Public Properties
    // =========================================================================

    /**
     * @var string
     */
    public $schemaVersion = '1.0.0';

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();
        self::$plugin = $this;

        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_SITE_URL_RULES,
            function (RegisterUrlRulesEvent $event) {
                $event->rules['refreshToken'] = 'dudagram/refresh-token';
                $event->rules['auth'] = 'dudagram/default/auth';
            }
        );

        Event::on(
            CraftVariable::class,
            CraftVariable::EVENT_INIT,
            function (Event $event) {
                /** @var CraftVariable $variable */
                $variable = $event->sender;
                $variable->set('dudagram', DudagramVariable::class);
            }
        );

        Event::on(
            Plugins::class,
            Plugins::EVENT_AFTER_INSTALL_PLUGIN,
            function (PluginEvent $event) {
                if ($event->plugin === $this) {
                    Craft::$app->getResponse()->redirect(UrlHelper::cpUrl('settings/plugins/dudagram'))->send();
                }
            }
        );
        Craft::info(
            Craft::t(
                'dudagram',
                '{name} plugin loaded',
                ['name' => $this->name]
            ),
            __METHOD__
        );
    }

    public function afterSaveSettings()
    {
        parent::afterSaveSettings();
        Craft::$app->response
            ->redirect(UrlHelper::cpUrl('settings/plugins/dudagram'))
            ->send();
    }

    // Protected Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    protected function createSettingsModel()
    {
        return new Settings();
    }

    /**
     * @inheritdoc
     */
    protected function settingsHtml(): string
    {
        return Craft::$app->view->renderTemplate(
            'dudagram/settings',
            [
                'settings' => $this->getSettings()
            ]
        );
    }
}
