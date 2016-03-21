
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

var ActionTypes = AppConstants.ActionTypes;
var TadaActionCreators = {
	  /**
	   * @param  {string} text
	   */
	  showPrimarySchoolHierarchy: function() {
	    console.log('Show primary school hierarchy invoked');
	    AppDispatcher.dispatch({
	      actionType: ActionTypes.PRIMARY_SELECTED,
	      id: 1,
	      selected: true
	    });
	  },

	  showPreSchoolHierarchy: function() {
	  	console.log('Show preschool hierarchy invoked');
	    AppDispatcher.dispatch({
	      actionType: ActionTypes.PRESCHOOL_SELECTED,
	      id: 2,
	      selected: true
	    });
	  },

	 
};

module.exports=TadaActionCreators;
