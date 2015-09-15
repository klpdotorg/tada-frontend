import Backbone from 'backbone';
import {ItemView} from 'backbone.marionette';
import template from './sidebar.hbs';

export default ItemView.extend({
  template: template,
  className: 'treeview',
  onRender() {
    console.log("sidebar view rendered");
  }
});
