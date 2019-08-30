var fs = require('fs');
var zlib = require('zlib');

fs.createReadStream('./file.txt.gz').pipe(zlib.createGunzip()).pipe(fs.createWriteStream('./file_ungzip.txt'));

console.log('file.txt.gz解压完成');
