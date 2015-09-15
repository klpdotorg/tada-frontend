import Backbone from 'backbone';
import {ItemView} from 'backbone.marionette';
import template from './schooltypes.hbs';

export default ItemView.extend({
  template: template,
  className: 'row',
  onRender() {
    console.log("schooltypes view rendered");
  }
});
