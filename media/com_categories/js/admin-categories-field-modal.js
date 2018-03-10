/**
* PLEASE DO NOT MODIFY THIS FILE. WORK ON THE ES6 VERSION.
* OTHERWISE YOUR CHANGES WILL BE REPLACED ON THE NEXT BUILD.
**/

/**
 * @copyright  Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

document.addEventListener('DOMContentLoaded', function () {
  var dataSelectId = document.getElementById('category-modal-select').getAttribute('data-select-id');
  var functionName = 'jSelectCategory_' + dataSelectId;
  var f = function f(id, title, object) {
    window.processModalSelect('Category', dataSelectId, id, title, '', object);
  };
  window[functionName] = f;

  document.getElementById(dataSelectId + '_clear').addEventListener('click', function () {
    window.processModalParent(document.getElementById('category-modal-select').getAttribute('data-select-id'));
    return false;
  });

  document.getElementById('category-modal-new-close').addEventListener('click', function (event) {
    window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'add', 'category', 'cancel', 'item-form');
    return false;
  });

  document.getElementById('category-modal-new-save').addEventListener('click', function (event) {
    window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'add', 'category', 'save', 'item-form');
    return false;
  });

  document.getElementById('category-modal-new-apply').addEventListener('click', function (event) {
    window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'add', 'category', 'apply', 'item-form');
    return false;
  });

  document.getElementById('category-modal-edit-close').addEventListener('click', function (event) {
    window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'edit', 'category', 'cancel', 'item-form');
    return false;
  });

  document.getElementById('category-modal-edit-save').addEventListener('click', function (event) {
    window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'edit', 'category', 'save', 'item-form');
    return false;
  });

  document.getElementById('category-modal-edit-apply').addEventListener('click', function (event) {
    window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'edit', 'category', 'apply', 'item-form');
    return false;
  });
});
