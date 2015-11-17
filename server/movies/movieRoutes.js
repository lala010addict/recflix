// var movieController = require('./movieController.js');

// module.exports = function (app) {
//   // app === linkRouter injected from middleware.js

//   // app.param will hijack any request with a 'code' parameter on in
//   // like line 16 below. That code will actually be the shortned url
//   // so the real URL will be pre fetched from mongo and attached to
//   // req.navLink before it reaches line 16.
//   app.param('code', movieController.findUrl);

//   app.route('/')
//     .get(movieController.allLinks)
//     .post(movieController.newLink);

//   app.get('/:code', movieController.navToLink);

// };
