import {ItemView} from 'backbone.marionette';
import template from './header.hbs';

export default ItemView.extend({
  template: template,
  className: 'container-fluid',
  onRender: function() {
    console.log('navbar view rendered');
  }
});
