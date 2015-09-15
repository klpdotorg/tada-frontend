import {LayoutView} from 'backbone.marionette';
import template from './layout-template.hbs';
import NavbarView from './mainViews/navbar';
import SecondaryMenuView from './mainViews/secondaryMenu';
import SchooltypesView from './mainViews/schooltypes';
import TreetogglerView from './mainViews/treetoggler';
import SidebarView from './mainViews/sidebar';

export default LayoutView.extend({
  el: '.application',
  template: template,

  regions: {
    //header  : '.application__header',
    flashes : '.application__flashes',
    navbar: '.main__navbar',
    secondaryMenu: '.main__secondaryMenu',
    schooltypes: '.main__schooltypes',
    treetoggler: '.main__treetoggler',
    sidebar: '.main__sidebar',
    content: '.main__content',
    overlay : '.application__overlay'
  },

  onRender() {
    console.log("application layout rendered");
    this.navbar.show(new NavbarView());
    this.secondaryMenu.show(new SecondaryMenuView());
    this.schooltypes.show(new SchooltypesView());
    //this.treetoggler.show(new TreetogglerView());
    //this.sidebar.show(new SidebarView());
    //this.schooltypes.show(new SchoolTypesView());

  }
});
