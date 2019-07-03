let promise1 = new Promise(function (resolve,reject) {
  window.setTimeout(function () {
    console.log('TEST');
    resolve('success');
    console.log(promise1);

  },3000);

});

console.log(promise1);


function asyncGetData(url) {

  let promise = new Promise(function (resolve,reject) {

    let xhr = new XMLHttpRequest();

    xhr.open('GET',url);

    xhr.onload = function () {
      console.log(xhr);
      resolve(JSON.parse(xhr.response));
      console.log(promise);
    };

    xhr.onerror = function () {
      console.log(xhr);
      reject(xhr.response);
      console.log(promise);
    };

    xhr.send();

  });

  return promise;
}

asyncGetData('https://www.gdszip.com/data/json-cors.php?file=redux_options.json').then(function (response) {
  console.log('.then 返回的 response:');
  console.log(response);
}).catch(function (error) {
  console.log('.catch 返回的 error:');
  console.log(error);
});
