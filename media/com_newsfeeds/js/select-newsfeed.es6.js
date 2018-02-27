/**
 * @copyright  Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
window[`jSelectNewsfeed_${Joomla.getOptions('newsfeed_id')}`] = (id, title, object) => {
  window.processModalSelect('Newsfeed', Joomla.getOptions('newsfeed_id'), id, title, '', object);
};
