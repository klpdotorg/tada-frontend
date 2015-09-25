import Backbone from 'backbone';
import {ItemView} from 'backbone.marionette';
import template from './navbar.hbs';
import Radio from 'backbone.radio';

let sidebarChannel = Radio.channel("sidebar");

export default ItemView.extend({
  template: template,
  className: 'nav nav-pills',
  events: {
    'click #toggler-icon': 'toggleSidebar'
  },  
  onRender() {
    console.log("navbar view rendered");
  },
  toggleSidebar(event) {  	
    event.preventDefault();
    var x = sidebarChannel.request("toggle");
  }  
});
  
  