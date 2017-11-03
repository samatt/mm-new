'use-strict';

import sender from '../chrome/sender';
const proc = {};

module.exports = proc;

proc.getProfile = (cb) => {
    var matches = []
    var nodesArray = [].slice.call(document.querySelectorAll("script"));
    var rx = /{([^}]*)}/g;
    var filtered = nodesArray.filter(function (e) { return  e.innerText.indexOf('fbid') > -1; })
      for (var i = 0; i < filtered.length; i++) {
          var match;
          while((match = rx.exec(filtered[i].innerText)) !== null){
              if(match[0].indexOf('fbid') > -1 &&
                  match[0].indexOf('name') > -1 &&
                   match[0].indexOf('type') > -1){
                  matches.push(JSON.parse(match[0]));
              }
          }
      }
  cb(matches)
}

  // if (document.querySelectorAll("script").length <106 ){
  //   console.log('not yet');
  //   // setTimeout(test,5000)
  // }
  // else{
  //   var rx = /{([^}]*)}/g;
  //   var matches = [];
  //   var d =document.querySelectorAll("script");
  //   var nodesArray = [].slice.call(document.querySelectorAll("script"));
  //   var filtered = nodesArray.filter(function (e) { return  e.innerText.indexOf('fbid') > -1 &&
  //    e.innerText.indexOf('name') > -1 &&
  //    e.innerText.indexOf('type') > -1; })

  //   for (var i = 0; i < filtered.length; i++) {
  //     const match = rx.exec(filtered[i].innerText)
  //     while(match !== null){
  //       if(match[0].indexOf('fbid') > -1 &&
  //         match[0].indexOf('name') > -1 &&
  //         match[0].indexOf('type') > -1){
  //         matches.push(JSON.parse(match[0]));
  //     }
  //   }
  // }

  // // sender.sendMessage({'results':matches},"*");
  // }
//
// var XHR = XMLHttpRequest.prototype;
// var open = XHR.open;
// var send = XHR.send;

// XHR.open = function (method, url) {
//   this._method = method;
//   this._url = url;
//   return open.apply(this, arguments);
// };

// XHR.send = function (postData) {
//   this.addEventListener('load', function () {
//     var method = this._method;
//     var url = this._url;
//     var msg = {method: method, url: url};
//     msg.responseText = this.responseText || "";
//     if (msg) {
//       window.postMessage(JSON.parse(JSON.stringify(msg)), "*");
//     }
//   });
//   return send.apply(this, arguments);
// };
