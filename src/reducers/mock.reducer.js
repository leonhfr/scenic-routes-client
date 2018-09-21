import { mockConstants } from '../constants/mock.constants';
const defaultState = { quote: '' };

export default (state = defaultState, action) => {
  switch (action.type) {
    case mockConstants.CHUCK_GET_SUCCESS:
    return {
      ...state,
      quote: action.data.value.joke
    }
      
    default:
      return state;
  }
}