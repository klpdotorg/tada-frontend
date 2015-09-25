import {LayoutView} from 'backbone.marionette';
import template from './layout-template.hbs';
import HeaderView from './mainViews/header';
import navbarView from './mainViews/navbar';
import SidebarView from './mainViews/sidebar';


export default LayoutView.extend({
  el: '.application',
  template: template,

  regions: {    
    flashes : '.application__flashes',
    header: '.main__header',
    navbar: '.main__navbar',        
    sidebar: '.main__sidebar',
    content: '.main__content',
    overlay : '.application__overlay'
  },

  onRender() {
    console.log("application layout rendered");
    this.header.show(new HeaderView());
    this.navbar.show(new navbarView());    
    //this.treetoggler.show(new TreetogglerView());
    this.sidebar.show(new SidebarView());    
  }
});
