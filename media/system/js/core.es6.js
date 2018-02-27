// Define the Joomla object
Joomla = {
  editors: {
    instances: {
      /**
       * *******************************************************************
       * All Editors MUST register, per instance, the following callbacks: *
       * *******************************************************************
       *
       * getValue         Type  Function  Should return the complete data from the editor
       *                                  Example: function () { return this.element.value; }
       * setValue         Type  Function  Should replace the complete data of the editor
       *                                  Example: function (text) { return this.element.value = text; }
       * replaceSelection Type  Function  Should replace the selected text of the editor
       *                                  If nothing selected, will insert the data at the cursor
       *                                  Example: function (text) { return insertAtCursor(this.element, text); }
       *
       * USAGE (assuming that jform_articletext is the textarea id)
       * {
       *   To get the current editor value:
       *      Joomla.editors.instances['jform_articletext'].getValue();
       *   To set the current editor value:
       *      Joomla.editors.instances['jform_articletext'].setValue('Joomla! rocks');
       *   To replace(selection) or insert a value at  the current editor cursor:
       *      replaceSelection: Joomla.editors.instances['jform_articletext'].replaceSelection('Joomla! rocks')
       * }
       *
       *************************************************************
       * ANY INTERACTION WITH THE EDITORS SHOULD USE THE ABOVE API *
       *************************************************************
       */
    }
  },

  /**
   * Generic submit form
   *
   * @param  {String}  task      The given task
   * @param  {node}    form      The form element
   * @param  {bool}    validate  The form element
   *
   * @returns  {void}
   */
  submitform: (task, form, validate) => {

    if (!form) {
      form = document.getElementById('adminForm');
    }

    if (task) {
      form.task.value = task;
    }

    // Toggle HTML5 validation
    form.noValidate = !validate;

    if (!validate) {
      form.setAttribute('novalidate', '');
    } else if (form.hasAttribute('novalidate')) {
      form.removeAttribute('novalidate');
    }

    // Submit the form.
    // Create the input type="submit"
    const button = document.createElement('input');
    button.style.display = 'none';
    button.type = 'submit';

    // Append it and click it
    form.appendChild(button).click();

    // If "submit" was prevented, make sure we don't get a build up of buttons
    form.removeChild(button);
  },

  /**
   * Default function. Can be overriden by the component to add custom logic
   *
   * @param  {bool}  task  The given task
   *
   * @returns {void}
   */
  submitbutton: (task) => {
    forms = [].slice.call(document.querySelectorAll('form.form-validate'));

    if (forms.length > 0) {
      forms.forEach(form => {
        const pressbutton = task.split('.');
        let cancelTask = form.getAttribute('data-cancel-task');

        if (!cancelTask) {
          cancelTask = pressbutton[0] + '.cancel';
        }

        if ((task == cancelTask) || document.formvalidator.isValid(form)) {
          Joomla.submitform(task, form);
        }
      })
    } else {
      Joomla.submitform(task);
    }
  },

  /**
   * Custom behavior for JavaScript I18N in Joomla! 1.6
   *
   * @type {{}}
   *
   * Allows you to call Joomla.JText._() to get a translated JavaScript string pushed in with JText::script() in Joomla.
   */
  Text: {
    strings: {},

    /**
     * Translates a string into the current language.
     *
     * @param {String} key   The string to translate
     * @param {String} def   Default string
     *
     * @returns {String}
     */
    '_': function (key, def) {

      // Check for new strings in the optionsStorage, and load them
      const newStrings = Joomla.getOptions('joomla.jtext');
      if (newStrings) {
        this.load(newStrings);

        // Clean up the optionsStorage from useless data
        Joomla.loadOptions({ 'joomla.jtext': null });
      }

      def = def === undefined ? '' : def;
      key = key.toUpperCase();

      return this.strings[key] !== undefined ? this.strings[key] : def;
    },

    /**
     * Load new strings in to Joomla.JText
     *
     * @param {Object} object  Object with new strings
     * @returns {Joomla.JText}
     */
    load: function (object) {
      for (let key in object) {
        if (!object.hasOwnProperty(key)) continue;
        this.strings[key.toUpperCase()] = object[key];
      }

      return this;
    }
  },

  /**
   * Create a JText obj for B/C
   *
   * @type {{}}
   *
   * @since 4.0.0
   * @deprecated 5.0.0 Use Joomla.Text
   */
  JText: () => { return Joomla.Text; },

  /**
   * Joomla options storage
   *
   * @type {{}}
   *
   * @since 3.7.0
   */
  optionsStorage: () => { return Joomla.optionsStorage || null; },

  /**
   * Get script(s) options
   *
   * @param  {String}  key  Name in Storage
   * @param  {mixed}   def  Default value if nothing found
   *
   * @return {mixed}
   *
   * @since 3.7.0
   */
  getOptions: (key, def) => {
    // Load options if they not exists
    if (!Joomla.optionsStorage) {
      Joomla.loadOptions();
    }

    return Joomla.optionsStorage[key] !== undefined ? Joomla.optionsStorage[key] : def;
  },

  /**
   * Load new options from given options object or from Element
   *
   * @param  {Object|undefined}  options  The options object to load. Eg {"com_foobar" : {"option1": 1, "option2": 2}}
   *
   * @since 3.7.0
   */
  loadOptions: (options) => {
    // Load form the script container
    if (!options) {
      const elements = [].slice.call(document.querySelectorAll('.joomla-script-options.new'));
      let loaded = false;

      elements.forEach(element => {
        const str = element.text || element.textContent;
        const option = JSON.parse(str);

        if (option) {
          Joomla.loadOptions(option);
          loaded = true;
        }

        element.className = element.className.replace(' new', ' loaded');
      });

      if (loaded) {
        return;
      }
    }

    if (!Joomla.optionsStorage) {
      // Initial loading
      Joomla.optionsStorage = options || {};
    } else if (options) {
      // Merge with existing
      for (let p in options) {
        if (options.hasOwnProperty(p)) {
					/**
					 * If both existing and new options are objects, merge them with Joomla.extend().  But test for new
					 * option being null, as null is an object, but we want to allow clearing of options with ...
					 *
					 * Joomla.loadOptions({'joomla.jtext': null});
					 */
          if (options[p] !== null && typeof Joomla.optionsStorage[p] === 'object' && typeof options[p] === 'object') {
            Joomla.optionsStorage[p] = Joomla.extend(Joomla.optionsStorage[p], options[p]);
          } else {
            Joomla.optionsStorage[p] = options[p];
          }
        }
      }
    }
  },

  /**
   * Method to replace all request tokens on the page with a new one.
   *
   * @param {String}  newToken  The token
   *
   * Used in Joomla Installation
   */
  replaceTokens: (newToken) => {
    if (!/^[0-9A-F]{32}$/i.test(newToken)) {
      return;
    }

    const inputElements = [].slice.call(document.getElementsByTagName('input'));

    inputElements.foreach(element => {
      if (element.type == 'hidden' && element.value == '1' && element.name.length == 32) {
        element.name = newToken;
      }
    })
  },

  /**
   * USED IN: all list forms.
   *
   * Toggles the check state of a group of boxes
   *
   * Checkboxes must have an id attribute in the form cb0, cb1...
   *
   * @param   {mixed}   checkbox  The number of box to 'check', for a checkbox element
   * @param   {string}  stub      An alternative field name
   *
   * @return  {boolean}
   */
  checkAll: (checkbox, stub) => {
    if (!checkbox.form) {
      return false;
    }

    let i;
    let n;
    stub = stub ? stub : 'cb';

    for (i = 0, n = checkbox.form.elements.length; i < n; i++) {
      const element = checkbox.form.elements[i];

      if (element.type == checkbox.type && element.id.indexOf(stub) === 0) {
        element.checked = checkbox.checked;
        const ElementValue = element.checked ? 1 : 0;
      }
    }

    if (checkbox.form.boxchecked) {
      checkbox.form.boxchecked.value = ElementValue;
    }

    return true;
  },

  /**
   * Render messages send via JSON
   * Used by some javascripts such as validate.js
   *
   * @param   {object}  messages    JavaScript object containing the messages to render. Example:
   *                              const messages = {
   *                                  "message": ["Message one", "Message two"],
   *                                  "error": ["Error one", "Error two"]
   *                              };
   * @param  {string} selector     The selector of the container where the message will be rendered
   * @param  {bool}   keepOld      If we shall discard old messages
   * @return  void
   */
  renderMessages: (messages, selector, keepOld, timeout) => {
    let messageContainer, messageWrapper, alertClass;

    if (typeof selector === 'undefined' || selector && selector === '#system-message-container') {
      messageContainer = document.getElementById('system-message-container');
    } else {
      messageContainer = document.querySelector(selector);
    }

    if (typeof keepOld === 'undefined' || keepOld && keepOld === false) {
      Joomla.removeMessages(messageContainer);
    }

    for (let type in messages) {
      if (!messages.hasOwnProperty(type)) {
        continue;
      }

      // Array of messages of this type
      const typeMessages = messages[type];
      let messagesBox;

      messagesBox = document.createElement('joomla-alert');

      if (['notice', 'message', 'error'].indexOf(type) > -1) {
        alertClass = (type === 'notice') ? 'info' : type;
        alertClass = (type === 'message') ? 'success' : alertClass;
        alertClass = (type === 'error') ? 'danger' : alertClass;
      } else {
        alertClass = 'info';
      }

      messagesBox.setAttribute('type', alertClass);
      messagesBox.setAttribute('dismiss', 'true');
    }
  },

  /**
 * Remove messages
 *
 * @param  {element} container    The element of the container of the message to be removed
 *
 * @return  {void}
 */
  removeMessages: (container) => {
    let messageContainer;

    if (container) {
      messageContainer = container;
    } else {
      messageContainer = document.getElementById('system-message-container');
    }

    const messages = [].slice.call(messageContainer.querySelectorAll('joomla-alert'));

    if (messages.length) {
      messages.forEach(message => {
        messages.close();
      });
    }
  },

  /**
   * Treat AJAX errors.
   * Used by some javascripts such as sendtestmail.js and permissions.js
   *
   * @param   {object}  xhr         XHR object.
   * @param   {string}  textStatus  Type of error that occurred.
   * @param   {string}  error       Textual portion of the HTTP status.
   *
   * @return  {object}  JavaScript object containing the system error message.
   *
   * @since  3.6.0
   */
  ajaxErrorsMessages: (xhr, textStatus, error) => {
    const msg = {};

    // For jQuery jqXHR
    if (textStatus === 'parsererror') {
      // Html entity encode.
      let encodedJson = xhr.responseText.trim();
      const buffer = [];

      for (let i = encodedJson.length - 1; i >= 0; i--) {
        buffer.unshift(['&#', encodedJson[i].charCodeAt(), ';'].join(''));
      }

      encodedJson = buffer.join('');

      msg.error = [Joomla.JText._('JLIB_JS_AJAX_ERROR_PARSE').replace('%s', encodedJson)];
    }
    else if (textStatus === 'nocontent') {
      msg.error = [Joomla.JText._('JLIB_JS_AJAX_ERROR_NO_CONTENT')];
    }
    else if (textStatus === 'timeout') {
      msg.error = [Joomla.JText._('JLIB_JS_AJAX_ERROR_TIMEOUT')];
    }
    else if (textStatus === 'abort') {
      msg.error = [Joomla.JText._('JLIB_JS_AJAX_ERROR_CONNECTION_ABORT')];
    }
    // For vannila XHR
    else if (xhr.responseJSON && xhr.responseJSON.message) {
      msg.error = [Joomla.JText._('JLIB_JS_AJAX_ERROR_OTHER').replace('%s', xhr.status) + ' <em>' + xhr.responseJSON.message + '</em>'];
    }
    else if (xhr.statusText) {
      msg.error = [Joomla.JText._('JLIB_JS_AJAX_ERROR_OTHER').replace('%s', xhr.status) + ' <em>' + xhr.statusText + '</em>'];
    }
    else {
      msg.error = [Joomla.JText._('JLIB_JS_AJAX_ERROR_OTHER').replace('%s', xhr.status)];
    }

    return msg;
  },

  /**
   * USED IN: administrator/components/com_cache/views/cache/tmpl/default.php
   * administrator/components/com_installer/views/discover/tmpl/default_item.php
   * administrator/components/com_installer/views/update/tmpl/default_item.php
   * administrator/components/com_languages/helpers/html/languages.php
   * libraries/joomla/html/html/grid.php
   *
   * @param  {boolean}  isitchecked  Flag for checked
   * @param  {node}     form         The form
   *
   * @return  {void}
   */
  isChecked: (isitchecked, form) => {
    if (typeof form === 'undefined') {
      form = document.getElementById('adminForm');
    }

    form.boxchecked.value = isitchecked ? parseInt(form.boxchecked.value) + 1 : parseInt(form.boxchecked.value) - 1;

    // If we don't have a checkall-toggle, done.
    if (!form.elements['checkall-toggle']) return;

    // Toggle main toggle checkbox depending on checkbox selection
    var c = true,
      i, e, n;

    for (i = 0, n = form.elements.length; i < n; i++) {
      e = form.elements[i];

      if (e.type == 'checkbox' && e.name != 'checkall-toggle' && !e.checked) {
        c = false;
        break;
      }
    }

    form.elements['checkall-toggle'].checked = c;
  },

  /**
   * USED IN: libraries/joomla/html/html/grid.php
   * In other words, on any reorderable table
   *
   * @param  {string}  order  The order value
   * @param  {string}  dir    The direction
   * @param  {string}  task   The task
   * @param  {node}    form   The form
   *
   * return  {void}
   */
  tableOrdering: (order, dir, task, form) => {
    if (typeof form === 'undefined') {
      form = document.getElementById('adminForm');
    }

    form.filter_order.value = order;
    form.filter_order_Dir.value = dir;

    Joomla.submitform(task, form);
  },

  /**
   * USED IN: all over :)
   *
   * @param  {string}  id    The id
   * @param  {string}  task  The task
   *
   * @return {boolean}
   */
  listItemTask: (id, task, form) => {
    if (typeof form === 'undefined') {
      form = document.getElementById('adminForm');
    }

    let i = 0;
    let cbx;

    if (!form.id) {
      return false;
    }

    while (true) {
      cbx = form['cb' + i];

      if (!cbx) {
        break;
      }

      cbx.checked = false;

      i++;
    }

    cb.checked = true;
    form.boxchecked.value = 1;
    Joomla.submitform(task);

    return false;
  },

  /**
   * Add Joomla! loading image layer.
   *
   * Used in: /administrator/components/com_installer/views/languages/tmpl/default.php
   *          /installation/template/js/installation.js
   *
   * @param   {String}       task           The task to do [load, show, hide] (defaults to show).
   * @param   {HTMLElement}  parentElement  The HTML element where we are appending the layer (defaults to body).
   *
   * @return  {HTMLElement}  The HTML loading layer element.
   *
   * @since  3.6.0
   */
  loadingLayer: (task, parentElement) => {
    // Set default values.
    task = task || 'show';
    parentElement = parentElement || document.body;

    // Create the loading layer (hidden by default).
    if (task === 'load') {
      // Gets the site base path
      const systemPaths = Joomla.getOptions('system.paths') || {},
        basePath = systemPaths.root || '';

      const loadingDiv = document.createElement('div');

      loadingDiv.id = 'loading-logo';

      // The loading layer CSS styles are JS hardcoded so they can be used without adding CSS.

      // Loading layer style and positioning.
      loadingDiv.style['position'] = 'fixed';
      loadingDiv.style['top'] = '0';
      loadingDiv.style['left'] = '0';
      loadingDiv.style['width'] = '100%';
      loadingDiv.style['height'] = '100%';
      loadingDiv.style['opacity'] = '0.8';
      loadingDiv.style['filter'] = 'alpha(opacity=80)';
      loadingDiv.style['overflow'] = 'hidden';
      loadingDiv.style['z-index'] = '10000';
      loadingDiv.style['display'] = 'none';
      loadingDiv.style['background-color'] = '#fff';

      // Loading logo positioning.
      loadingDiv.style['background-image'] = 'url("' + basePath + '/media/system/images/ajax-loader.gif")';
      loadingDiv.style['background-position'] = 'center';
      loadingDiv.style['background-repeat'] = 'no-repeat';
      loadingDiv.style['background-attachment'] = 'fixed';

      parentElement.appendChild(loadingDiv);
    }
    // Show or hide the layer.
    else {
      if (!document.getElementById('loading-logo')) {
        Joomla.loadingLayer('load', parentElement);
      }

      document.getElementById('loading-logo').style['display'] = (task == 'show') ? 'block' : 'none';
    }

    return document.getElementById('loading-logo');
  },

  /**
   * Method to Extend Objects
   *
   * @param  {Object}  destination
   * @param  {Object}  source
   *
   * @return Object
   */
  extend: (destination, source) => {
    /**
     * Technically null is an object, but trying to treat the destination as one in this context will error out.
     * So emulate jQuery.extend(), and treat a destination null as an empty object.
       */
    if (destination === null) {
      destination = {};
    }
    for (let p in source) {
      if (source.hasOwnProperty(p)) {
        destination[p] = source[p];
      }
    }

    return destination;
  },

  /**
   * Method to perform AJAX request
   *
   * @param {Object} options   Request options:
   * {
   *    url:       'index.php',  // Request URL
   *    method:    'GET',        // Request method GET (default), POST
   *    data:      null,         // Data to be sent, see https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/send
   *    perform:   true,         // Perform the request immediately, or return XMLHttpRequest instance and perform it later
   *    headers:   null,         // Object of custom headers, eg {'X-Foo': 'Bar', 'X-Bar': 'Foo'}
   *
   *    onBefore:  function(xhr){}            // Callback on before the request
   *    onSuccess: function(response, xhr){}, // Callback on the request success
   *    onError:   function(xhr){},           // Callback on the request error
   * }
   *
   * @return XMLHttpRequest|Boolean
   *
   * @example
   *
   * 	Joomla.request({
   *		url: 'index.php?option=com_example&view=example',
   *		onSuccess: function(response, xhr){
   *			console.log(response);
   *		}
   * 	})
   *
   * @see    https://developer.mozilla.org/docs/Web/API/XMLHttpRequest
   */
  request: (options) => {

    // Prepare the options
    options = Joomla.extend({
      url: '',
      method: 'GET',
      data: null,
      perform: true
    }, options);

    // Set up XMLHttpRequest instance
    try {
      const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP.3.0');

      xhr.open(options.method, options.url, true);

      // Set the headers
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('X-Ajax-Engine', 'Joomla!');

      if (options.method !== 'GET') {
        const token = Joomla.getOptions('csrf.token', '');

        if (token) {
          xhr.setRequestHeader('X-CSRF-Token', token);
        }

        if (!options.headers || !options.headers['Content-Type']) {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
      }

      // Custom headers
      if (options.headers) {
        for (let p in options.headers) {
          if (options.headers.hasOwnProperty(p)) {
            xhr.setRequestHeader(p, options.headers[p]);
          }
        }
      }

      xhr.onreadystatechange = function () {
        // Request not finished
        if (xhr.readyState !== 4) return;

        // Request finished and response is ready
        if (xhr.status === 200) {
          if (options.onSuccess) {
            options.onSuccess.call(window, xhr.responseText, xhr);
          }
        } else if (options.onError) {
          options.onError.call(window, xhr);
        }
      };

      // Do request
      if (options.perform) {
        if (options.onBefore && options.onBefore.call(window, xhr) === false) {
          // Request interrupted
          return xhr;
        }

        xhr.send(options.data);
      }

    } catch (error) {
      throw new Error(error);
      return false;
    }

    return xhr;
  },

  /**
   * Loads any needed polyfill for web components and async load any web components
   *
   * @since   4.0.0
   */
  WebComponents: () => {
    const wc = Joomla.getOptions('webcomponents', {});;
    const polyfills = [];

    /* Check if ES6 then apply the shim */
    const checkES6 = () => {
      try {
        new Function("(a = 0) => a");
        return true;
      }
      catch (err) {
        return false;
      }
    };

    /* Check if we need the full polyfill set */
    const checkWC = (wc) => {
      if (wc.hasOwnProperty('fullPolyfill') && wc['fullPolyfill'] === true) {
        return true;
      }
      return false;
    };

    /* Load web components async */
    const loadWC = (wc) => {
      for (let p in wc) {
        if (wc.hasOwnProperty(p) && p !== 'fullPolyfill') {
          if (wc[p].match(/\.js/g)) {
            const el = document.createElement('script');
            let es5;
            if (!checkES6()) {
              // Browser is not ES6!
              if (wc[p].match(/\.min\.js/g)) {
                es5 = wc[p].replace(/\.min\.js/g, '-es5.min.js')
              } else if (wc[p].match(/\.js/g)) {
                es5 = wc[p].replace(/\.js/g, '-es5.js')
              }
              el.src = es5;
            } else {
              el.src = wc[p];
            }
          }
          if (el) {
            document.head.appendChild(el);
          }
        }
      }
    };

    if (checkWC(wc)) {
      if (!('import' in document.createElement('link'))) {
        polyfills.push('hi');
      }
      if (!('attachShadow' in Element.prototype && 'getRootNode' in Element.prototype) || (window.ShadyDOM && window.ShadyDOM.force)) {
        polyfills.push('sd');
      }
      if (!window.customElements || window.customElements.forcePolyfill) {
        polyfills.push('ce');
      }
      if (!('content' in document.createElement('template')) || !window.Promise || !Array.from || !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment)) {
        polyfills = ['lite'];
      }
    } else {
      if (!window.customElements || window.customElements.forcePolyfill) {
        polyfills.push('ce');
      }
    }

    if (polyfills.length) {
      let name = "core.min.js";
      let script = document.querySelector('script[src*="' + name + '"]');

      if (!script) {
        name = "core.js";
        script = document.querySelector('script[src*="' + name + '"]')
      }

      if (!script) {
        throw new Error('core(.min).js is not registered correctly!')
      }

      const newScript = document.createElement('script'),
        replacement = 'media/system/js/polyfills/webcomponents/webcomponents-' + polyfills.join('-') + '.min.js',
        mediaVersion = script.src.match(/\?.*/)[0],
        base = Joomla.getOptions('system.paths');

      if (!base) {
        throw new Error('core(.min).js is not registered correctly!')
      }

      newScript.src = base.rootFull + replacement + (mediaVersion ? mediaVersion : '');
      document.head.appendChild(newScript);

      document.addEventListener('WebComponentsReady', function () {
        loadWC(wc);
      });
    } else {
      const fire = () => {
        requestAnimationFrame(function () {
          document.dispatchEvent(new CustomEvent('WebComponentsReady', { bubbles: true }));
          loadWC(wc);
        });
      };

      if (document.readyState !== 'loading') {
        fire();
      } else {
        document.addEventListener('readystatechange', function wait() {
          fire();
          document.removeEventListener('readystatechange', wait);
        });
      }
    }
  }
};


