const iohook = require('iohook');

let clickpropagation = true;

// enable/disable click propagation with space key
iohook.on("keyup", (event) => {
  if (event.keycode !== 57) return; // space key

  clickpropagation ? iohook.disableClickPropagation(): iohook.enableClickPropagation();
  clickpropagation = !clickpropagation;
});

iohook.start(true);

