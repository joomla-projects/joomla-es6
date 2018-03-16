/**
 * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
((document, submitForm) => {
  'use strict';

  // Selectors used by this script
  const buttonDataSelector = 'data-submit-task';
  const formId = 'adminForm';

  /**
   * Submit the task
   * @param task
   */
  const submitTask = (task) => {
    const form = document.getElementById(formId);
    if (task === 'article.batch') {
      submitForm(task, form);
    }
  };

  // Register events
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('batch-submit-button-id');
    button.addEventListener('click', (e) => {
      const task = e.target.getAttribute(buttonDataSelector);
      submitTask(task);
    });
  });
})(document, Joomla.submitform);
