((document, getOptions, $) => {
  'use strict';

  if (typeof getOptions !== 'function') {
    throw new Error('Joomla API is not properly initialised');
  }

  $(document).ready(() => {

    // Initialize some variables
    const accordion = getOptions('bootstrap.accordion');
    const alert = getOptions('bootstrap.alert');
    const button = getOptions('bootstrap.button');
    const carousel = getOptions('bootstrap.carousel');
    const dropdown = getOptions('bootstrap.dropdown');
    const modal = $('.joomla-modal');
    const popover = getOptions('bootstrap.popover');
    const scrollspy = getOptions('bootstrap.scrollspy');
    const tabs = getOptions('bootstrap.tabs');
    const tooltip = getOptions('bootstrap.tooltip');

    // Accordion
    if (accordion) {
      Object.keys(accordion).map((index, value) => {
        $(`#${index}`).collapse({
          parent: value.parent,
          toggle: value.toggle,
        // eslint-disable-next-line no-new-func
        }).on('show', new Function(value.onShow)())
          // eslint-disable-next-line no-new-func
          .on('shown', new Function(value.onShown)())
          // eslint-disable-next-line no-new-func
          .on('hideme', new Function(value.onHide)())
          // eslint-disable-next-line no-new-func
          .on('hidden', new Function(value.onHidden)());
      });
    }

    // Alert
    if (alert) {
      Object.keys(alert).map((index) => {
        $(`#${index}`).alert();
      });
    }

    // Button
    if (button) {
      Object.keys(button).map((index) => {
        $(`#${index}`).button();
      });
    }

    // Carousel
    if (carousel) {
      Object.keys(carousel).map((index, value) => {
        $(`#${index}`).carousel({
          interval: value.interval ? value.interval : 5000,
          pause: value.pause ? value.pause : 'hover',
        });
      });
    }

    // Dropdown menu
    if (dropdown) {
      Object.keys(dropdown).map((index) => {
        $(`#${index}`).dropdown();
      });
    }

    // Modals
    if (modal.length) {
      const joomlaModals = [].slice.call(document.querySelectorAll('.joomla-modal'));
      joomlaModals.forEach((index) => {
        const $self = $(this);
        $self.on('show.bs.modal', () => {
          if ($self.data('url')) {
            const modalBody = $self.find('.modal-body');
            modalBody.find('iframe').remove();
            modalBody.prepend($self.data('iframe'));
          }
        }).on('shown.bs.modal', () => {
          const modalHeaderHeight = $('div.modal-header:visible').outerHeight(true);
          const modalBodyHeightOuter = $('div.modal-body:visible').outerHeight(true);
          const modalBodyHeight = $('div.modal-body:visible').height();
          const modalFooterHeight = $('div.modal-footer:visible').outerHeight(true);
          const padding = $self.offsetTop;
          const maxModalHeight = ($(window).height() - (padding * 2));
          const modalBodyPadding = (modalBodyHeightOuter - modalBodyHeight);
          const maxModalBodyHeight = maxModalHeight -
          (modalHeaderHeight + modalFooterHeight + modalBodyPadding);
          if ($self.data('url')) {
            const iframeHeight = $('.iframe').height();
            if (iframeHeight > maxModalBodyHeight) {
              $('.modal-body').css({ 'max-height': maxModalBodyHeight, 'overflow-y': 'auto' });
              $('.iframe').css('max-height', maxModalBodyHeight - modalBodyPadding);
            }
          }
        }).on('hide.bs.modal', () => {
          $('.modal-body').css({ 'max-height': 'initial', 'overflow-y': 'initial' });
          $('.modalTooltip').tooltip('dispose');
        });
      });
    }

    // Popover
    if (popover) {
      Object.keys(popover).map((index, value) => {
        value.constraints = [value.constraints];
        $(index).popover(value);
      });
    }

    // Scrollspy
    if (scrollspy) {
      Object.keys(scrollspy).map((index, value) => {
        $(`#${index}`).scrollspy(value);
      });
    }

    // Tabs
    if (tabs) {
      Object.keys(tabs).map((index) => {
        const joomlaTabs = document.querySelectorAll('.joomla-modal');
        const panes = [].slice.call(joomlaTabs.querySelectorAll(`#${index}Content`));
        // eslint-disable-next-line no-unused-vars
        panes.forEach((index, value) => {
          if ($(value).data('node')) {
            const attribs = $(value).data('node').split('[');
            const classLink = (attribs[0] !== '') ? `class="nav-link ${attribs[0]}"` : 'class="nav-link"';

            $(`#${index}Tabs`).append(`<li class="nav-item"><a ${classLink} href="#${attribs[1]}" data-toggle="tab">${attribs[2]}</a></li>`);
          }
        });
      });
    }

    // Tooltip
    if (tooltip) {
      Object.keys(tooltip).map((index, value) => {
        // eslint-disable-next-line no-param-reassign
        value.constraints = [value.constraints];
        $(index).tooltip(value)
          // eslint-disable-next-line no-new-func
          .on('show.bs.tooltip', new Function(value.onShow)())
          // eslint-disable-next-line no-new-func
          .on('shown.bs.tooltip', new Function(value.onShown)())
          // eslint-disable-next-line no-new-func
          .on('hide.bs.tooltip', new Function(value.onHide)())
          // eslint-disable-next-line no-new-func
          .on('hidden.bs.tooltip', new Function(value.onHidden)());
      });
    }
  });
})(document, Joomla.getOptions, window.jQuery);
