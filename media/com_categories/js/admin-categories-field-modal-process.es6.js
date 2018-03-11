/**
 * @copyright  Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('category-modal-new-close') !== null) {
    document.getElementById('category-modal-new-close').addEventListener('click', (event) => {
      window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'add', 'category', 'cancel', 'item-form');
      return false;
    });
  }

  if (document.getElementById('category-modal-new-save') !== null) {
    document.getElementById('category-modal-new-save').addEventListener('click', (event) => {
      window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'add', 'category', 'save', 'item-form');
      return false;
    });
  }

  if (document.getElementById('category-modal-new-apply') !== null) {
    document.getElementById('category-modal-new-apply').addEventListener('click', (event) => {
      window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'add', 'category', 'apply', 'item-form');
      return false;
    });
  }

  if (document.getElementById('category-modal-edit-close') !== null) {
    document.getElementById('category-modal-edit-close').addEventListener('click', (event) => {
      window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'edit', 'category', 'cancel', 'item-form');
      return false;
    });
  }

  if (document.getElementById('category-modal-edit-save') !== null) {
    document.getElementById('category-modal-edit-save').addEventListener('click', (event) => {
      window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'edit', 'category', 'save', 'item-form');
      return false;
    });
  }

  if (document.getElementById('category-modal-edit-apply') !== null) {
    document.getElementById('category-modal-edit-apply').addEventListener('click', (event) => {
      window.processModalEdit(event.target, document.getElementById('category-modal-select').getAttribute('data-select-id'), 'edit', 'category', 'apply', 'item-form');
      return false;
    });
  }
});
