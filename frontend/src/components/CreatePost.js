import gql from 'graphql-tag';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import POSTS_QUERY from './PostList';

class CreatePost extends Component {
  state = {
    content: '',
  };

  render() {
    return (
      <div className="position-fixed" />
      // <div className="jumbotron">
      //   <div className="row justify-content-center">
      //     <div className="col-6">
      //       <h1 className="display-4">Today I Learned...</h1>
      //     </div>
      //     <div className="col-6">
      //       <input
      //         className="form-group"
      //         value={this.state.content}
      //         onChange={e => this.setState({ content: e.target.value })}
      //         type="text"
      //         placeholder="What have you learned today?"
      //       />
      //     </div>
      //     <button
      //       className="form-control btn btn-primary"
      //       onClick={() => this._createPost()}
      //     >
      //       Submit
      //     </button>
      //   </div>
      // </div>
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
