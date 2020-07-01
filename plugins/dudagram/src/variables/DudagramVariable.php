<?php

/**
 * dudagram plugin for Craft CMS 3.x
 *
 * Grab Instagram content through the Instagram Basic Display API
 *
 * @link      https://dudagroup.com
 * @copyright Copyright (c) 2020 Dudagroup
 */

namespace dudagroup\dudagram\variables;

use dudagroup\dudagram\Dudagram;
use dudagroup\dudagram\services\DudagramService;

use Craft;

/**
 * @author    Dudagroup
 * @package   Dudagram
 * @since     1.0.0
 */
class DudagramVariable
{
    // Public Methods
    // =========================================================================

    /**
     * @param null $optional
     * @return string
     */
    public function getInstagramFeed($limit = 25, $url = "")
    {
        return Dudagram::$plugin->dudagramService->getInstagramFeed($limit, $url);
    }
}
