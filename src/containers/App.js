import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../state/actions'
import Posts from '../components/Posts'
import Picker from '../components/Picker'

class App extends Component {
  constructor (props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
  }

  componentDidMount () {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  handleSelect (subreddit) {
    const { dispatch } = this.props
    dispatch(selectSubreddit(subreddit))
    dispatch(fetchPostsIfNeeded(subreddit))
  }

  handleRefresh (e) {
    e.preventDefault()
    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  render() {
    const { posts, selectedSubreddit } = this.props
    const showPosts = posts && posts.length ? true : null
    return (
      <div>
        <Picker options={ ['reactjs', 'frontend', 'vuejs'] }
                value={ selectedSubreddit }
                onChange={ this.handleSelect }
        />
        {' | '}
        <a href="" onClick={ this.handleRefresh }>Refresh</a>
        { showPosts && <Posts posts={ posts } /> }
        { !showPosts && <div>Loading...</div> }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { selectedSubreddit, postsBySubreddit } = state
  const {
    items: posts,
    isFetching,
    lastUpdated
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }

  return ({
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  })
}

const AppHoc = connect(mapStateToProps)(App)
export default AppHoc

