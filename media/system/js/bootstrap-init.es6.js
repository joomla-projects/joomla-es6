((document, getOptions, $) => {
  "use strict";

  if (typeof getOptions !== 'function') {
    throw new Error('Joomla API is not properly initialised');
  }

  $(document).ready(($) => {

    // Initialize some variables
    var accordion = getOptions('bootstrap.accordion'),
      alert = getOptions('bootstrap.alert'),
      button = getOptions('bootstrap.button'),
      carousel = getOptions('bootstrap.carousel'),
      dropdown = getOptions('bootstrap.dropdown'),
      modal = $('.joomla-modal'),
      popover = getOptions('bootstrap.popover'),
      scrollspy = getOptions('bootstrap.scrollspy'),
      tabs = getOptions('bootstrap.tabs'),
      tooltip = getOptions('bootstrap.tooltip');

    // Accordion
    if (accordion) {
      $.each(accordion, (index, value) => {
        $(`#${index}`).collapse(
          {
            parent: value.parent,
            toggle: value.toggle
          }
        ).on("show", new Function(value.onShow)())
          .on("shown", new Function(value.onShown)())
          .on("hideme", new Function(value.onHide)())
          .on("hidden", new Function(value.onHidden)());
      });
    }

    // Alert
    if (alert) {
      $.each(alert, (index, value) => {
        $(`#${index}`).alert();
      });
    }

    // Button
    if (button) {
      $.each(button, (index, value) => {
        $(`#${index}`).button();
      });
    }

    // Carousel
    if (carousel) {
      $.each(carousel, (index, value) => {
        $(`#${index}`).carousel({
            interval: value.interval ? value.interval : 5000,
            pause: value.pause ? value.pause : 'hover',
          });
      });
    }

    // Dropdown menu
    if (dropdown) {
      $.each(dropdown, (index, value) => {
        $(`#${index}`).dropdown();
      });
    }

    // Modals
    if (modal.length) {
      $.each($('.joomla-modal'), () => {
        const $self = $(this);
        $self.on('show.bs.modal', () => {
          if ($self.data('url')) {
            const modalBody = $self.find('.modal-body');
            modalBody.find('iframe').remove();
            modalBody.prepend($self.data('iframe'));
          }
        }).on('shown.bs.modal', () => {
          const modalHeight = $('div.modal:visible').outerHeight(true);
          const modalHeaderHeight = $('div.modal-header:visible').outerHeight(true);
          const modalBodyHeightOuter = $('div.modal-body:visible').outerHeight(true);
          const modalBodyHeight = $('div.modal-body:visible').height();
          const modalFooterHeight = $('div.modal-footer:visible').outerHeight(true);
          const padding = $self.offsetTop;
          const maxModalHeight = ($(window).height() - (padding * 2));
          const modalBodyPadding = (modalBodyHeightOuter - modalBodyHeight);
          const maxModalBodyHeight = maxModalHeight - (modalHeaderHeight + modalFooterHeight + modalBodyPadding);
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
      $.each(popover, (index, value) => {
        value.constraints = [value.constraints];
        $(index).popover(value);
      });
    }

    // Scrollspy
    if (scrollspy) {
      $.each(scrollspy, (index, value) => {
        $(`#${index}`).scrollspy(value);
      });
    }

    // Tabs
    if (tabs) {
      $.each(tabs, (index, value) => {

        $.each($(`#${index}Content`).find('.tab-pane'), (i, v) => {
          if ($(v).data('node')) {
            const attribs = $(v).data('node').split('[');
            const classLink = (attribs[0] !== '') ? `class="nav-link ${attribs[0]}"` : `class="nav-link"`;

            $(`#${index}Tabs`).append(`<li class="nav-item"><a ${classLink} href="#${attribs[1]}" data-toggle="tab">${attribs[2]}</a></li>`);
          }
        });
      });
    }

    // Tooltip
    if (tooltip) {
      $.each(tooltip, (index, value) => {
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
