/**
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

/**
 * JavaScript behavior to allow shift select in administrator grids
 */
Joomla = window.Joomla || {};

((Joomla) => {
  Joomla.JMultiSelect = (formElement) => {
    'use strict';
    const initialize = (formElement) => {
      const tableEl = document.querySelector(formElement);

      if (tableEl) {
        boxes = [].slice.call(tableEl.querySelectorAll('input[type=checkbox]'));
        boxes.forEach((box) => {
          box.addEventListener('click', (e) => {
            doselect(e)
          })
        });
      }
    };

    const doselect = (e) => {
      const current = e.target;
      let last;
      let isChecked = false;

      if (e.shiftKey && last.length) {
        isChecked = current.hasAttribute(':checked');
        let lastIndex = boxes.index(last);
        let currentIndex = boxes.index(current);
        if (currentIndex < lastIndex) {
          // handle selection from bottom up
          const swap = lastIndex;
          lastIndex = currentIndex;
          currentIndex = swap;
        }
        boxes.slice(lastIndex, currentIndex + 1).setAttribute('checked', isChecked);
      }

      last = current;
    };
    initialize(formElement);
  };

  document.addEventListener('DOMContentLoaded', (event) => {
    if (Joomla.getOptions && typeof Joomla.getOptions === 'function' && Joomla.getOptions('js-multiselect')) {
      if (Joomla.getOptions('js-multiselect').formName) {
        Joomla.JMultiSelect(Joomla.getOptions('js-multiselect').formName);
      } else {
        Joomla.JMultiSelect('adminForm');
      }
    }

    const rows = [].slice.call(document.querySelectorAll('tr[class^="row"]'));

    // Changes the background-color on every <td> inside a <tr>
    changeBg = (item, checkall) => {
      // Check if it should add or remove the background colour
      if (checkall.checked) {
        [].slice.call(item.querySelectorAll('td')).forEach((td) => {
          td.classList.add('row-selected');
        });
      }
      else {
        [].slice.call(item.querySelectorAll('td')).forEach((td) => {
          td.classList.remove('row-selected');
        });
      }
    }

    const checkallToggle = document.getElementsByName('checkall-toggle')[0];

    if (checkallToggle) {
      checkallToggle.addEventListener('click', (event) => {
        const checkall = event.currentTarget;

        rows.forEach((row, index) => {
          changeBg(row, checkall);
        });
      });
    }

    if (rows.length) {
      rows.forEach((row, index) => {
        row.addEventListener('click', (event) => {
          const clicked = 'cb' + index;
          const cbClicked = document.getElementById(clicked);

          if (!(event.target.id == clicked)) {
            cbClicked.checked = !cbClicked.checked;
            Joomla.isChecked(cbClicked.checked);
          }

          changeBg(event.currentTarget, cbClicked);
        });
      });
    }
  });
})(Joomla);
