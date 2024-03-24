import { makeObservable, observable, computed, action } from "mobx";

class AppsCodeStore {
  appsList = [];
  intervalId = null;
  seconds = 60;

  constructor() {
    makeObservable(this, {
      appsList: observable,
      totalApps: computed,
      createApp: action,
      startTimer: action,
      resetTimer: action,
      generateSixDigitNumber: action,
      seconds: observable,
      intervalId: observable,
    });
  }

  get totalApps() {
    return this.appsList.length;
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.seconds--;
      if (this.seconds === 0) {
        this.resetTimer();
      }
    }, 1000);
  }

  resetTimer() {
    clearInterval(this.intervalId);
    this.seconds = 60;
    this.startTimer();

    this.appsList = this.appsList?.map((item) => ({
      ...item,
      code: this.generateSixDigitNumber(),
    }));
  }

  generateSixDigitNumber() {
    const min = 100000; // Smallest 6-digit number
    const max = 999999; // Largest 6-digit number
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    // Convert the number to a string
    const numberString = randomNumber.toString();

    // Insert space after every three digits
    const firstPart = numberString.slice(0, 3);
    const secondPart = numberString.slice(3);
    const formattedNumber = `${firstPart} ${secondPart}`;

    return formattedNumber;
  }

  createApp(app = { id: 0, name: "" }) {
    let updatedApp = {
      ...app,

      code: this.generateSixDigitNumber(),
    };
    this.appsList.push(updatedApp);
  }
}
const appCodeStore = new AppsCodeStore();
export default appCodeStore;
