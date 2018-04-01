/**
 * @copyright  Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

Joomla = window.Joomla || {};

((Joomla, document) => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const searchwords = document.querySelectorAll('.js-finder-search-query');

    searchwords.forEach((searchword) => {
      // If the current value equals the default value, clear it.
      searchword.addEventListener('focus', (event) => {
        if (event.target.value === Joomla.JText._('MOD_FINDER_SEARCH_VALUE')) {
          event.target.value = ''; // eslint-disable-line no-param-reassign
        }
      });

      // Handle the auto suggestion
      if (Joomla.getOptions('finder-search')) {
        // If the current value is empty, set the previous value.
        searchword.addEventListener('keypress', (event) => {
          if (event.target.value.length > 1) {
            Joomla.request({
              url: `${Joomla.getOptions('finder-search').url}&q=${event.target.value}`,
              method: 'GET',
              data: { q: event.target.value },
              perform: true,
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              onSuccess(response, xhr) {
                response = JSON.parse(response); // eslint-disable-line no-param-reassign
                if (Object.prototype.toString.call(response.suggestions) === '[object Array]') {
                  new Awesomplete(event.target, { list: response.suggestions }); // eslint-disable-line no-new
                }
              },
              onError(xhr) {
                Joomla.renderMessages(Joomla.ajaxErrorsMessages(xhr));
              },
            });
          }
        });
      }
    });

    const forms = document.querySelectorAll('.js-finder-searchform');

    forms.forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.stopPropagation();
        const advanced = event.target.querySelector('.js-finder-advanced');

        // Disable select boxes with no value selected.
        if (advanced.length) {
          const fields = advanced.querySelector('select');

          fields.forEach((field) => {
            if (!field.value) {
              field.setAttribute('disabled', 'disabled');
            }
          });
        }
      });
    });
  });
})(Joomla, document);
