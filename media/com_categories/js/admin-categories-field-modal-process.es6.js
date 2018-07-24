/**
 * @copyright  Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

document.addEventListener('DOMContentLoaded', () => {
  const categoryModalNewClose = document.getElementById('category-modal-new-close');
  const categoryModalNewSave = document.getElementById('category-modal-new-save');
  const categoryModalNewApply = document.getElementById('category-modal-new-apply');
  const categoryModalEditClose = document.getElementById('category-modal-edit-close');
  const categoryModalEditSave = document.getElementById('category-modal-edit-save');
  const categoryModalEditApply = document.getElementById('category-modal-edit-apply');

  if (categoryModalNewClose) {
    categoryModalNewClose.addEventListener('click', (event) => {
      window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'add', 'category', 'cancel', 'item-form');
      return false;
    });
  }

  if (categoryModalNewSave) {
    categoryModalNewSave.addEventListener('click', (event) => {
      window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'add', 'category', 'save', 'item-form');
      return false;
    });
  }

  if (categoryModalNewApply) {
    categoryModalNewApply.addEventListener('click', (event) => {
      window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'add', 'category', 'apply', 'item-form');
      return false;
    });
  }

  if (categoryModalEditClose) {
    categoryModalEditClose.addEventListener('click', (event) => {
      window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'edit', 'category', 'cancel', 'item-form');
      return false;
    });
  }

  if (categoryModalEditSave) {
    categoryModalEditSave.addEventListener('click', (event) => {
      window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'edit', 'category', 'save', 'item-form');
      return false;
    });
  }


  if (categoryModalEditApply) {
    categoryModalEditApply.addEventListener('click', (event) => {
      window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'edit', 'category', 'apply', 'item-form');
      return false;
    });
  }
});
