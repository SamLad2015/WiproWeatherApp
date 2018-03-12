import { fromJS } from 'immutable';

let initialState = fromJS({
    location: '',
    date: '',
    data: {},
    dates: [],
    selected: {
        date: '',
        time: ''
    }
});

export default function mainReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_LOCATION':
            return state.set('location', action.location);
        case 'SET_DATA':
            return state.set('data', fromJS(action.data));
        case 'SET_DATES':
            return state.set('dates', fromJS(action.dates));
        case 'SET_SELECTED_DATE':
            return state.setIn(['selected', 'date'], action.date);
        case 'SET_SELECTED_TIME':
            return state.setIn(['selected', 'time'], action.time);
        default:
            return state;
    }
}
