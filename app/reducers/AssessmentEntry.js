import {
  SET_ASSESSMENT_ENTRY_STUDENTS,
  SET_ASSESSMENT_ENTRY_QUESTIONS,
  SET_ASSESSMENT_ENTRY_ANSWERS,
  RESET_ASSESSMENTR_ENTRY,
} from '../actions/types';

const INITIAL_STATE = {
  answers: { 563: 0, 562: 1, 561: 0, 560: 1, 559: 1, 558: 1, 557: 0, 556: 1, 555: 0, 554: 0 },
  students: [
    {
      id: 3,
      first_name: 'Suraj',
      middle_name: '',
      last_name: 'Thakur',
      uid: '',
      dob: '2008-01-01',
      gender: 'male',
      mt: 'kan',
      status: 'AC',
      institution: 33205,
    },
    {
      id: 2,
      first_name: 'Pankaj',
      middle_name: '',
      last_name: 'Thakur',
      uid: '',
      dob: '2009-01-01',
      gender: 'male',
      mt: 'kan',
      status: 'AC',
      institution: 33205,
    },
  ],
  questions: [
    {
      question_text: 'walls',
      display_text: ' Has Walls Intact',
      key: 'Basic Infrastructure',
      question_type: null,
      options: null,
      is_featured: true,
      status: 'IA',
      id: 563,
    },
    {
      question_text: 'waste_basket',
      display_text: ' Has Waste Baskets',
      key: 'Basic Infrastructure',
      question_type: null,
      options: null,
      is_featured: true,
      status: 'IA',
      id: 562,
    },
    {
      question_text: 'progress',
      display_text: ' Maintains Progress Records for Children',
      key: 'Learning Environment',
      question_type: null,
      options: null,
      is_featured: true,
      status: 'IA',
      id: 561,
    },
    {
      question_text: 'drinking_water',
      display_text: ' Has Drinking Water Facilities',
      key: 'Nutrition and Hygiene',
      question_type: null,
      options: null,
      is_featured: true,
      status: 'IA',
      id: 560,
    },
    {
      question_text: 'bvs',
      display_text: ' Has Functional Bal Vikas Samithis',
      key: 'Community Involvement',
      question_type: null,
      options: null,
      is_featured: true,
      status: 'IA',
      id: 559,
    },
    {
      question_text: 'space',
      display_text: ' Has Spacious Classrooms and Play Isas',
      key: 'Basic Infrastructure',
      question_type: null,
      options: null,
      is_featured: true,
      status: 'IA',
      id: 558,
    },
    {
      question_text: 'toilet_usable',
      display_text: ' Has Usable Toilets',
      key: 'Toilet Facilities',
      question_type: null,
      options: null,
      is_featured: true,
      status: 'IA',
      id: 557,
    },
    {
      question_text: 'roof',
      display_text: ' Has Roofs Intact',
      key: 'Basic Infrastructure',
      question_type: null,
      options: null,
      is_featured: true,
      status: 'IA',
      id: 556,
    },
    {
      question_text: 'handwash',
      display_text: ' Has Handwash Facilities',
      key: 'Nutrition and Hygiene',
      question_type: null,
      options: null,
      is_featured: true,
      status: 'IA',
      id: 555,
    },
    {
      question_text: 'water_supply',
      display_text: ' Has Water Supply',
      key: 'Basic Infrastructure',
      question_type: null,
      options: null,
      is_featured: true,
      status: 'IA',
      id: 554,
    },
  ],
};

const AssessmentEntry = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ASSESSMENT_ENTRY_STUDENTS:
      return {
        ...state,
        students: [...state.students, ...[action.value]],
      };
    case SET_ASSESSMENT_ENTRY_QUESTIONS:
      return {
        ...state,
        questions: action.value,
      };
    case SET_ASSESSMENT_ENTRY_ANSWERS:
      return {
        ...state,
        answers: action.value,
      };
    case RESET_ASSESSMENTR_ENTRY:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { AssessmentEntry };
