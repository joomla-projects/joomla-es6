/**
* PLEASE DO NOT MODIFY THIS FILE. WORK ON THE ES6 VERSION.
* OTHERWISE YOUR CHANGES WILL BE REPLACED ON THE NEXT BUILD.
**/

/**
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

Joomla = window.Joomla || {};

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    Joomla.submitbutton = function (pressbutton) {
      if (pressbutton === 'map.delete') {
        if (window.confirm(Joomla.JText._('COM_FINDER_MAPS_CONFIRM_DELETE_PROMPT'))) {
          Joomla.submitform(pressbutton);
        } else {
          return false;
        }
      }
      Joomla.submitform(pressbutton);
      return true;
    };
  });
})();