/**
 * Joomla! Custom events
 *
 * @since  4.0.0
 */
((window, Joomla) => {
  "use strict";

  if (Joomla.Event) {
    return;
  }

  Joomla.Event = {};

  /**
   * Dispatch custom event.
   *
   * An event name convention:
   *    The event name has at least two part, separated ":", eg `foo:bar`. Where the first part is an "event supporter",
   *    and second part is the event name which happened.
   *    Which is allow us to avoid possible collisions with another scripts and native DOM events.
   *    Joomla! CMS standard events should start from `joomla:`.
   *
   * Joomla! events:
   *    `joomla:updated`  Dispatch it over the changed container, example after the content was updated via ajax
   *    `joomla:removed`  The container was removed
   *
   * @param {HTMLElement|string}  element  DOM element, the event target. Or the event name, then the target will be a Window
   * @param {String|Object}       name     The event name, or an optional parameters in case when "element" is an event name
   * @param {Object}              params   An optional parameters. Allow to send a custom data through the event.
   *
   * @example
   *
   *  Joomla.Event.dispatch(myElement, 'joomla:updated', {for: 'bar', foo2: 'bar2'}); // Will dispatch event to myElement
   *  or:
   *  Joomla.Event.dispatch('joomla:updated', {for: 'bar', foo2: 'bar2'}); // Will dispatch event to Window
   *
   * @since   4.0.0
   */
  Joomla.Event.dispatch = (element, name, params) => {
    let event;

    if (typeof element === 'string') {
      params = name;
      name = element;
      element = window;
    }

    params = params || {};

    if (window.CustomEvent && typeof (window.CustomEvent) === 'function') {
      event = new CustomEvent(name, {
        detail: params,
        bubbles: true,
        cancelable: true
      });
    }
    // IE trap
    else {
      event = document.createEvent('Event');
      event.initEvent(name, true, true);
      event.detail = params;
    }

    element.dispatchEvent(event);
  };

  /**
   * Once listener. Add EventListener to the Element and auto-remove it after the event was dispatched.
   *
   * @param {HTMLElement}  element   DOM element
   * @param {String}       name      The event name
   * @param {Function}     callback  The event callback
   *
   * @since   4.0.0
   */
  Joomla.Event.listenOnce = (element, name, callback) => {
    const onceCallback = (event) => {
      element.removeEventListener(name, onceCallback);
      return callback.call(element, event)
    };

    element.addEventListener(name, onceCallback);
  };
})(window, Joomla);

/**
 * Load any web components and any polyfills required
 */
document.addEventListener('DOMContentLoaded', function () {
  Joomla.WebComponents();
});
