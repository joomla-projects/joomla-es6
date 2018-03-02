/**
 * @copyright  Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
document.addEventListener('DOMContentLoaded', () => {
  [].slice.call(document.querySelectorAll('#jform_image')).forEach((el) => {
    el.addEventListener('change', (event) => {
      const flagSelectedValue = event.currentTarget.value;
      const flagimage = document.getElementById('flag').querySelector('img');
      const src = `${Joomla.getOptions('juri_root')}/media/mod_languages/images/${flagSelectedValue}.gif`;
      if (flagSelectedValue) {
        flagimage.setAttribute('src', src);
        flagimage.setAttribute('alt', flagSelectedValue);
      } else {
        flagimage.removeAttribute('src');
        flagimage.setAttribute('alt', '');
      }
    }, false);
  });
});
