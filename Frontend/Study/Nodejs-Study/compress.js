var fs = require('fs');
var zlib = require('zlib');

fs.createReadStream('./file.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('./file.txt.gz'));
