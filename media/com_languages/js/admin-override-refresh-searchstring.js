/**
* PLEASE DO NOT MODIFY THIS FILE. WORK ON THE ES6 VERSION.
* OTHERWISE YOUR CHANGES WILL BE REPLACED ON THE NEXT BUILD.
**/

/**
 * @copyright  Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('jform_searchstring').addEventListener('focus', function (event) {
    if (!Joomla.overrider.states.refreshed) {
      var expired = Joomla.getOptions('search-string-expired');
      if (expired) {
        Joomla.overrider.refreshCache();
        Joomla.overrider.states.refreshed = true;
      }
    }
    event.currentTarget.classList.remove('invalid');
  }, false);
});
