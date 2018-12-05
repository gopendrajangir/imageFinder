const initialState = {
  selected: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_REMOVE_IMAGE':
      if(state.selected.includes(action.url)) {
        state.selected.splice(state.selected.indexOf(action.url), 1);
        return {
          selected: [...state.selected]
        }
      } else {
        return {
          selected: [...state.selected, action.url]
        }
      }
    case 'REMOVE_ALL_SEARCHES':
      return {
        selected: []
      }
    case 'REMOVE_ALL_FROM_SELECTED':
      return {
        selected: []
      }
    default:
      return {
        selected: [...state.selected]
      };
  }
}