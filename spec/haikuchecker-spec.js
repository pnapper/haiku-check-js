import {HaikuChecker} from './../js/haikuchecker.js';

describe('HaikuChecker', function() {
  it('should test whether a Haiku has 3 lines', function() {
    var haikuChecker = new HaikuChecker()
    expect(haikuChecker.CheckLines('simple', 'line', 'here')).toEqual(true)

  });
  it('should test whether a Haiku has 3 lines again', function() {
    var haikuChecker = new HaikuChecker()
    expect(haikuChecker.CheckLines('simple1', 'line1', '1here')).toEqual(true)
});



});
