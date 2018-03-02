/**
 * @copyright  Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

Joomla = window.Joomla || {};

((document, Joomla) => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    Joomla.loadingLayer('load');

    [].slice.call(document.querySelectorAll('.fields-type-field')).forEach((field) => {
      field.addEventListener('change', (event) => {
        Joomla.loadingLayer('show');

        const task = event.target.form.querySelector('input[name=task]');

        task.value = 'field.reload';
        event.target.form.submit();
      });
    });
  });
})(document, Joomla);
