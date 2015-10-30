import {ItemView} from 'backbone.marionette';
import template from './navbar.hbs';
import Radio from 'backbone.radio';

var sidebarChannel = Radio.channel('sidebar');
export default ItemView.extend({
  template: template,
  className: 'nav nav-pills',
  events: {
    'click #toggler-icon': 'toggleSidebar'
  },
  onRender: function() {
// Add onRender
  },
  toggleSidebar: function(event) {
    event.preventDefault();
    sidebarChannel.request('toggle');
  }
});
