/**
* PLEASE DO NOT MODIFY THIS FILE. WORK ON THE ES6 VERSION.
* OTHERWISE YOUR CHANGES WILL BE REPLACED ON THE NEXT BUILD.
**/

/**
 * @copyright  Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('input-group-append-id') !== null) {
    var newsfeedId = document.getElementById('input-group-append-id').getAttribute('data-newsfeed-id');

    window['jSelectNewsfeed_' + newsfeedId] = function (id, title, object) {
      window.processModalSelect('Newsfeed', newsfeedId, id, title, '', object);
    };
  }
});
