import { FETCHING_IMAGE } from '../sagas/index';
import { FETCH_IMAGE_SUCCESS } from '../sagas/index';
import { FETCH_IMAGE_FAILED } from '../sagas/index';

import _ from 'lodash';

const initialState = {
  isLoading: false,
  error: null,
  prevImages: [],
  nextImages: [],
  url: null
}

function imagesReducer(state = initialState, action) {
  
  switch(action.type) {
    case FETCHING_IMAGE:
      return {
        isLoading: true,
        error: null,
        prevImages: [...state.nextImages],
        nextImages: [...state.nextImages],
        url: null
      }
      case FETCH_IMAGE_SUCCESS:
      return {
        isLoading: false,
        error: null,
        prevImages: [...state.nextImages],
        nextImages: [...state.nextImages, action.url],
        url: action.url
      }
      case FETCH_IMAGE_FAILED: 
      return {
        isLoading: false,
        error: action.error,
        prevImages: [...state.nextImages],
        nextImages: [...state.nextImages],
        url: null
      }
      case 'REMOVE_ALL_SEARCHES':
      return {
        isLoading: false,
        error: null,
        prevImages: [],
        nextImages: [],
        url: null
      }
      case 'REMOVE_ALL_SELECTED':
      var newImages = _.difference(state.nextImages, action.selected);
      return {
        isLoading: false,
        error: null,
        prevImages: [...newImages],
        nextImages: [...newImages],
        url: null
      }
    default :
      return state;
  }
}

export default imagesReducer;