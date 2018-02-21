/**
 * @copyright  Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

Joomla = window.Joomla || {};

((Joomla => {
  'use strict';

  Joomla.fieldIns = (id, editor) => {
    // Use the API, if editor supports it
    const win = window.parent;
    const parentJoomla = win.Joomla;
    if (parentJoomla && parentJoomla.editors && parentJoomla.editors.instances && parentJoomla.editors.instances.hasOwnProperty(editor)) {
      parentJoomla.editors.instances[editor].replaceSelection("{field " + id + "}")
    } else {
      win.jInsertEditorText("{field " + id + "}", editor);
    }

    win.jModalClose();
  };

  Joomla.fieldgroupIns = (id, editor) => {
    // Use the API, if editor supports it
    const win = window.parent;
    const parentJoomla = win.Joomla;
    if (parentJoomla && parentJoomla.editors && parentJoomla.editors.instances && parentJoomla.editors.instances.hasOwnProperty(editor)) {
      parentJoomla.editors.instances[editor].replaceSelection("{fieldgroup " + id + "}")
    } else {
      win.jInsertEditorText("{fieldgroup " + id + "}", editor);
    }

    win.jModalClose();
  };
}))(Joomla);
