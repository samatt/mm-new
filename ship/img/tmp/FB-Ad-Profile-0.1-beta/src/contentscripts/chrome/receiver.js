'use strict';

// LOCAL DEPS
import EVENTS from '../../common/events';

// handlers
import receiverHandler from '../../common/receiver-handler';
import placeholderHandler from './handlers/placeholder'

module.exports = receiverHandler({
  'PLACE_HOLDER' :placeholderHandler
})
