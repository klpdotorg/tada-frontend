import $ from 'jquery';
import _ from 'lodash';
import Radio from 'backbone.radio';
import nprogress from 'nprogress';
import {Application} from 'backbone.marionette';
import LayoutView from './layout-view';

var routerChannel = Radio.channel('router');

nprogress.configure({
  showSpinner: false
});

export default Application.extend({
  initialize: function() {
    this.$body = $(document.body);
    this.layout = new LayoutView();
    this.layout.render();

    this.listenTo(routerChannel, {
      'before:enter:route': this.onBeforeEnterRoute,
      'enter:route': this.onEnterRoute,
      'error:route': this.onErrorRoute
    });
  },

  onBeforeEnterRoute: function() {
    this.transitioning = true;
    // Don't show for synchronous route changes
    _.defer(function() {
      if (this.transitioning) {
        nprogress.start();
      }
    });
  },

  onEnterRoute: function() {
    this.transitioning = false;
    this.$body.scrollTop(0);
    nprogress.done();
  }
});
