import configStore from './store'
import { fetchPostsIfNeeded } from './actions'
import nock from 'nock'

describe('store', () => {
  afterAll(() => {
    nock.cleanAll()
  })

  nock('https://www.reddit.com/r')
  .get(`/reactjs.json`)
  .reply(200, { data: { children: [{ data:1 }, { data:2 }, { data:3 }] } })

  it('trying', () => {
    const store = configStore({})
    return store.dispatch(fetchPostsIfNeeded('reactjs'))
    .then(() => {
      expect(store.getState().postsBySubreddit.reactjs.items).toEqual([1,2,3])
    })
  })
})
