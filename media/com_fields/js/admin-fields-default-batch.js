/**
* PLEASE DO NOT MODIFY THIS FILE. WORK ON THE ES6 VERSION.
* OTHERWISE YOUR CHANGES WILL BE REPLACED ON THE NEXT BUILD.
**/

/**
 * @copyright  Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

document.addEventListener('DOMContentLoaded', function () {
  var batchSelector = document.querySelector('#batch-group-id');
  var batchCopyMove = document.querySelector('#batch-copy-move');
  batchCopyMove.style.display = 'none';

  batchSelector.addEventListener('change', function () {
    if (batchSelector.value === 'nogroup') {
      batchCopyMove.style.display = 'block';
    } else {
      batchCopyMove.style.display = 'none';
    }
  }, false);
});
