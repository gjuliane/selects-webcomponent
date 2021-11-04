const fs = require('fs-extra');
const concat = require('concat');

build = async () =>{
    const files = [
        './dist/viveusa-mundo/runtime.js',
        './dist/viveusa-mundo/polyfills.js',
        './dist/viveusa-mundo/main.js'
      ];

      await fs.ensureDir('widget');
      await concat(files, 'widget/widget-viveusa.js');
}
build();
