import uuid from 'uuid/v1';
import {
  WS_CONN_START,
  WS_CONN_OK,
  WS_CONN_STOP,
  WS_CONN_END,
  WS_CONN_ERR,
  WS_SEND_MSG,
  WS_RECV_MSG
} from '../actions/wsActions';

const initialState = {
  url: null,
  connected: false,
  messages: [],
  uuid: null
}

export function connection(state = initialState, action) {
  switch(action.type) {
    case WS_CONN_START:
      return Object.assign({}, state, {
        url: action.url
      });
    case WS_CONN_OK:
      return Object.assign({}, state, {
        connected: true,
        uuid: uuid()
      });
    case WS_CONN_END:
    case WS_CONN_ERR:
      return Object.assign({}, state, {
        url: null,
        connected: false
      });
    case WS_RECV_MSG:
      return Object.assign({}, state, {
        messages: [...state.messages, action.payload]
      });
    default:
      return state;
  }
}
