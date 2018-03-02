/**
 * @copyright  Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
(() => {
  'use strict';

  /**
    * Javascript to insert the link
    * View element calls jSelectArticle when an article is clicked
    * jSelectArticle creates the link tag, sends it to the editor,
    * and closes the select frame.
    * */
  window.jSelectArticle = (id, title, catid, object, link, lang) => {
    let hreflang = '';
    if (!Joomla.getOptions('xtd-articles')) {
    // Something went wrong!
      window.parent.jModalClose();
      return false;
    }

    const { editor } = Joomla.getOptions('xtd-articles');

    if (lang !== '') {
      hreflang = `hreflang="${lang}"`;
    }

    const tag = `<a ${hreflang} href="${link}">${title}</a>`;
    window.parent.Joomla.editors.instances[editor].replaceSelection(tag);
    window.parent.jModalClose();
    return true;
  };

  document.addEventListener('DOMContentLoaded', () => {
  // Get the elements
    const elements = document.querySelectorAll('.select-link');

    for (let i = 0, l = elements.length; l > i; i += 1) {
    // Listen for click event
      elements[i].addEventListener('click', (event) => {
        event.preventDefault();
        const functionName = event.target.getAttribute('data-function');

        if (functionName === 'jSelectArticle') {
          // Used in xtd_contacts
          window[functionName](event.target.getAttribute('data-id'), event.target.getAttribute('data-title'), event.target.getAttribute('data-cat-id'), null, event.target.getAttribute('data-uri'), event.target.getAttribute('data-language'));
        } else {
          // Used in com_menus
          window.parent[functionName](event.target.getAttribute('data-id'), event.target.getAttribute('data-title'), event.target.getAttribute('data-cat-id'), null, event.target.getAttribute('data-uri'), event.target.getAttribute('data-language'));
        }
      });
    }
  });
})();
