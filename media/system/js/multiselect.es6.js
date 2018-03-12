/**
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

/**
 * JavaScript behavior to allow shift select in administrator grids
 */
Joomla = window.Joomla || {};

((Joomla) => {
  const multiSelect = (formElement) => {
    'use strict';

    const tableEl = document.querySelector(formElement);

    if (!tableEl) {
      throw new Error('No checkboxes found!');
    }

    const boxes = [].slice.call(tableEl.querySelectorAll('input[type=checkbox]'));
    let last;

    const doselect = (e) => {
      const current = e.target;
      const boxs = boxes;
      let isChecked = false;

      if (e.shiftKey && last.length) {
        isChecked = current.hasAttribute(':checked');
        let lastIndex = boxs.index(last);
        let currentIndex = boxs.index(current);
        if (currentIndex < lastIndex) {
          // handle selection from bottom up
          const swap = lastIndex;
          lastIndex = currentIndex;
          currentIndex = swap;
        }
        boxs.slice(lastIndex, currentIndex + 1).setAttribute('checked', isChecked);
      }

      last = current;
    };

    boxes.forEach((box) => {
      box.addEventListener('click', (e) => {
        doselect(e);
      });
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    if (Joomla.getOptions && typeof Joomla.getOptions === 'function' && Joomla.getOptions('js-multiselect')) {
      if (Joomla.getOptions('js-multiselect').formName) {
        multiSelect(`#${Joomla.getOptions('js-multiselect').formName}`);
      } else {
        multiSelect('#adminForm');
      }
    }

    const rows = [].slice.call(document.querySelectorAll('tr[class^="row"]'));

    // Changes the background-color on every <td> inside a <tr>
    const changeBg = (item, checkall) => {
      // Check if it should add or remove the background colour
      if (checkall.checked) {
        [].slice.call(item.querySelectorAll('td')).forEach((td) => {
          td.classList.add('row-selected');
        });
      } else {
        [].slice.call(item.querySelectorAll('td')).forEach((td) => {
          td.classList.remove('row-selected');
        });
      }
    };

    const checkallToggle = document.getElementsByName('checkall-toggle')[0];

    if (checkallToggle) {
      checkallToggle.addEventListener('click', (evt) => {
        const checkall = evt.currentTarget;
        const changeBgr = changeBg;

        rows.forEach((row) => {
          changeBgr(row, checkall);
        });
      });
    }

    if (rows.length) {
      rows.forEach((row, index) => {
        row.addEventListener('click', (ev) => {
          const clicked = `cb${index}`;
          const cbClicked = document.getElementById(clicked);

          if (!(ev.target.id === clicked)) {
            cbClicked.checked = !cbClicked.checked;
            Joomla.isChecked(cbClicked.checked);
          }

          changeBg(ev.currentTarget, cbClicked);
        });
      });
    }
  });
})(Joomla);
