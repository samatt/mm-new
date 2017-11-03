'use strict';

// LOCAL DEPS
import EVENTS from '../../common/events';

// handlers
import receiverHandler from '../../common/receiver-handler';
import fbProfileHandler from './handlers/fb-profile'

module.exports = receiverHandler({
  'HAS_FB_PROFILE' :fbProfileHandler
})

