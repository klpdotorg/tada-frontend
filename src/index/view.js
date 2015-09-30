import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

export default ItemView.extend({
  template: template,
  className: 'container-fluid',
  onRender() {
    console.log('index view rendered');
  }
});
