import gql from 'graphql-tag';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import '../styles/components.css';
import POSTS_QUERY from './PostList';

class CreatePost extends Component {
  state = {
    content: '',
  };

  render() {
    return (
      <nav className="create-post">
        <h1 className="display-6">What did you learn today?</h1>
        <div className="form-group">
          <input
            className="form-control"
            value={this.state.content}
            onChange={e => this.setState({ content: e.target.value })}
            type="text"
            placeholder="e.g. (I learned to paint)"
          />
        </div>
        <button
          className="form-control btn btn-primary"
          onClick={() => this._createPost()}
        >
          Submit
        </button>
      </nav>
    );
  }

  _createPost = async () => {
    const { content } = this.state;
    console.log(`CREATING NEW POST WITH CONTENT: ${content}`);
    await this.props.postMutation({
      variables: {
        content,
      },
      update: (store, mutationResp) => {
        const newPost = mutationResp.data.createPost;
        const storeData = store.readQuery({ query: POSTS_QUERY });
        storeData.listPosts.items.splice(0, 0, newPost);
        store.writeQuery({ query: POSTS_QUERY, data: storeData });
      },
    });
  };
}

// 1
const POST_MUTATION = gql`
  mutation postMutation($content: String!) {
    createPost(input: { content: $content }) {
      __typename
      id
      createdAt
      content
      votes
    }
  }
`;

export default graphql(POST_MUTATION, { name: 'postMutation' })(CreatePost);
