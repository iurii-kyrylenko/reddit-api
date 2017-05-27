import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import * as actions from './actions'

describe('actions', () => {
  it('should create an action to select subreddit', () => {
    const subreddit = "test"
    const expectedAction = {
      type: actions.SELECT_SUBREDDIT,
      subreddit
    }
    expect(actions.selectSubreddit(subreddit)).toEqual(expectedAction)
  })

  it('should create an action to invalidat subreddit', () => {
    const subreddit = "test"
    const expectedAction = {
      type: actions.INVALIDATE_SUBREDDIT,
      subreddit
    }
    expect(actions.invalidateSubreddit(subreddit)).toEqual(expectedAction)
  })
})

describe('fetch post', () => {
  const mockStore = configureMockStore([thunk])
  const subreddit = "test"

  afterAll(() => {
    nock.cleanAll()
  })

  nock('https://www.reddit.com/r')
  .get(`/${subreddit}.json`)
  .reply(200, { data: { children: [] } })

  it('should dispatch REQUEST_POSTS and RECEIVE_POSTS if needed', () => {
    const store = mockStore({
      postsBySubreddit: {
        [subreddit]: {
          isFetching: false,
          didInvalidate: true
        }
      }
    })

    const expectedActionTypes = [
      actions.REQUEST_POSTS,
      actions.RECEIVE_POSTS
    ]

    return store.dispatch(actions.fetchPostsIfNeeded(subreddit))
    .then(() => {
      const actionTypes = store.getActions().map(a => a.type)
      expect(actionTypes).toEqual(expectedActionTypes)
    })
  })
})

