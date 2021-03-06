define('promise',

       [],

function() {

  var types = {
    SUCCESS: 'success',
    FAIL: 'fail'
  };

  function Promise() {
    this.promises = {
      success: [],
      fail: []
    };
  }

  Promise.prototype.then = function(success, fail) {
    if (success) {
      this.promises.success.push(success);
    }
    if (fail) {
      this.promises.fail.push(fail);
    }
    return this;
  };

  Promise.prototype.run = function(type, response, request) {
    var result = response,
        list = this.promises[type];
    while (list.length) {
      var func = list.shift();
      var callResult = func(result, request);
      result = callResult || result;
    }
    return this;
  };

  Promise.prototype.succeed = function(response, request) {
    return this.run(types.SUCCESS, response, request);
  };

  Promise.prototype.fail = function(response) {
    return this.run(types.FAIL, response);
  };

  return Promise;

});
