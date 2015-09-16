import Backbone from 'backbone';
import {ItemView} from 'backbone.marionette';
import template from './treetoggler.hbs';
import Radio from 'backbone.radio';

let sidebarChannel = Radio.channel("sidebar");

export default ItemView.extend({
  template: template,
  tagName: 'a',
  className: 'btn btn-primary btn-xs',
  events: {
    'click': 'toggleSidebar'
  },
  onRender() {
    console.log("treetoggler view rendered");
  },
  toggleSidebar(event) {
    event.preventDefault();
    var x = sidebarChannel.request("toggle");
  }
});
