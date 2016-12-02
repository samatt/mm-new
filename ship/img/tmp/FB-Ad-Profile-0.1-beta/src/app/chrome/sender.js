'use strict';

// fire event to content script
module.exports = (inExtension, cb, event, data) => {
  if (!inExtension) return;

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const request = {type: event};
    console.log(request);
    if (data) {
      request.data = data;
    }
    chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
      cb(null,{data: response});
      //SEND MESSAGE TO CONTENT SCRIPT PLACEHOLDER
       // if (response && Object.prototype.toString.call( response ) === '[object Array]') {
       //    cb(null, {links: response});
       // }
       // else {
       //    const img = {
       //      extension: response.extension,
       //      filename: response.filename,
       //      height: response.height,
       //      size: response.size,
       //      src: 'data:'+response.type+';base64,'+response.data,
       //      width: response.width
       //    };

       //    cb(null, {img: img});
       // }
    });
  });
};
