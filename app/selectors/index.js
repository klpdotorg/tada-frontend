import { createSelector } from 'reselect';
import _ from 'lodash';
import * as CONSTANTS from '../constants';
import { getEntityType } from '../reducers/utils';


const getBoundaries = (state) => state.boundaries.boundaryDetails;
const getParentChildList = (state) => state.boundaries.boundariesByParentId;
const getSchoolSelection = (state) => state.schoolSelection.primarySchool;

const getAllUsers = (state) => state.users.usersById;
const getPrograms = (state) => state.programs.programsById;

//const getVisibilityFilter = (state) => state.boundaries.visibilityFilter;
/**
 * This method returns only details of boundaries - i.e. project/circle/district OR district/block/clusters.
 */
export const getBoundaryDetailsOnly = createSelector(
    [getBoundaries],
    (boundaries) => {
      let results =
            _.mapValues(boundaries, function (boundary) {
              if (getEntityType(boundary) == CONSTANTS.BOUNDARY)
                  return boundary;
            });
      return results;
    }
);

/**
 * This method returns the parent-child hierarchy of boundaries alone. Institutions/students/student groups are all ignored.
 */
export const getBoundariesOnly = createSelector(
    [getParentChildList, getBoundaries, getSchoolSelection],
    (hierarchy, details, primarySelected) => {
        /**
         * First, filter based on school selection - primary or pre.
         */
      const schoolType = primarySelected ? 1 : 2;
      hierarchy[1] = _.filter(hierarchy[1], (key) => {
           const boundaryType = details[key].boundary_type;
           return boundaryType ? boundaryType == schoolType : true;
         });
      let results = _.mapKeys(hierarchy, (value, key) => {
            //Special case this where 1 is the parent of all districts and you don't want to filter that
          if (key == 1)
              return key;
          let boundary = details[key];
          if (getEntityType(boundary) == CONSTANTS.BOUNDARY && boundary.boundary_type === schoolType) 
              return key;
        });
      
      return results;
    }
)

export const getNonAdminUsers = createSelector(
    [getAllUsers],
    (users) => {
      let results = _.mapValues(users, function (user) {
          if (user.groups) {
              let groups = _.flatten(user.groups);
                //console.log("Groups", groups);
              if (groups.length > 0) {
                  if (groups[0].name == CONSTANTS.roles.DEE || groups[0].name == CONSTANTS.roles.DEO) {
                      return user;
                    }
                }
            }

        });
      return results;
    }
)

export const getProgramsBySchoolType = createSelector(
    [getPrograms, getSchoolSelection],
    (programs, primarySelected) => {
      let filteredPrograms={};
      if (primarySelected) {
          _.mapValues(programs, (program) => {
              if(program.programme_institution_category == 1) {
                filteredPrograms[program.id] = program;         
              }
            });
        } else {
           _.mapValues(programs, (program) => {
              if(program.programme_institution_category == 2) {
                  filteredPrograms[program.id] = program;
              }
            });
        }
      return filteredPrograms;
    }
);
