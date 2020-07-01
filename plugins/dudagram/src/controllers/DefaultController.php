<?php

/**
 * dudagram plugin for Craft CMS 3.x
 *
 * Grab Instagram content through the Instagram Basic Display API
 *
 * @link      https://dudagroup.com
 * @copyright Copyright (c) 2020 Dudagroup
 */

namespace dudagroup\dudagram\controllers;

use dudagroup\dudagram\Dudagram;
use dudagroup\dudagram\services\DudagramService;

use Craft;
use craft\web\Controller;

/**
 * @author    Dudagroup
 * @package   Dudagram
 * @since     1.0.0
 */
class DefaultController extends Controller
{

    // Protected Properties
    // =========================================================================

    /**
     * @var    bool|array Allows anonymous access to this controller's actions.
     *         The actions must be in 'kebab-case'
     * @access protected
     */
    protected $allowAnonymous = ['refresh-token', 'auth', 'get-next-page'];

    public function actionRefreshToken()
    {
        return Dudagram::$plugin->dudagramService->refreshToken();
    }

    public function actionAuth()
    {
        $url = parse_url(Craft::parseEnv(Craft::$app->sites->primarySite->baseUrl) . $_SERVER['REQUEST_URI']);
        parse_str($url['query'], $params);
        $code = $params['code'];

        if ($code != "") {
            $getToken = Dudagram::$plugin->dudagramService->getShortAccessToken($code);
            return true;
        }
    }

    public function actionGetNextPage($url)
    {
        $url = parse_url($url);
        parse_str($url['query'], $params);
        $after = $params['after'];
        $limit = $params['limit'];

        return json_encode(Dudagram::$plugin->dudagramService->getInstagramFeed($limit, $after));
    }
}
