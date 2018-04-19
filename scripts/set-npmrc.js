//  ╔═╗╦═╗╔═╗╦╔╗╔╔═╗╔╦╗╔═╗╦  ╦    ┌─┐┌─┐┌┬┐  ┌┐┌┌─┐┌┬┐┬─┐┌─┐  ┌─┐┬┬  ┌─┐
//  ╠═╝╠╦╝║╣ ║║║║╚═╗ ║ ╠═╣║  ║    └─┐├┤  │   │││├─┘│││├┬┘│    ├┤ ││  ├┤
//  ╩  ╩╚═╚═╝╩╝╚╝╚═╝ ╩ ╩ ╩╩═╝╩═╝  └─┘└─┘ ┴   ┘└┘┴  ┴ ┴┴└─└─┘  └  ┴┴─┘└─┘
//
// Used in production to install npm private modules
if (process.env.NODE_ENV !== 'production') {
  return;
}

var fs = require('fs');
fs.writeFileSync('.npmrc', '//registry.npmjs.org/:_authToken=${NPM_TOKEN}');
fs.chmodSync('.npmrc', 0600);
