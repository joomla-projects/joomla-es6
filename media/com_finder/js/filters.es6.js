/**
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

Joomla = window.Joomla || {};

(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    Joomla.submitbutton = (pressbutton) => {
      if (pressbutton === 'filters.delete') {
        if (window.confirm(Joomla.JText._('COM_FINDER_INDEX_CONFIRM_DELETE_PROMPT'))) {
          Joomla.submitform(pressbutton);
        } else {
          return false;
        }
      }
      Joomla.submitform(pressbutton);
      return true;
    };
  });
})();
