/**
* PLEASE DO NOT MODIFY THIS FILE. WORK ON THE ES6 VERSION.
* OTHERWISE YOUR CHANGES WILL BE REPLACED ON THE NEXT BUILD.
**/

/**
 * @copyright  Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

document.addEventListener('DOMContentLoaded', function () {
  var categoryModalNewClose = document.getElementById('category-modal-new-close');
  var categoryModalNewSave = document.getElementById('category-modal-new-save');
  var categoryModalNewApply = document.getElementById('category-modal-new-apply');
  var categoryModalEditClose = document.getElementById('category-modal-edit-close');
  var categoryModalEditSave = document.getElementById('category-modal-edit-save');
  var categoryModalEditApply = document.getElementById('category-modal-edit-apply');

  if (categoryModalNewClose) {
    categoryModalNewClose.addEventListener('click', function (event) {
      window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'add', 'category', 'cancel', 'item-form');
      return false;
    });
  }

  if (categoryModalNewSave) {
    categoryModalNewSave.addEventListener('click', function (event) {
      window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'add', 'category', 'save', 'item-form');
      return false;
    });
  }

  if (categoryModalNewApply) {
    categoryModalNewApply.addEventListener('click', function (event) {
      window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'add', 'category', 'apply', 'item-form');
      return false;
    });
  }

  if (categoryModalEditClose) {
    categoryModalEditClose.addEventListener('click', function (event) {
      window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'edit', 'category', 'cancel', 'item-form');
      return false;
    });
  }

  if (categoryModalEditSave) {
    categoryModalEditSave.addEventListener('click', function (event) {
      window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'edit', 'category', 'save', 'item-form');
      return false;
    });
  }

  if (categoryModalEditApply) {
    categoryModalEditApply.addEventListener('click', function (event) {
      window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'edit', 'category', 'apply', 'item-form');
      return false;
    });
  }
});
