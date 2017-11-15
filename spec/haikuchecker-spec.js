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
  it('should test whether all the lines in Haiku has the right syllables output false', function() {
    var haikuChecker = new HaikuChecker()
    expect(haikuChecker.CheckSyllables('simple1', 'line1', '1here')).toEqual(false)
  });
  it('should test whether all the lines in Haiku has the right syllables output false', function() {
    var haikuChecker = new HaikuChecker()
    expect(haikuChecker.CheckSyllables('An old23 silent pond.', 'A frog jumps into the pond', 'splash! Silence again'
  )).toEqual(true)
  });

});
