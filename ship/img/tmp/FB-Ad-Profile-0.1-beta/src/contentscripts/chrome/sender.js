'use strict';

import EVENTS from '../../common/events';

const sender = {};

module.exports = sender;

const chromeSender = chrome.runtime.sendMessage;

sender.sendProfile = (data) => {
  chromeSender({ type: EVENTS.CONTENT_SCRIPT_TO_APP.HAS_FB_PROFILE, data: data});
};
