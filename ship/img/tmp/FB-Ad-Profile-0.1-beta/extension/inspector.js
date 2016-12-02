(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = {
  APP_TO_CONTENT_SCRIPT: {
    PLACE_HOLDER: 'PLACE_HOLDER'
  },
  CONTENT_SCRIPT_TO_APP: {
    HAS_FB_PROFILE: 'HAS_FB_PROFILE'
  }
};

},{}],2:[function(require,module,exports){
"use strict";

/**
 * takes a list of handlers as object and play role of middleware when events occured.
 *
 * @return function middleware to process request.
 */
module.exports = function (handlers) {
  return function (request, sender, sendResponse) {
    var type = request.type;

    if (handlers.hasOwnProperty(type)) {
      handlers[type](request, sender, sendResponse);
    }

    return true;
  };
};

},{}],3:[function(require,module,exports){
'use strict';

var _processor = require('../../utils/processor');

var _processor2 = _interopRequireDefault(_processor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (request, sender, sendResponse) {
  console.log('Request', request);
  console.log('Sender, ', sender);
  _processor2.default.getProfile(function (data) {
    if (sendResponse) sendResponse(data);
  });
  // console.log("HBHB")
  // var d  =document.querySelectorAll("script")
};

},{"../../utils/processor":7}],4:[function(require,module,exports){
'use strict';

// LOCAL DEPS

var _events = require('../../common/events');

var _events2 = _interopRequireDefault(_events);

var _receiverHandler = require('../../common/receiver-handler');

var _receiverHandler2 = _interopRequireDefault(_receiverHandler);

var _placeholder = require('./handlers/placeholder');

var _placeholder2 = _interopRequireDefault(_placeholder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// handlers


module.exports = (0, _receiverHandler2.default)({
  'PLACE_HOLDER': _placeholder2.default
});

},{"../../common/events":1,"../../common/receiver-handler":2,"./handlers/placeholder":3}],5:[function(require,module,exports){
'use strict';

var _events = require('../../common/events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sender = {};

module.exports = sender;

var chromeSender = chrome.runtime.sendMessage;

sender.sendProfile = function (data) {
  chromeSender({ type: _events2.default.CONTENT_SCRIPT_TO_APP.HAS_FB_PROFILE, data: data });
};

},{"../../common/events":1}],6:[function(require,module,exports){
"use strict";

var _receiver = require("./chrome/receiver");

var _receiver2 = _interopRequireDefault(_receiver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var runtime = chrome.runtime;
runtime.onMessage.addListener(_receiver2.default);

//Probably need to add script checking

},{"./chrome/receiver":4}],7:[function(require,module,exports){
'use strict';
'use-strict';

var _sender = require('../chrome/sender');

var _sender2 = _interopRequireDefault(_sender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var proc = {};

module.exports = proc;

proc.getProfile = function (cb) {
    var matches = [];
    var nodesArray = [].slice.call(document.querySelectorAll("script"));
    var rx = /{([^}]*)}/g;
    var filtered = nodesArray.filter(function (e) {
        return e.innerText.indexOf('fbid') > -1;
    });
    for (var i = 0; i < filtered.length; i++) {
        var match;
        while ((match = rx.exec(filtered[i].innerText)) !== null) {
            if (match[0].indexOf('fbid') > -1 && match[0].indexOf('name') > -1 && match[0].indexOf('type') > -1) {
                matches.push(JSON.parse(match[0]));
            }
        }
    }
    cb(matches);
};

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

},{"../chrome/sender":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy5ucG1fbW9kdWxlcy9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9jb21tb24vZXZlbnRzLmpzIiwic3JjL2NvbW1vbi9yZWNlaXZlci1oYW5kbGVyLmpzIiwic3JjL2NvbnRlbnRzY3JpcHRzL2Nocm9tZS9oYW5kbGVycy9wbGFjZWhvbGRlci5qcyIsInNyYy9jb250ZW50c2NyaXB0cy9jaHJvbWUvcmVjZWl2ZXIuanMiLCJzcmMvY29udGVudHNjcmlwdHMvY2hyb21lL3NlbmRlci5qcyIsInNyYy9jb250ZW50c2NyaXB0cy9pbnNwZWN0b3IuanMiLCJzcmMvY29udGVudHNjcmlwdHMvdXRpbHMvcHJvY2Vzc29yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2YseUJBQXVCO0FBQ3RCLGtCQUFjO0FBRFEsR0FEUjtBQUlmLHlCQUF1QjtBQUN0QixvQkFBZTtBQURPO0FBSlIsQ0FBakI7Ozs7O0FDRkE7Ozs7O0FBS0EsT0FBTyxPQUFQLEdBQWlCLFVBQUMsUUFBRCxFQUFjO0FBQzdCLFNBQU8sVUFBQyxPQUFELEVBQVUsTUFBVixFQUFrQixZQUFsQixFQUFtQztBQUN4QyxRQUFNLE9BQU8sUUFBUSxJQUFyQjs7QUFFQSxRQUFJLFNBQVMsY0FBVCxDQUF3QixJQUF4QixDQUFKLEVBQW1DO0FBQ2pDLGVBQVMsSUFBVCxFQUFlLE9BQWYsRUFBd0IsTUFBeEIsRUFBZ0MsWUFBaEM7QUFDRDs7QUFFRCxXQUFPLElBQVA7QUFDRCxHQVJEO0FBU0QsQ0FWRDs7Ozs7QUNMQTs7Ozs7O0FBQ0EsT0FBTyxPQUFQLEdBQWlCLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBa0IsWUFBbEIsRUFBbUM7QUFDbEQsVUFBUSxHQUFSLENBQVksU0FBWixFQUF1QixPQUF2QjtBQUNBLFVBQVEsR0FBUixDQUFZLFVBQVosRUFBdUIsTUFBdkI7QUFDQSxzQkFBSyxVQUFMLENBQWlCLFVBQUMsSUFBRCxFQUFTO0FBQ3hCLFFBQUcsWUFBSCxFQUFpQixhQUFhLElBQWI7QUFDbEIsR0FGRDtBQUdBO0FBQ0E7QUFJRCxDQVhEOzs7QUNEQTs7QUFFQTs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7OztBQUZBOzs7QUFJQSxPQUFPLE9BQVAsR0FBaUIsK0JBQWdCO0FBQy9CO0FBRCtCLENBQWhCLENBQWpCOzs7QUNUQTs7QUFFQTs7Ozs7O0FBRUEsSUFBTSxTQUFTLEVBQWY7O0FBRUEsT0FBTyxPQUFQLEdBQWlCLE1BQWpCOztBQUVBLElBQU0sZUFBZSxPQUFPLE9BQVAsQ0FBZSxXQUFwQzs7QUFFQSxPQUFPLFdBQVAsR0FBcUIsVUFBQyxJQUFELEVBQVU7QUFDN0IsZUFBYSxFQUFFLE1BQU0saUJBQU8scUJBQVAsQ0FBNkIsY0FBckMsRUFBcUQsTUFBTSxJQUEzRCxFQUFiO0FBQ0QsQ0FGRDs7O0FDVkE7O0FBRUE7Ozs7OztBQUVBLElBQU0sVUFBVSxPQUFPLE9BQXZCO0FBQ0EsUUFBUSxTQUFSLENBQWtCLFdBQWxCOztBQUVBOzs7O0FDUEE7O0FBRUE7Ozs7OztBQUNBLElBQU0sT0FBTyxFQUFiOztBQUVBLE9BQU8sT0FBUCxHQUFpQixJQUFqQjs7QUFFQSxLQUFLLFVBQUwsR0FBa0IsVUFBQyxFQUFELEVBQVE7QUFDdEIsUUFBSSxVQUFVLEVBQWQ7QUFDQSxRQUFJLGFBQWEsR0FBRyxLQUFILENBQVMsSUFBVCxDQUFjLFNBQVMsZ0JBQVQsQ0FBMEIsUUFBMUIsQ0FBZCxDQUFqQjtBQUNBLFFBQUksS0FBSyxZQUFUO0FBQ0EsUUFBSSxXQUFXLFdBQVcsTUFBWCxDQUFrQixVQUFVLENBQVYsRUFBYTtBQUFFLGVBQVEsRUFBRSxTQUFGLENBQVksT0FBWixDQUFvQixNQUFwQixJQUE4QixDQUFDLENBQXZDO0FBQTJDLEtBQTVFLENBQWY7QUFDRSxTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksU0FBUyxNQUE3QixFQUFxQyxHQUFyQyxFQUEwQztBQUN0QyxZQUFJLEtBQUo7QUFDQSxlQUFNLENBQUMsUUFBUSxHQUFHLElBQUgsQ0FBUSxTQUFTLENBQVQsRUFBWSxTQUFwQixDQUFULE1BQTZDLElBQW5ELEVBQXdEO0FBQ3BELGdCQUFHLE1BQU0sQ0FBTixFQUFTLE9BQVQsQ0FBaUIsTUFBakIsSUFBMkIsQ0FBQyxDQUE1QixJQUNDLE1BQU0sQ0FBTixFQUFTLE9BQVQsQ0FBaUIsTUFBakIsSUFBMkIsQ0FBQyxDQUQ3QixJQUVFLE1BQU0sQ0FBTixFQUFTLE9BQVQsQ0FBaUIsTUFBakIsSUFBMkIsQ0FBQyxDQUZqQyxFQUVtQztBQUMvQix3QkFBUSxJQUFSLENBQWEsS0FBSyxLQUFMLENBQVcsTUFBTSxDQUFOLENBQVgsQ0FBYjtBQUNIO0FBQ0o7QUFDSjtBQUNMLE9BQUcsT0FBSDtBQUNELENBaEJEOztBQWtCRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEFQUF9UT19DT05URU5UX1NDUklQVDoge1xuICBcdFBMQUNFX0hPTERFUjogJ1BMQUNFX0hPTERFUicsXG4gIH0sXG4gIENPTlRFTlRfU0NSSVBUX1RPX0FQUDoge1xuICBcdEhBU19GQl9QUk9GSUxFOidIQVNfRkJfUFJPRklMRSdcbiAgfVxufTtcbiIsIi8qKlxuICogdGFrZXMgYSBsaXN0IG9mIGhhbmRsZXJzIGFzIG9iamVjdCBhbmQgcGxheSByb2xlIG9mIG1pZGRsZXdhcmUgd2hlbiBldmVudHMgb2NjdXJlZC5cbiAqXG4gKiBAcmV0dXJuIGZ1bmN0aW9uIG1pZGRsZXdhcmUgdG8gcHJvY2VzcyByZXF1ZXN0LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChoYW5kbGVycykgPT4ge1xuICByZXR1cm4gKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gICAgY29uc3QgdHlwZSA9IHJlcXVlc3QudHlwZTtcblxuICAgIGlmIChoYW5kbGVycy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuICAgICAgaGFuZGxlcnNbdHlwZV0ocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9O1xufTtcbiIsImltcG9ydCBwcm9jIGZyb20gJy4uLy4uL3V0aWxzL3Byb2Nlc3Nvcidcbm1vZHVsZS5leHBvcnRzID0gKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdSZXF1ZXN0JywgcmVxdWVzdClcbiAgY29uc29sZS5sb2coJ1NlbmRlciwgJyxzZW5kZXIpXG4gIHByb2MuZ2V0UHJvZmlsZSggKGRhdGEpID0+e1xuICAgIGlmKHNlbmRSZXNwb25zZSkgc2VuZFJlc3BvbnNlKGRhdGEpXG4gIH0pXG4gIC8vIGNvbnNvbGUubG9nKFwiSEJIQlwiKVxuICAvLyB2YXIgZCAgPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzY3JpcHRcIilcblxuXG5cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIExPQ0FMIERFUFNcbmltcG9ydCBFVkVOVFMgZnJvbSAnLi4vLi4vY29tbW9uL2V2ZW50cyc7XG5cbi8vIGhhbmRsZXJzXG5pbXBvcnQgcmVjZWl2ZXJIYW5kbGVyIGZyb20gJy4uLy4uL2NvbW1vbi9yZWNlaXZlci1oYW5kbGVyJztcbmltcG9ydCBwbGFjZWhvbGRlckhhbmRsZXIgZnJvbSAnLi9oYW5kbGVycy9wbGFjZWhvbGRlcidcblxubW9kdWxlLmV4cG9ydHMgPSByZWNlaXZlckhhbmRsZXIoe1xuICAnUExBQ0VfSE9MREVSJyA6cGxhY2Vob2xkZXJIYW5kbGVyXG59KVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgRVZFTlRTIGZyb20gJy4uLy4uL2NvbW1vbi9ldmVudHMnO1xuXG5jb25zdCBzZW5kZXIgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZW5kZXI7XG5cbmNvbnN0IGNocm9tZVNlbmRlciA9IGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlO1xuXG5zZW5kZXIuc2VuZFByb2ZpbGUgPSAoZGF0YSkgPT4ge1xuICBjaHJvbWVTZW5kZXIoeyB0eXBlOiBFVkVOVFMuQ09OVEVOVF9TQ1JJUFRfVE9fQVBQLkhBU19GQl9QUk9GSUxFLCBkYXRhOiBkYXRhfSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCByZWNlaXZlciBmcm9tICcuL2Nocm9tZS9yZWNlaXZlcic7XG5cbmNvbnN0IHJ1bnRpbWUgPSBjaHJvbWUucnVudGltZTtcbnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKHJlY2VpdmVyKTtcblxuLy9Qcm9iYWJseSBuZWVkIHRvIGFkZCBzY3JpcHQgY2hlY2tpbmciLCIndXNlLXN0cmljdCc7XG5cbmltcG9ydCBzZW5kZXIgZnJvbSAnLi4vY2hyb21lL3NlbmRlcic7XG5jb25zdCBwcm9jID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gcHJvYztcblxucHJvYy5nZXRQcm9maWxlID0gKGNiKSA9PiB7XG4gICAgdmFyIG1hdGNoZXMgPSBbXVxuICAgIHZhciBub2Rlc0FycmF5ID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2NyaXB0XCIpKTtcbiAgICB2YXIgcnggPSAveyhbXn1dKil9L2c7XG4gICAgdmFyIGZpbHRlcmVkID0gbm9kZXNBcnJheS5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuICBlLmlubmVyVGV4dC5pbmRleE9mKCdmYmlkJykgPiAtMTsgfSlcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsdGVyZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgbWF0Y2g7XG4gICAgICAgICAgd2hpbGUoKG1hdGNoID0gcnguZXhlYyhmaWx0ZXJlZFtpXS5pbm5lclRleHQpKSAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgIGlmKG1hdGNoWzBdLmluZGV4T2YoJ2ZiaWQnKSA+IC0xICYmXG4gICAgICAgICAgICAgICAgICBtYXRjaFswXS5pbmRleE9mKCduYW1lJykgPiAtMSAmJlxuICAgICAgICAgICAgICAgICAgIG1hdGNoWzBdLmluZGV4T2YoJ3R5cGUnKSA+IC0xKXtcbiAgICAgICAgICAgICAgICAgIG1hdGNoZXMucHVzaChKU09OLnBhcnNlKG1hdGNoWzBdKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gIGNiKG1hdGNoZXMpXG59XG5cbiAgLy8gaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzY3JpcHRcIikubGVuZ3RoIDwxMDYgKXtcbiAgLy8gICBjb25zb2xlLmxvZygnbm90IHlldCcpO1xuICAvLyAgIC8vIHNldFRpbWVvdXQodGVzdCw1MDAwKVxuICAvLyB9XG4gIC8vIGVsc2V7XG4gIC8vICAgdmFyIHJ4ID0gL3soW159XSopfS9nO1xuICAvLyAgIHZhciBtYXRjaGVzID0gW107XG4gIC8vICAgdmFyIGQgPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzY3JpcHRcIik7XG4gIC8vICAgdmFyIG5vZGVzQXJyYXkgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzY3JpcHRcIikpO1xuICAvLyAgIHZhciBmaWx0ZXJlZCA9IG5vZGVzQXJyYXkuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiAgZS5pbm5lclRleHQuaW5kZXhPZignZmJpZCcpID4gLTEgJiZcbiAgLy8gICAgZS5pbm5lclRleHQuaW5kZXhPZignbmFtZScpID4gLTEgJiZcbiAgLy8gICAgZS5pbm5lclRleHQuaW5kZXhPZigndHlwZScpID4gLTE7IH0pXG5cbiAgLy8gICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbHRlcmVkLmxlbmd0aDsgaSsrKSB7XG4gIC8vICAgICBjb25zdCBtYXRjaCA9IHJ4LmV4ZWMoZmlsdGVyZWRbaV0uaW5uZXJUZXh0KVxuICAvLyAgICAgd2hpbGUobWF0Y2ggIT09IG51bGwpe1xuICAvLyAgICAgICBpZihtYXRjaFswXS5pbmRleE9mKCdmYmlkJykgPiAtMSAmJlxuICAvLyAgICAgICAgIG1hdGNoWzBdLmluZGV4T2YoJ25hbWUnKSA+IC0xICYmXG4gIC8vICAgICAgICAgbWF0Y2hbMF0uaW5kZXhPZigndHlwZScpID4gLTEpe1xuICAvLyAgICAgICAgIG1hdGNoZXMucHVzaChKU09OLnBhcnNlKG1hdGNoWzBdKSk7XG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gLy8gc2VuZGVyLnNlbmRNZXNzYWdlKHsncmVzdWx0cyc6bWF0Y2hlc30sXCIqXCIpO1xuICAvLyB9XG4vL1xuLy8gdmFyIFhIUiA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZTtcbi8vIHZhciBvcGVuID0gWEhSLm9wZW47XG4vLyB2YXIgc2VuZCA9IFhIUi5zZW5kO1xuXG4vLyBYSFIub3BlbiA9IGZ1bmN0aW9uIChtZXRob2QsIHVybCkge1xuLy8gICB0aGlzLl9tZXRob2QgPSBtZXRob2Q7XG4vLyAgIHRoaXMuX3VybCA9IHVybDtcbi8vICAgcmV0dXJuIG9wZW4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbi8vIH07XG5cbi8vIFhIUi5zZW5kID0gZnVuY3Rpb24gKHBvc3REYXRhKSB7XG4vLyAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbi8vICAgICB2YXIgbWV0aG9kID0gdGhpcy5fbWV0aG9kO1xuLy8gICAgIHZhciB1cmwgPSB0aGlzLl91cmw7XG4vLyAgICAgdmFyIG1zZyA9IHttZXRob2Q6IG1ldGhvZCwgdXJsOiB1cmx9O1xuLy8gICAgIG1zZy5yZXNwb25zZVRleHQgPSB0aGlzLnJlc3BvbnNlVGV4dCB8fCBcIlwiO1xuLy8gICAgIGlmIChtc2cpIHtcbi8vICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZShKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1zZykpLCBcIipcIik7XG4vLyAgICAgfVxuLy8gICB9KTtcbi8vICAgcmV0dXJuIHNlbmQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbi8vIH07XG4iXX0=
