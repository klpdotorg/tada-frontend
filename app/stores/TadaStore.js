import Dispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
var EventEmitter = require('events');
var assign = require('object-assign');
var ActionTypes = AppConstants.ActionTypes;

var currentSchoolSelection = null;
var CHANGE_EVENT = 'viewchange';

class TadaStore extends EventEmitter {

	constructor() {
		super();
		console.log('Inside TadaStore init..');
	
	}

	emitChange() {
		this.emit(CHANGE_EVENT);
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	getCurrentSchoolSelection() {
		return currentSchoolSelection;
	}
};


TadaStore.dispatchToken = Dispatcher.register(function(action) {
	switch(action.type) {
		case ActionTypes.PRIMARY_SELECTED:
			currentSchoolSelection = 'primary';
			TadaStore.emitChange();
			break;

		case ActionTypes.PRESCHOOL_SELECTED:
			currentSchoolSelection = 'preschool';
			TadaStore.emitChange();
			break;

		default:
			//do nothing
	}
});

module.exports = TadaStore;

