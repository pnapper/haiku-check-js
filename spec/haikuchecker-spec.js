import {HaikuChecker} from './../js/haikuchecker.js';


describe('HaikuChecker', function() {
  it('should test whether a Haiku has 3 lines', function() {
    var haikuChecker = new HaikuChecker('simple', 'line', 'here')
    expect(haikuChecker.CheckLines()).toEqual(true)

  });
  it('should test whether a Haiku has 3 lines again', function() {
    var haikuChecker = new HaikuChecker('simple1', 'line1', '1here')
    expect(haikuChecker.CheckLines()).toEqual(true)
  });
  it('should test whether all the lines in Haiku has the right syllables output false', function() {
    var haikuChecker = new HaikuChecker('simple1', 'line1', '1here')
    expect(haikuChecker.CheckSyllables()).toEqual(false)
  });
  it('should test whether all the lines in Haiku has the right syllables output false', function() {
    var haikuChecker = new HaikuChecker('An old silent pond', 'A frog jumps into the pond', 'splash! Silence again')
    expect(haikuChecker.CheckSyllables()).toEqual(true)
  });

});
