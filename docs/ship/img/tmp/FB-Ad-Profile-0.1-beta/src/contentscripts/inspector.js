"use strict";

import receiver from './chrome/receiver';

const runtime = chrome.runtime;
runtime.onMessage.addListener(receiver);

//Probably need to add script checking