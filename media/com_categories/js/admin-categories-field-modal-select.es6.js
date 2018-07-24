/**
 * @copyright  Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
((document) => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const categoryModalSelect = document.getElementById('category-modal-select');

    if (categoryModalSelect) {
      const dataSelectId = categoryModalSelect.getAttribute('data-select-id');
      const functionName = `jSelectCategory_${dataSelectId}`;
      const f = (id, title, object) => {
        window.processModalSelect('Category', dataSelectId, id, title, '', object);
      };
      window[functionName] = f;

      document.getElementById(`${dataSelectId}_clear`).addEventListener('click', () => {
        window.processModalParent(document.getElementById('category-modal-select').getAttribute('data-select-id'));
        return false;
      });
    }
  });
})(document);