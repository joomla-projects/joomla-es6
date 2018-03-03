/**
* PLEASE DO NOT MODIFY THIS FILE. WORK ON THE ES6 VERSION.
* OTHERWISE YOUR CHANGES WILL BE REPLACED ON THE NEXT BUILD.
**/

/**
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

Joomla = window.Joomla || {};

document.addEventListener('DOMContentLoaded', function () {
  window.joomlaupdate_password = Joomla.getOptions('joomlaupdate_password');
  window.joomlaupdate_totalsize = Joomla.getOptions('joomlaupdate_totalsize');
  window.joomlaupdate_ajax_url = Joomla.getOptions('joomlaupdate_ajax_url');
  window.joomlaupdate_return_url = Joomla.getOptions('joomlaupdate_return_url');
  window.pingExtract();
});
