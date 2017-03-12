var App = {

  toggleBold(e) {
    document.execCommand('bold');
    this.toggleButton(e);
  },

  toggleItalic(e) {
    document.execCommand('italic');
    this.toggleButton(e);
  },

  toggleUnderline(e) {
    document.execCommand('underline');
    this.toggleButton(e);
  },

  toggleLink(e) {
    var selection = document.getSelection().toString()
    ,   url;
    if (!selection) return;

    url = prompt('Enter the URL to link to: ');
    this.createLink(url, e);
  },

  toggleStrikeThrough(e) {
    document.execCommand('strikeThrough');
    this.toggleButton(e);
  },

  createLink(url, e) {
    if (!url) return;
    document.execCommand('createLink', false, url);
    this.toggleButton(e);
  },

  insertUL(e) {
    document.execCommand('insertUnorderedList');
    this.toggleButton(e);
  },

  insertOL(e) {
    document.execCommand('insertOrderedList');
    this.toggleButton(e);
  },

  alignLeft(e) {
    document.execCommand('justifyLeft');
    this.toggleButton(e);
    this.toggleButtons();
  },

  alignRight(e) {
    document.execCommand('justifyRight');
    this.toggleButton(e);
    this.toggleButtons();
  },

  alignCenter(e) {
    document.execCommand('justifyCenter');
    this.toggleButton(e);
    this.toggleButtons();
  },

  alignJustify(e) {
    document.execCommand('justifyFull');
    this.toggleButton(e);
    this.toggleButtons();
  },

  toggleButton(e) {
    var $btn = $(e.target);
    $btn.toggleClass('pushed');
  },

  toggleButtons() {
    var is_bold           = document.queryCommandValue('bold') === 'true'
    ,   is_italic         = document.queryCommandValue('italic') === 'true'
    ,   is_underlined     = document.queryCommandValue('underline') === 'true'
    ,   is_stroke_through = document.queryCommandValue('strikeThrough') === 'true'
    ,   is_a_link         = document.queryCommandValue('createLink') === 'true'
    ,   is_an_OL          = document.queryCommandValue('insertOrderedList') === 'true'
    ,   is_a_UL           = document.queryCommandValue('insertUnorderedList') === 'true'
    ,   is_align_left     = document.queryCommandValue('justifyLeft') === 'true'
    ,   is_align_right    = document.queryCommandValue('justifyRight') === 'true'
    ,   is_align_center   = document.queryCommandValue('justifyCenter') === 'true'
    ,   is_align_justify  = document.queryCommandValue('justifyFull') === 'true';

    $('.bold').toggleClass('pushed', is_bold);
    $('.italicize').toggleClass('pushed', is_italic);
    $('.underline').toggleClass('pushed', is_underlined);
    $('.strikethrough').toggleClass('pushed', is_stroke_through);
    $('.link').toggleClass('pushed', is_a_link);
    $('.ul').toggleClass('pushed', is_a_UL);
    $('.ol').toggleClass('pushed', is_an_OL);
    $('.al_left').toggleClass('pushed', is_align_left);
    $('.al_right').toggleClass('pushed', is_align_right);
    $('.al_center').toggleClass('pushed', is_align_center);
    $('.al_justify').toggleClass('pushed', is_align_justify);
  },

  init() {
    $('button.bold').on('click', this.toggleBold.bind(this));
    $('button.italicize').on('click', this.toggleItalic.bind(this));
    $('button.underline').on('click', this.toggleUnderline.bind(this));
    $('button.link').on('click', this.toggleLink.bind(this));
    $('button.strikethrough').on('click', this.toggleStrikeThrough.bind(this));
    $('button.ul').on('click', this.insertUL.bind(this));
    $('button.ol').on('click', this.insertOL.bind(this));
    $('button.al_left').on('click', this.alignLeft.bind(this));
    $('button.al_right').on('click', this.alignRight.bind(this));
    $('button.al_center').on('click', this.alignCenter.bind(this));
    $('button.al_justify').on('click', this.alignJustify.bind(this));
    document.addEventListener('selectionchange', this.toggleButtons.bind(this));
  }
}

App.init();