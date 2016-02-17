import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
var EventEmitter = require('events');
var assign = require('object-assign');
var ActionTypes = AppConstants.ActionTypes;
var merge = require('merge');

var currentSchoolSelection = 'primary';
var CHANGE_EVENT = 'viewchange';
var boundaryDetailsById = {};
var userData = {};

var TadaStore= merge(EventEmitter.prototype, {

	emitChange: function() 
	{
		console.log('Sending change event');
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) 
	{
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	getCurrentSchoolSelection: function() {
		return currentSchoolSelection;
	},

	setBoundaryDetails: function(boundaryDetails){
		this.boundaryDetailsById = boundaryDetails;
	},

	getBoundaryDetailsById: function(boundaryId){
		return this.boundaryDetailsById[boundaryId];
	},

	setUserData: function(user){
		this.userData = user;
	}
});


TadaStore.dispatchToken = AppDispatcher.register(function(action) {
	console.log('Handling callback..');
	switch(action.actionType) {
		case ActionTypes.PRIMARY_SELECTED:
			console.log('primary selected');
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

