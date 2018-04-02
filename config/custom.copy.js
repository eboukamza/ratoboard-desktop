const copy = require('@ionic/app-scripts/config/copy.config');

copy.copyElectron = {
  src: ['{{SRC}}/electron.js'],
  dest: "{{WWW}}"
};

module.exports = copy;
