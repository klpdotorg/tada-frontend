import {ItemView} from 'backbone.marionette';
import template from './sidebar.hbs';
import Radio from 'backbone.radio';

var sidebarChannel = Radio.channel('sidebar');
export default ItemView.extend({
  template: template,
  className: 'treeview',
  initialize: function() {
    sidebarChannel.reply('toggle', this.toggle, this);
  },
  onRender: function() {
    //console.log("sidebar view rendered");
  },
  toggle: function() {
    this.$el.parent().slideToggle();
  }
});
