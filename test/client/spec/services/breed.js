'use strict';

describe('Service: breed', function () {

  // load the service's module
  beforeEach(module('canadoptaApp'));

  // instantiate service
  var breed;
  beforeEach(inject(function (_breed_) {
    breed = _breed_;
  }));

  it('should do something', function () {
    expect(!!breed).toBe(true);
  });

});
