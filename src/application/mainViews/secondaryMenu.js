import Backbone from 'backbone';
import {ItemView} from 'backbone.marionette';
import template from './secondaryMenu.hbs';

export default ItemView.extend({
  template: template,
  className: 'nav nav-pills',
  onRender() {
    console.log("secondary menu view rendered");
  }
});
