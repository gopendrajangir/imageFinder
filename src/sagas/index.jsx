import { takeLatest, put, call, select } from 'redux-saga/effects';

export const FETCHING_IMAGE = 'FETCHING_IMAGE';
export const FETCH_IMAGE_SUCCESS = 'FETCH_IMAGE_SUCCESS';
export const FETCH_IMAGE_FAILED = 'FETCH_IMAGE_FAILED';

function* fetchHelper(keyword) {
  
  yield put({type: FETCHING_IMAGE});
  
  try {
    
    const response = yield call(fetch, `https://source.unsplash.com/featured/?${keyword}`);
    const currentState = yield select();
    const currentImages = currentState.data.prevImages;
    
    for(const url of currentImages) {
      if(url == response.url) {
        yield call(fetchHelper, keyword);
        return;
      }
    }
    
    yield put({type: FETCH_IMAGE_SUCCESS, url: response.url});
    
  } catch(err) {
    yield put({type: FETCH_IMAGE_FAILED, err}); 
  }
  
}

function* fetchImage( { keyword, number } ) {
  
  for(let i = 0; i< number; i++) {
    yield call(fetchHelper, keyword);
  }

}

function* addImage( { url } ) {
  
  yield put( { type: 'ADD_REMOVE_IMAGE', url } );

}

function* removeSearches() {
  
  yield put( { type: 'REMOVE_ALL_SEARCHES'} );

}

function* removeSelected( { selected } ) {
  
  yield put( { type: 'REMOVE_ALL_SELECTED', selected } );
  yield put( { type: 'REMOVE_ALL_FROM_SELECTED'} );

}

export function* rootSaga() {

  yield takeLatest('FETCH_IMAGE', fetchImage);
  yield takeLatest('ADD_REMOVE', addImage);
  yield takeLatest('REMOVE_SEARCHES', removeSearches);
  yield takeLatest('REMOVE_SELECTED', removeSelected);

}