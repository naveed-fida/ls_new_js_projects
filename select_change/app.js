Handlebars.registerPartial("car_template", $('#car_template').html());
Handlebars.registerPartial("model_options_template", $('#model_options_template').html());

var cars = [
  { make: "Honda", image: "images/honda-accord-2005.jpg", model: "Accord", year: 2005, price: 7000},
  { make: "Honda", image: "images/honda-accord-2008.jpg", model: "Accord", year: 2008, price: 11000 },
  { make: "Toyota", image: "images/toyota-camry-2009.jpg", model: "Camry", year: 2009, price: 12500 },
  { make: "Toyota", image: "images/toyota-corrolla-2016.jpg", model: "Corrolla", year: 2016, price: 15000 },
  { make: "Suzuki", image: "images/suzuki-swift-2014.jpg", model: "Swift", year: 2014, price: 9000 },
  { make: "Audi", image: "images/audi-a4-2013.jpg", model: "A4", year: 2013, price: 25000 },
  { make: "Audi", image: "images/audi-a4-2013.jpg", model: "A4", year: 2013, price: 26000 },
];


var App = {
  cars_template: Handlebars.compile($('#cars_template').html()),
  filters_template: Handlebars.compile($('#filters_template').html()),
  all_cars: cars,
  $cars: $("#cars"),
  $filters: $('#filters'),
  filtered_cars: cars,
  model_options_template: Handlebars.compile($('#model_options_template').html()),

  renderCars() {
    this.$cars.html(this.cars_template({cars: this.filtered_cars}));
  },

  renderFilterMenu() {
    this.$filters.html(this.filters_template(this.generateFilters()));
  },

  handleFilterClick() {
    var make  = $('#make_select').val()
    ,   model = $('#model_select').val()
    ,   price = +$('#price_select').val()
    ,   year  = +$('#year_select').val();

    var filters = {};

    if (make) filters.make = make;
    if (model) filters.model = model;
    if (price) filters.price = price;
    if (year) filters.year = year;

    this.filterCars(filters);
  },

  filterCars(filters) {
    this.filtered_cars = _(this.all_cars).where(filters);
    this.renderCars();
  },

  generateFilters() {
    var makes  = _.uniq(_(this.all_cars).pluck('make'))
    ,   models = _.uniq(_(this.all_cars).pluck('model'))
    ,   prices = _.uniq(_(this.all_cars).pluck('price'))
    ,   years  = _.uniq(_(this.all_cars).pluck('year'));

    return { makes, models, prices, years };
  },

  renderModelsForMake(models) {
    $('#model_select').html(this.model_options_template({models}))
  },

  handleMakeSelect(e) {
    var make = $(e.target).val()
    ,   models_for_make;

    if (make) {
      models_for_make = _.uniq(_(_.where(this.all_cars, {make: make})).pluck('model'));
    } else {
      models_for_make = _.uniq(_(this.all_cars).pluck('model'));
    }

    console.log(make);
    console.log(this.all_cars.length);
    console.log(models_for_make);
    this.renderModelsForMake(models_for_make);
  },

  init() {
    this.renderCars(this.cars);
    this.renderFilterMenu();
    $('#filters').on('click', '.filter_btn', this.handleFilterClick.bind(this));
    $('#make_select').on('change', this.handleMakeSelect.bind(this));
  }
};


App.init();