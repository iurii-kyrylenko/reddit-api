import rootReducer from './reducers'
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from './actions'

describe('root reducer', () => {
  it('shoult return default state', () => {
    const newState = rootReducer(undefined, {})
    const expectedState = {
      selectedSubreddit: 'reactjs',
      postsBySubreddit: {}
    }
    expect(newState).toEqual(expectedState)
  })

  it('should select subreddit', () => {
    const state = {
      selectedSubreddit: 'reactjs',
      postsBySubreddit: {}
    }
    const newState = rootReducer(state, {
      type: SELECT_SUBREDDIT,
      subreddit: "test"
    })
    const expectedState = {
      selectedSubreddit: 'test',
      postsBySubreddit: {}
    }
    expect(newState).toEqual(expectedState)
  })

  it('should invalidate subreddit', () => {
    const state = {
      selectedSubreddit: 'test',
      postsBySubreddit: {
        test: {
          isFetching: false,
          didInvalidate: false,
          items: []
        }
      }
    }
    const newState = rootReducer(state, {
      type: INVALIDATE_SUBREDDIT,
      subreddit: "test"
    })
    const expectedState = {
      selectedSubreddit: 'test',
      postsBySubreddit: {
        test: {
          isFetching: false,
          didInvalidate: true,
          items: []
        }
      }
    }
    expect(newState).toEqual(expectedState)
  })

  it('should request posts', () => {
    const state = {
      selectedSubreddit: 'test',
      postsBySubreddit: {
        test: {
          isFetching: false,
          didInvalidate: true,
          items: []
        }
      }
    }
    const newState = rootReducer(state, {
      type: REQUEST_POSTS,
      subreddit: "test"
    })
    const expectedState = {
      selectedSubreddit: 'test',
      postsBySubreddit: {
        test: {
          isFetching: true,
          didInvalidate: false,
          items: []
        }
      }
    }
    expect(newState).toEqual(expectedState)
  })

  it('should receive posts', () => {
    const state = {
      selectedSubreddit: 'test',
      postsBySubreddit: {
        test: {
          isFetching: true,
          didInvalidate: true,
          items: []
        }
      }
    }
    const newState = rootReducer(state, {
      type: RECEIVE_POSTS,
      subreddit: "test",
      posts: [1,2,3],
      receivedAt: 42
    })
    const expectedState = {
      selectedSubreddit: 'test',
      postsBySubreddit: {
        test: {
          isFetching: false,
          didInvalidate: false,
          lastUpdated: 42,
          items: [1,2,3]
        }
      }
    }
    expect(newState).toEqual(expectedState)
  })
})
