export class HaikuChecker {
  constructor() {
    // this.lineOne = lineOne;
    // this.lineTwo = lineTwo;
    // this.lineThree = lineThree;
  }

  CheckLines(lineOne, lineTwo, lineThree) {
    //Checking if Haiku has three lines
    let IsHaiku = false;

    if(lineOne !== "" && lineTwo !== "" && lineThree !== "")
    {
      IsHaiku = true;
    }
    return IsHaiku;
  }

  CheckSyllables(lineOne, lineTwo, lineThree) {
    //Checking if Line 1 has 5 syllables, line 2 has 7 and line 3 has 5 syllables

    var syllable = require('syllable');
    let IsHaiku = false;
    // let lineOne = this.mylineOne;
    // let lineTwo = this.lineTwo;
    // let lineThree = this.lineThree;
    let lineOneSyllable = syllable(lineOne);
    let lineTwoSyllable = syllable(lineTwo);
    let lineThreeSyllable = syllable(lineThree);


    console.log(syllable(lineOne));
    console.log(lineOne);
    console.log(lineOneSyllable);
    console.log(syllable(lineTwo));
    console.log(lineTwo);
    console.log(lineTwoSyllable);
    console.log(syllable(lineThree));
    console.log(lineThree);
    console.log(lineThreeSyllable);

    if( lineOneSyllable == 5 && lineTwoSyllable == 7 && lineThreeSyllable == 5)
    {
      IsHaiku = true;
    }
    return IsHaiku;
  }
}
