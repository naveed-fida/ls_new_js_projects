var App = {
  current_num_screen: document.querySelector('#screen .current_num'),
  operations_screen: document.querySelector('#screen .calculation'),
  result: 0,
  current_op: '+',
  result_status: false,

  handleDigitClick(e) {
    e.preventDefault();
    this.printDigit(e.target.textContent.trim());
  },

  handleOpClick(e) {
    e.preventDefault();

    this.printOperator(e.target.textContent.trim());
  },

  clearAll(e) {
    this.clear(e);
    this.clearOpScreen();
    this.reset();
  },

  clear(e) {
    e.preventDefault();
    this.clearCurrNumScreen();
    this.current_num_screen.textContent = '0';
  },

  handleResClick(e) {
    e.preventDefault();

    this.calculateResult();
    this.clearOpScreen();
    this.reset();
  },

  handleDotClick(e) {
    e.preventDefault();

    if (this.current_num_screen.textContent.indexOf('.') === -1) {
      this.printToNumScreen('.');
    }
  },

  reset() {
    this.result = 0;
    this.current_op = '+';
  },

  printOperator(op) {
    var previous_op_text = this.operations_screen.textContent;
    var num_and_op_to_add = this.current_num_screen.textContent + " " + op + " ";
    this.calculateResult();
    this.current_op = op;
    this.operations_screen.textContent = previous_op_text + num_and_op_to_add;
  },

  clearCurrNumScreen() {
    this.current_num_screen.textContent = '';
  },

  clearOpScreen() {
    this.operations_screen.textContent = '';
  },

  calculateResult() {
    var current_num_screen = this.current_num_screen.textContent,
        number = current_num_screen.includes('.') ? parseFloat(current_num_screen) : parseInt(current_num_screen);


    switch (this.current_op) {
      case "+":
        this.result += number;
        break;
      case '-':
        this.result -= number;
        break;
      case '/':
        this.result /= number;
        break;
      case 'x':
        this.result *= number;
        break
      case '%':
        this.result = this.result % number;
        break;
    }

    this.displayResult();
  },

  negateNum(e) {
    if (this.current_num_screen.textContent !== '0')
      this.current_num_screen.textContent = "-" + this.current_num_screen.textContent;
  },

  displayResult() {
    this.current_num_screen.textContent = this.result;
    this.result_status = true;
  },

  printDigit(digit) {
    if (this.current_num_screen.textContent === '0') this.clearCurrNumScreen();
    if (this.result_status) {
      this.clearCurrNumScreen();
      this.result_status = false;
    }

    this.printToNumScreen(digit);
  },

  printToNumScreen(item) {
    var current_text = this.current_num_screen.textContent.trim();
    this.current_num_screen.textContent = current_text + item;
  },

  bind() {
    document.querySelectorAll('.digit').forEach(function(digit_button) {
      digit_button.addEventListener('click', this.handleDigitClick.bind(this));
    }.bind(this));

    document.querySelectorAll('.op').forEach(function(op_button) {
      op_button.addEventListener('click', this.handleOpClick.bind(this));
    }.bind(this));

    document.querySelector('.result_button').addEventListener('click', this.handleResClick.bind(this));
    document.querySelector('#neg').addEventListener('click', this.negateNum.bind(this));
    document.querySelector('#c').addEventListener('click', this.clear.bind(this));
    document.querySelector('#ce').addEventListener('click', this.clearAll.bind(this));
    document.querySelector('.dot').addEventListener('click', this.handleDotClick.bind(this));
  },

  init() {
    this.bind();
  }
};

App.init();