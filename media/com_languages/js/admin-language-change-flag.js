/**
* PLEASE DO NOT MODIFY THIS FILE. WORK ON THE ES6 VERSION.
* OTHERWISE YOUR CHANGES WILL BE REPLACED ON THE NEXT BUILD.
**/

/**
 * @copyright  Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
document.addEventListener('DOMContentLoaded', function () {
  [].forEach.call(document.querySelectorAll('#jform_image'), function (el) {
    el.addEventListener('change', function (event) {
      var flag = event.currentTarget.value;
      var flagimage = document.querySelector('#flag img');
      var src = Joomla.getOptions('juri_root') + '/media/mod_languages/images/' + flag + '.gif';
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
