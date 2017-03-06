var App = {

  startTimer(e) {
    this.timer = setTimeout(function() {
      this.showToolTip(e);
    }.bind(this), 2000);
  },

  showToolTip(e) {
    $figcap = $(e.target).next('figcaption').fadeIn(300);
    $figcap.css('position', 'absolute');
  },

  handleMouseLeave(e) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    $('figcaption').fadeOut(300);
  },

  init() {
    $('#exotic_animals').on('mouseenter', 'img', this.startTimer.bind(this));
    $('#exotic_animals').on('mouseleave', 'img', this.handleMouseLeave.bind(this));
  }
};


App.init();