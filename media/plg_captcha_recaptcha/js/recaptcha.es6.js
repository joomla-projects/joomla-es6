/**
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

window.JoomlaInitReCaptcha2 = () => {
  const items = document.getElementsByClassName('g-recaptcha');
  let item;
  let options;
  for (let i = 0, l = items.length; i < l; i++) {
    item = items[i];
    options = item.dataset ? item.dataset : {
      sitekey: item.getAttribute('data-sitekey'),
      theme: item.getAttribute('data-theme'),
      size: item.getAttribute('data-size')
    };
    grecaptcha.render(item, options);
  }
}
