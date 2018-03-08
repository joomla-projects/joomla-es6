/**
 * @copyright  Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('jform_searchstring').addEventListener('focus', (event) => {
    if (!Joomla.overrider.states.refreshed) {
      const expired = document.getElementById('overrider-spinner').dataset.searchstringexpired;
      if (expired) {
        Joomla.overrider.refreshCache();
        Joomla.overrider.states.refreshed = true;
      }
    }
    event.currentTarget.classList.remove('invalid');
  }, false);
});
