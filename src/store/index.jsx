import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer } from 'redux-form';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';
import { rootSaga } from '../sagas/index';
import createSagaMiddleware from 'redux-saga';
import imagesReducer from '../reducers/imagesReducer';
import addRemoveReducer from '../reducers/addRemoveReducer';

const reducers = combineReducers({  
  form: reducer,
  data: imagesReducer,
  selected: addRemoveReducer
});

const sagaMiddleware = createSagaMiddleware();

const middlewares = applyMiddleware(reduxPromise, logger, sagaMiddleware);

const store = createStore(reducers, {}, middlewares);

sagaMiddleware.run(rootSaga);

export default store;