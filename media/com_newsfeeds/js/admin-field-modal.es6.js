/**
 * @copyright  Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('input-group-append-id') !== null) {
    const newsfeedId = document.getElementById('input-group-append-id').getAttribute('data-newsfeed-id');

    window[`jSelectNewsfeed_${newsfeedId}`] = (id, title, object) => {
      window.processModalSelect('Newsfeed', newsfeedId, id, title, '', object);
    };
  }
});
