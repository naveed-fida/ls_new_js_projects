var App = {
  $toggle_button: $('.toggle'),
  $reset_button: $('.reset'),
  is_on: false,
  centi_secs: 0,
  secs: 0,
  mins: 0,
  hours: 0,

  startStop() {
    if (this.is_on) {
      this.stop();
    } else {
      this.start();
    }
  },

  start() {
    this.interval = setInterval(this.addTime.bind(this), 10);
    this.$toggle_button.text('Stop');
    this.is_on = true;    
  },

  stop() {
    clearInterval(this.interval);
    this.$toggle_button.text('Start');
    this.is_on = false;
  },
 
  addTime() {
    this.centi_secs++;
    if (this.centi_secs === 100) {
      this.centi_secs = 0;
      this.secs++;

      if (this.secs === 100) {
        this.secs = 0;
        this.mins++;

        if (this.mins === 100) {
          this.mins = 0;
          this.hours++;
        }
      }
    }

    this.displayTime();
  },

  reset() {
    this.is_on && this.stop();

    this.centi_secs = 0;
    this.secs = 0;
    this.mins = 0;
    this.hours = 0;

    this.displayTime();
  },

  displayTime() {
    $('.centisecs').text(this.centi_secs < 10 ? "0" + this.centi_secs : this.centi_secs);
    $('.secs').text(this.secs < 10 ? "0" + this.secs : this.secs);
    $('.mins').text(this.mins < 10 ? "0" + this.mins : this.mins);
    $('.hours').text(this.hours < 10 ? "0" + this.hours : this.hours);
  },

  init() {
    this.$toggle_button.on('click', this.startStop.bind(this));
    this.$reset_button.on('click', this.reset.bind(this));
  }
};

App.init();