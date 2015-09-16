import Backbone from 'backbone';
import {ItemView} from 'backbone.marionette';
import template from './sidebar.hbs';
import Radio from 'backbone.radio';

let sidebarChannel = Radio.channel("sidebar");

export default ItemView.extend({
  template: template,
  className: 'treeview',
  initialize() {
    sidebarChannel.reply('toggle', this.toggle, this);
  },
  onRender() {
    console.log("sidebar view rendered");
  },
  toggle() {
    this.$el.parent().slideToggle();
  }
});
