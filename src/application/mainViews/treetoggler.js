import Backbone from 'backbone';
import {ItemView} from 'backbone.marionette';
import template from './treetoggler.hbs';

export default ItemView.extend({
  template: template,
  tagName: 'a',
  onRender() {
    console.log("navbar view rendered");
  }
});
