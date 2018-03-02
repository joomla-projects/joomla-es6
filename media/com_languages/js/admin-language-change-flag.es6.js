/**
 * @copyright  Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
document.addEventListener('DOMContentLoaded', () => {
  [].forEach.call(document.querySelectorAll('#jform_image'), (el) => {
    el.addEventListener('change', (event) => {
      const flag = event.currentTarget.value;
      const flagimage = document.querySelector('#flag img');
      const src = `${Joomla.getOptions('juri_root')}/media/mod_languages/images/${flag}.gif`;
      if (flag) {
        flagimage.setAttribute('src', src);
        flagimage.setAttribute('alt', flag);
      } else {
        flagimage.removeAttribute('src');
        flagimage.setAttribute('alt', '');
      }
    }, false);
  });
});
