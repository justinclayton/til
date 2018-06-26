import gql from 'graphql-tag';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Post from './Post';

class PostList extends Component {
  render() {
    if (this.props.postsQuery && this.props.postsQuery.error) {
      return (
        <pre>
          {this.props.postsQuery.error.graphQLErrors.map(({ message }, i) => (
            <span key={i}>{message}</span>
          ))}
        </pre>
      );
    }
    if (this.props.postsQuery && this.props.postsQuery.loading) {
      return <div>Loading</div>;
    } else {
      const postsToRender = this.props.postsQuery.listPosts.items;

      return (
        <div className="Post-list col">
          {postsToRender.map(post => (
            <Post
              updateStoreAfterVote={this._updateStoreAfterVote}
              key={post.id}
              post={post}
            />
          ))}
        </div>
      );
    }
  }

  _updateStoreAfterVote = (store, id, votes) => {
    const storeData = store.readQuery({ query: POSTS_QUERY });

    const storedPost = storeData.listPosts.items.find(post => post.id === id);
    storedPost.votes = votes;

    store.writeQuery({ query: POSTS_QUERY, storeData });
  };
}

export const POSTS_QUERY = gql`
  query listPosts {
    listPosts {
      items {
        __typename
        id
        content
        createdAt
        votes
      }
    }
  }
`;

export default graphql(POSTS_QUERY, {
  name: 'postsQuery',
  options: { errorPolicy: 'all' },
})(PostList);
