
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

var TadaActionCreators = {
	  /**
	   * @param  {string} text
	   */
	  showPrimarySchoolHierarchy: function() {
	    console.log('Show primary school hierarchy invoked');
	    AppDispatcher.dispatch({
	      actionType: AppConstants.PRIMARY_SELECTED,
	      selected: true
	    });
	  },

	  showPreSchoolHierarchy: function() {
	  	console.log('Show preschool hierarchy invoked');
	    AppDispatcher.dispatch({
	      actionType: AppConstants.PRESCHOOL_SELECTED,
	      selected: true
	    });
	  }
};

module.exports=TadaActionCreators;
