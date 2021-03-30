import { createStore } from 'redux';
const initialState={
    childrens:{},
}

export const store = createStore(
    reducer,
    initialState,
  );

  function reducer(state, action) {
    return {
        childrens: action.payload || {}
    }
  }
