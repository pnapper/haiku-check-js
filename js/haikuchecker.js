export class HaikuChecker {
  constructor(lineOne, lineTwo, lineThree) {
    this.lineOne = lineOne;
    this.lineTwo = lineTwo;
    this.lineThree = lineThree;
  }

  CheckLines() {
    //Checking if Haiku has three lines
    if(this.lineOne !== "" && this.lineTwo !== "" && this.lineThree !== "")
    {
      return true;
    }

    //

  }
}