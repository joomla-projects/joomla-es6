/**
 * @copyright  Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

(function() {
	document.addEventListener('DOMContentLoaded', function() {

		if (window.toggleSidebar) {
			toggleSidebar(true);
		} else {
			var sidebarHeader = document.getElementById('j-toggle-sidebar-header');
			if (sidebarHeader) {
				sidebarHeader.style.display = 'none';
			}

			var sidebarWrapper = document.getElementById('j-toggle-sidebar-wrapper');
			if (sidebarWrapper) {
				sidebarWrapper.style.display = 'none';
			}
		}

	});
})();
