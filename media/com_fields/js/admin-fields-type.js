/**
* PLEASE DO NOT MODIFY THIS FILE. WORK ON THE ES6 VERSION.
* OTHERWISE YOUR CHANGES WILL BE REPLACED ON THE NEXT BUILD.
**/

/**
 * @copyright  Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

Joomla = window.Joomla || {};

(function (document, Joomla) {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    Joomla.loadingLayer('load');

    [].slice.call(document.querySelectorAll('.fields-type-field')).forEach(function (field) {
      field.addEventListener('change', function (event) {
        Joomla.loadingLayer('show');

        var task = event.target.form.querySelector('input[name=task]');

        task.value = 'field.reload';
        event.target.form.submit();
      });
    });
  });
})(document, Joomla);
