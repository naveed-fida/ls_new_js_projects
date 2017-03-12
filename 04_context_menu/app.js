var App = {
  todos: todo_items,
  todos_template: Handlebars.compile($('#todos_template').html()),
  confirm_template: Handlebars.compile($('#confirm_template').html()),
  $todos: $('ul#todos'),
  $confirm: $('.confirm_prompt'),
  $context_menu: $('.context_menu'),
  context_menu_template: Handlebars.compile($('#context_menu_template').html()),

  renderTodos() {
    this.$todos.html(this.todos_template({ todos: this.todos }));
  },

  handleDeleteClick(e) {
    e.preventDefault();
    var todo_id   = +$(e.target).closest('li').attr('data-id');
    this.showPrompt(todo_id);
  },

  handleConfirmYes(e) {
    e.preventDefault();
    todo_id = +$(e.target).closest('.confirm_wrapper').attr('data-id');
    this.removeTodo(todo_id);
  },

  removeTodo(id) {
    this.todos = this.todos.filter(function(todo) {
      return todo.id !== id;
    });

    this.hidePrompt();
    this.renderTodos();
  },

  showPrompt(todo_id) {
    this.$confirm.html(this.confirm_template({id: todo_id}));
    this.$confirm.add('.overlay').fadeIn(300);
    this.bindPromptEvents();
  },

  bindPromptEvents() {
    this.$confirm.one('click', '.confirm_no', this.hidePrompt.bind(this));
    this.$confirm.one('click', '.confirm_yes', this.handleConfirmYes.bind(this));
  },

  hidePrompt() {
    this.$confirm.add('.overlay').hide();
  },

  handleContextMenu(e) {
    var left  = e.clientX
    ,   top = e.clientY
    ,   id    = +$(e.target).attr('data-id');

    this.displayContextMenu(id, {left, top});
    console.log('Context menu clicked!')
    return false;
  },

  displayContextMenu(id, coords) {
    this.hideContextMenu();
    this.$context_menu.html(this.context_menu_template({id}));
    this.$context_menu.fadeIn(300);
    this.$context_menu.offset(coords);
    this.$context_menu.one('click', '.remove', this.handleDeleteClick.bind(this));
  },

  hideContextMenu() {
    this.$context_menu.hide();
  },

  init() {
    this.renderTodos();
    this.$todos.on('contextmenu', 'li', this.handleContextMenu.bind(this));
    $('.overlay').on('click', this.hidePrompt.bind(this));
    $(document.body).on('click', this.hideContextMenu.bind(this));
  }
}

App.init();