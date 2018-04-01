/**
* PLEASE DO NOT MODIFY THIS FILE. WORK ON THE ES6 VERSION.
* OTHERWISE YOUR CHANGES WILL BE REPLACED ON THE NEXT BUILD.
**/

/**
 * @copyright  Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

Joomla = window.Joomla || {};

(function (Joomla, document) {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var searchwordNodes = document.querySelectorAll('.js-finder-search-query');
    var searchwords = [].splice.call(searchwordNodes);
    searchwords.forEach(function (searchword) {
      // If the current value equals the default value, clear it.
      searchword.addEventListener('focus', function (event) {
        if (event.target.value === Joomla.JText._('MOD_FINDER_SEARCH_VALUE')) {
          event.target.value = ''; // eslint-disable-line no-param-reassign
        }
      });

      // Handle the auto suggestion
      if (Joomla.getOptions('finder-search')) {
        // If the current value is empty, set the previous value.
        searchword.addEventListener('keypress', function (event) {
          if (event.target.value.length > 1) {
            Joomla.request({
              url: Joomla.getOptions('finder-search').url + '&q=' + event.target.value,
              method: 'GET',
              data: { q: event.target.value },
              perform: true,
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              onSuccess: function onSuccess(response, xhr) {
                response = JSON.parse(response); // eslint-disable-line no-param-reassign
                if (Object.prototype.toString.call(response.suggestions) === '[object Array]') {
                  new Awesomplete(event.target, { list: response.suggestions });
                }
              },
              onError: function onError(xhr) {
                Joomla.renderMessages(Joomla.ajaxErrorsMessages(xhr));
              }
            });
          }
        });
      }
    });

    var formNodes = document.querySelectorAll('.js-finder-searchform');
    var forms = [].slice.call(formNodes);
    forms.forEach(function (form) {
      form.addEventListener('submit', function (event) {
        event.stopPropagation();
        var advanced = event.target.querySelector('.js-finder-advanced');

        // Disable select boxes with no value selected.
        if (advanced.length) {
          var fields = advanced.querySelector('select');

          fields.forEach(function (field) {
            if (!field.value) {
              field.setAttribute('disabled', 'disabled');
            }
          });
        }
      });
    });
  });
})(Joomla, document);
