import {
  FETCH_WRITING_LIST_REQUEST, FETCH_WRITING_LIST_SUCCESS, FETCH_WRITING_LIST_FAILURE,
  FETCH_WRITING_REQUEST,      FETCH_WRITING_SUCCESS,      FETCH_WRITING_FAILURE,
  CREATE_WRITING_REQUEST,     CREATE_WRITING_SUCCESS,     CREATE_WRITING_FAILURE,
  UPDATE_WRITING_REQUEST,     UPDATE_WRITING_SUCCESS,     UPDATE_WRITING_FAILURE,
  DELETE_WRITING_REQUEST,     DELETE_WRITING_SUCCESS,     DELETE_WRITING_FAILURE
} from '../constants/ActionType'

const initWritingState = {
  list: [],
  selected: undefined,
  lastActionType: undefined
}

function isValidActionType (lastActionType, actionType) {
  let validTypes = {}
  //         last action type               available current action types
  validTypes[FETCH_WRITING_LIST_REQUEST] = [FETCH_WRITING_LIST_SUCCESS];
  validTypes[FETCH_WRITING_REQUEST]      = [FETCH_WRITING_SUCCESS];
  validTypes[CREATE_WRITING_REQUEST]     = [CREATE_WRITING_SUCCESS];
  validTypes[UPDATE_WRITING_REQUEST]     = [UPDATE_WRITING_SUCCESS];
  validTypes[DELETE_WRITING_REQUEST]     = [DELETE_WRITING_SUCCESS];

  return validTypes[lastActionType] && 
         validTypes[lastActionType].indexOf(actionType) !== -1
}

export function writings (state = initWritingState, action) {
  if(!isValidActionType(state.lastActionType, action.type)) {
    return Object.assign({}, state, {
      lastActionType: action.type
    })
  }

  switch (action.type) {
  case FETCH_WRITING_LIST_SUCCESS:
    const { list, page, totalPage } = action.writings
    return Object.assign({}, state, {
      list,
      page,
      totalPage,
      selected: undefined,
      lastActionType: action.type
    })

  case FETCH_WRITING_SUCCESS:
  case CREATE_WRITING_SUCCESS:
  case UPDATE_WRITING_SUCCESS:
  case DELETE_WRITING_SUCCESS:
    const { selected } = action.writings
    return Object.assign({}, state, {
      selected,
      list: undefined,
      lastActionType: action.type
    })

  default:
    return Object.assign({}, state, {
      lastActionType: action.type
    })
  }
}
