/**
 * @copyright  Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
document.addEventListener('DOMContentLoaded', () => {
  const inputGroupAppendId = document.getElementById('input-group-append-id');
  if (inputGroupAppendId) {
    const newsfeedId = inputGroupAppendId.getAttribute('data-newsfeed-id');

    window[`jSelectNewsfeed_${newsfeedId}`] = (id, title, object) => {
      window.processModalSelect('Newsfeed', newsfeedId, id, title, '', object);
    };
  }
});
