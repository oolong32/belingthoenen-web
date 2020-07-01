<?php

/**
 * dudagram plugin for Craft CMS 3.x
 *
 * Grab Instagram content through the Instagram Basic Display API
 *
 * @link      https://dudagroup.com
 * @copyright Copyright (c) 2020 Dudagroup
 */

namespace dudagroup\dudagram\services;

use dudagroup\dudagram\Dudagram;

use Craft;
use craft\base\Component;
use craft\services\Plugins;
use putyourlightson\logtofile\LogToFile;

/**
 * @author    Dudagroup
 * @package   Dudagram
 * @since     1.0.0
 */
class DudagramService extends Component
{

    public function refreshToken()
    {
        $ch = curl_init();

        $params = [
            "access_token" => Dudagram::getInstance()->getSettings()->longAccessToken,
            "grant_type" => "ig_refresh_token"
        ];

        curl_setopt($ch, CURLOPT_URL, "https://graph.instagram.com/refresh_access_token?" . http_build_query($params));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $res = curl_exec($ch);
        curl_close($ch);

        try {
            $expires = json_decode($res)->expires_in;
            LogToFile::info("Successfully refreshed authentication token. Expires in " . $expires, "dudagram");
        } catch (Exception $e) {
            LogToFile::error("Failed to refresh authentication token. Error: " . $res, "dudagram");
        }

        return true;
    }

    public function getShortAccessToken($code)
    {
        $ch = curl_init();

        $params = [
            "client_id" => Dudagram::$plugin->getSettings()->appId,
            "client_secret" => Dudagram::$plugin->getSettings()->appSecret,
            "grant_type" => "authorization_code",
            "redirect_uri" => Craft::parseEnv(Craft::$app->sites->primarySite->baseUrl) . "/actions/dudagram/default/auth",
            "code" => $code
        ];

        curl_setopt($ch, CURLOPT_URL, "https://api.instagram.com/oauth/access_token");
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $res = curl_exec($ch);
        curl_close($ch);
        $shortAccessToken = json_decode($res)->access_token;

        return Dudagram::$plugin->dudagramService->getLongAccessToken($shortAccessToken);
    }


    public function getLongAccessToken($shortAccessToken)
    {
        $ch = curl_init();

        $params = [
            "client_secret" => Dudagram::$plugin->getSettings()->appSecret,
            "grant_type" => "ig_exchange_token",
            "access_token" => $shortAccessToken
        ];

        curl_setopt($ch, CURLOPT_URL, "https://graph.instagram.com/access_token?" . http_build_query($params));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $res = curl_exec($ch);
        curl_close($ch);
        $token = json_decode($res)->access_token;

        $plugin = Craft::$app->getPlugins()->getPlugin('dudagram');

        if ($plugin !== null) {
            Craft::$app->getPlugins()->savePluginSettings($plugin, array("longAccessToken" => $token));
        }

        return $token;
    }


    public function getInstagramFeed($limit, $after)
    {
        $ch = curl_init();

        if ($after != "") {
            $params = [
                "fields" => "caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username",
                "access_token" => Dudagram::$plugin->getSettings()->longAccessToken,
                "limit" => $limit,
                "after" => $after
            ];
        } else {
            $params = [
                "fields" => "caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username",
                "access_token" => Dudagram::$plugin->getSettings()->longAccessToken,
                "limit" => $limit
            ];
        }

        curl_setopt($ch, CURLOPT_URL, "https://graph.instagram.com/me/media?" . http_build_query($params));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $res = curl_exec($ch);
        curl_close($ch);

        $res = json_decode($res);
        return (isset($res->data) ? $res : null);
    }
}
