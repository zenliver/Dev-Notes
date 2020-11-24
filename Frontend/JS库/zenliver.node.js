/***
  个人NodeJS工具函数库
  ver: 20201019
***/


var crypto = require("crypto");
var path = require('path');
var fs = require('fs');
var NodeRSA = require('node-rsa');
var privatePem = fs.readFileSync(path.resolve(__dirname,'./../key/privateKey.pem'));
var key = new NodeRSA(privatePem);

exports.rsaEncrypt = function (str,publicKey) {
    key.setOptions({encryptionScheme: 'pkcs1'});
   var encrypted = key.encrypt(str, 'base64');
    return encrypted;
};

exports.rsaDecrypt = function (encrypted,privateKey) {
 /*   var key = new NodeRSA(privateKey);*/
    key.setOptions({encryptionScheme: 'pkcs1'});
   var decrypted = key.decrypt(encrypted, 'utf8');
    return decrypted;
};

exports.getRemoteVisitIp = function (req) {
	var ip = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
	// console.debug('[ip]getRemoteVisitIp headers:');
	// console.debug( req.headers);
	// if(ip){
	// 	console.debug("[ip]client ip:" + ip);
	// }else{
	// 	console.debug('[ip]cant get client ip');
	// }

	// var index = ip.lastIndexOf(":");
	// if (index >= 0) {
	// 	ip = ip.substring(index + 1);
	// }
	var multiIndex = ip.indexOf(",");
	if (multiIndex > 0) {
		ip = ip.substring(0, multiIndex);
	}
	return ip;
};

exports.setCookie = function (res, key, value) {
	console.log("setCookie");
	var maxAge = setting.saveUserCookie;
	console.log("setCookie key:" + key);
	if (!value) {
		res.clearCookie(key);
	} else if (typeof value == "string") {
		res.cookie(key, value, {maxAge: maxAge});
	} else {
		res.cookie(key, JSON.stringify(value), {maxAge: maxAge});
	}
};

exports.getCookie = function (req, key) {
	var cookies = {};
	req.headers.cookie && req.headers.cookie.split(';').forEach(function (cookie) {
		var parts = cookie.split('=');
		cookies[parts[0].trim()] = (parts[1] || '').trim();
	});
	var str = cookies[key];
	if (!str) {
		return null;
	}
	str = decodeURIComponent(str);
	var result = str;
	try {
		result = JSON.parse(str);
		if (typeof result == "string") {
			result = JSON.parse(result);
		}
	} catch (e) {
		console.error(e);
	}
	return result;
};

exports.clearCookies = function (req, res) {
	console.log("clearCookies");
	req.headers.cookie && req.headers.cookie.split(';').forEach(function (cookie) {
		var parts = cookie.split('=');
		var key = parts[0].trim();
		res.clearCookie(key);
	});
};

exports.md5 = function (str, key) {
	var decipher = crypto.createHash('md5', key)
	if (key) {
		return decipher.update(str).digest()
	}
	return decipher.update(str).digest('hex')
};
