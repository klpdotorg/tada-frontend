import Service from 'backbone.service';
import {Collection} from 'backbone';
import View from './view';

var HeaderService = Service.extend({
  setup(options = {}) {
    this.container = options.container;
  },

  start() {
    this.collection = new Collection();
    this.view = new View({ collection: this.collection });
    this.container.show(this.view);
  },

  requests: {
    add: 'add',
    remove: 'remove',
    activate: 'activate',
  },

  add(model) {
    this.collection.add(model);
  },

  remove(model) {
    var modelInCollection = this.collection.findWhere(model);
    this.collection.remove(modelInCollection);
  },

  activate(model) {
    var modelInCollection = this.collection.findWhere(model);
    this.collection.invoke('set', 'active', false);
    if (modelInCollection) {
      model.set('active', true);
    }
  }
});

export default new HeaderService();
