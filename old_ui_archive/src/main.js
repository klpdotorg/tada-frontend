import './plugins';
import Backbone from 'backbone';
import $ from 'jquery';

import Application from './application/application';

import ModalService from './modal/service';
//import HeaderService from './header/service';
import FlashesService from './flashes/service';

import IndexRouter from './index/router';
// import ColorsRouter from './colors/router';
// import BooksRouter from './books/router';

var app = new Application();
ModalService.setup({
  container: app.layout.overlay
});

// HeaderService.setup({
//   container: app.layout.header
// });

FlashesService.setup({
  container: app.layout.flashes
});

$(document).ajaxError = function() {
  FlashesService.add({
    type: 'danger',
    title: 'Server Error'
  });
};

app.index = new IndexRouter({
  container: app.layout.content
});

Backbone.history.start();
