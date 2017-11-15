export class HaikuChecker {
  constructor(lineOne, lineTwo, lineThree) {
    this.lineOne = lineOne;
    this.lineTwo = lineTwo;
    this.lineThree = lineThree;
  }

  CheckLines() {
    //Checking if Haiku has three lines
    let IsHaiku = false;

    if(this.lineOne !== "" && this.lineTwo !== "" && this.lineThree !== "")
    {
      IsHaiku = true;
    }
    return IsHaiku;
  }

  CheckSyllables() {
    //Checking if Line 1 has 5 syllables, line 2 has 7 and line 3 has 5 syllables

    var syllable = require('syllable');
    let IsHaiku = false;
    let lineOne = this.lineOne;
    let lineTwo = this.lineTwo;
    let lineThree = this.lineThree;
    let lineOneSyllable = syllable(lineOne);
    let lineTwoSyllable = syllable(lineTwo);
    let lineThreeSyllable = syllable(lineThree);


    console.log(lineOneSyllable);
    console.log(lineTwoSyllable);
    console.log(lineThreeSyllable);

    if( lineOneSyllable == 5 && lineTwoSyllable == 7 && lineThreeSyllable == 5)
    {
      IsHaiku = true;
    }
    return IsHaiku;
  }
}
