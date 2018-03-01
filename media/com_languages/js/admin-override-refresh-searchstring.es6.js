/**
 * @copyright  Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

document.addEventListener('DOMContentLoaded', () => {
  [].forEach.call(document.querySelectorAll('#jform_searchstring'), (el) => {
    el.addEventListener('focus', (event) => {
      if (!Joomla.overrider.states.refreshed) {
        const expired = Joomla.getOptions('search-string-expired');
        if (expired) {
          Joomla.overrider.refreshCache();
          Joomla.overrider.states.refreshed = true;
        }
      }
      event.currentTarget.removeClass('invalid');
    }, false);
  });
});
