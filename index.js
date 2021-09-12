const refs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
};

class Timer {
  constructor(finishDate) {
    this.finishDate = finishDate.getTime()
    this.intervalID = null
    this.deltaTime = 0
  }
  start() {
    this.intervalID = setInterval(() => {
      let currentDate = Date.now()
      this.deltaTime = this.finishDate - currentDate

      this.insertData(refs.days, this.getDaysCount(this.deltaTime))
      this.insertData(refs.hours, this.getHoursCount(this.deltaTime))
      this.insertData(refs.mins, this.getMinsCount(this.deltaTime))
      this.insertData(refs.secs, this.getSecondsCount(this.deltaTime))
    }, 1000)
  }
  finish() {
    clearInterval(this.intervalID)
    this.clearClockFace()
  }
  // ============
  clearClockFace() {
    refs.days.textContent = '00'
    refs.hours.textContent = '00'
    refs.mins.textContent = '00'
    refs.secs.textContent = '00'
  }

  // ============
  padValue(value, num, symbol) {
    return String(value).padStart(num, symbol)
  }
  getDaysCount(time) {
    return this.padValue(Math.floor(time / (1000 * 60 * 60 * 24)), 2, '0')
  }
  getHoursCount(time) {
    return this.padValue(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), 2, '0')
  }
  getMinsCount(time) {
    return this.padValue(
      Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)), 2, '0')
  }
  getSecondsCount(time) {
    return this.padValue(Math.floor((time % (1000 * 60)) / 1000), 2, '0')
  }
  insertData(place, value) {
    place.textContent = value
  }
  // ============
}
const myTimer = new Timer(new Date('Dec 1, 2021'))
 myTimer.start()