let testMethod2 = function () {
  alert('testMethod2');
};

let testMethod3 = function () {
  alert('testMethod3');
};

export default {
  'testMethod2': testMethod2,
  'testMethod3': testMethod3
};

export function testMethod4() {
  alert('testMethod4');
};

let testVar2 = {
  'test': 'testVar2'
};

export {testVar2};
