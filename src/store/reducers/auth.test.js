import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    }
  })
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should store the token at login', () => {
    expect(reducer(initialState, 
      { type: actionTypes.AUTH_SUCCESS,
        token: 'some-token',
        userId: 'some-user-id'
      })).toEqual({
        token: 'some-token',
        userId: 'some-user-id',
        error: null,
        loading: false,
        authRedirectPath: '/'
      })
  })

})