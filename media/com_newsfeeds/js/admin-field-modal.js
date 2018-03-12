/**
* PLEASE DO NOT MODIFY THIS FILE. WORK ON THE ES6 VERSION.
* OTHERWISE YOUR CHANGES WILL BE REPLACED ON THE NEXT BUILD.
**/

/**
 * @copyright  Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
document.addEventListener('DOMContentLoaded', function () {
  var inputGroupAppendId = document.getElementById('input-group-append-id');
  if (inputGroupAppendId) {
    var newsfeedId = inputGroupAppendId.getAttribute('data-newsfeed-id');

    window['jSelectNewsfeed_' + newsfeedId] = function (id, title, object) {
      window.processModalSelect('Newsfeed', newsfeedId, id, title, '', object);
    };
  }
});
