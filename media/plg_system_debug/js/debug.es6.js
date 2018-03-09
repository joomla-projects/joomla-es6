/**
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

Joomla = window.Joomla || {};

(((Joomla, document) => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    Joomla.toggleContainer = name => {
      const container = document.getElementById(name);
      container.style.display = container.style.display === 'none' ? 'block' : 'none';
    };

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    const debugWrapper = document.getElementById('system-debug');
    if (sidebarWrapper && debugWrapper) {
      debugWrapper.style.marginLeft = '60px';
    }
  });
})(Joomla, document));
