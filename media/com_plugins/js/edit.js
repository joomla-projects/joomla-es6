/**
* PLEASE DO NOT MODIFY THIS FILE. WORK ON THE ES6 VERSION.
* OTHERWISE YOUR CHANGES WILL BE REPLACED ON THE NEXT BUILD.
**/

/**
 * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
Joomla.submitbutton = function (task) {
  if (task === 'plugin.cancel' || document.formvalidator.isValid(document.getElementById('style-form'))) {
    Joomla.submitform(task, document.getElementById('style-form'));
  }
};
