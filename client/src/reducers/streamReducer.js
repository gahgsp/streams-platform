import _ from 'lodash';
import { CREATE_STREAM, DELETE_STREAM, EDIT_STREAM, FETCH_STREAM, FETCH_STREAMS } from '../actions/types';

export const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      // mapKeys will take an array and convert to an object
      // using as key the value passed as the second parameter.
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      // Omit removes the element with the given key and returns
      // a new state array.
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
