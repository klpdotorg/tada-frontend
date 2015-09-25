import Backbone from 'backbone';
import {ItemView} from 'backbone.marionette';
import template from './navbar.hbs';

export default ItemView.extend({
  template: template,
  className: 'nav nav-pills',
  onRender() {
    console.log("navbar view rendered");
  }
});
