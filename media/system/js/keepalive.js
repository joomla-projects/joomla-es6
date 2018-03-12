/**
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

/**
 * Keepalive javascript behavior
 *
 * Used for keeping the session alive
 *
 * @package  Joomla
 * @since    3.7.0
 */
((window, document, getOptions, Request) => {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    const keepaliveOptions = getOptions('system.keepalive');
    let keepaliveUri = keepaliveOptions && keepaliveOptions.uri ? keepaliveOptions.uri.replace(/&amp;/g, '&') : '';
    const keepaliveInterval = keepaliveOptions && keepaliveOptions.interval ? keepaliveOptions.interval : 45 * 1000;

    // Fallback in case no keepalive uri was found.
    if (keepaliveUri === '') {
      const systemPaths = getOptions('system.paths');

      keepaliveUri = (systemPaths ? systemPaths.root + '/index.php' : window.location.pathname) + '?option=com_ajax&format=json';
    }

    window.setInterval(() => {
      Request({
        url: keepaliveUri,
        onSuccess: () => { },
        onError: () => { }
      });
    }, keepaliveInterval);
  });
})(window, document, Joomla.getOptions, Joomla.request);
