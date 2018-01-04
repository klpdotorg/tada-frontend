import { without } from 'lodash';

import { COLLAPSED_PROGRAM_ENTITY, UNCOLLAPSED_PROGRAM_ENTITY } from '../actions/types';

const INITIAL_STATE = {
  programDetails: {
    1: {
      id: 1,
      name: 'admin1_name',
      boundaries: {
        2: {
          id: 2,
          name: 'admin2_name',
          boundaries: {
            3: {
              id: 3,
              name: 'admin3_name',
              institutions: {
                4: {
                  id: 4,
                  name: 'institution_name',
                  assessments: {
                    5: {
                      id: 5,
                      name: 'assessment_name',
                    },
                    6: {
                      id: 6,
                      name: 'assessment_name 2',
                    },
                  },
                },
                7: {
                  id: 7,
                  name: 'institution_name 2',
                  assessments: {
                    8: {
                      id: 8,
                      name: 'assessment_name',
                    },
                    9: {
                      id: 9,
                      name: 'assessment_name 2',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  uncollapsedEntities: [],
};

const ProgramDetails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COLLAPSED_PROGRAM_ENTITY:
      return {
        ...state,
        uncollapsedEntities: without(state.uncollapsedEntities, action.value),
      };
    case UNCOLLAPSED_PROGRAM_ENTITY:
      return {
        ...state,
        uncollapsedEntities: [...state.uncollapsedEntities, action.value],
      };
    default:
      return state;
  }
};

export { ProgramDetails };
