import gql from 'graphql-tag';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';

class Post extends Component {
  render() {
    return (
      <div className="p-3">
        <div className="card">
          <div className="card-body">
            <header className="card-header">
              <span className="card-title">Today I learned...</span>
            </header>
            <p className="card-text">{this.props.post.content}</p>
            <div className="row">
              <div className="col-sm-3">
                <a onClick={this._voteForPost} className="btn btn-primary card-vote">
                  {this.props.post.votes}
                </a>
              </div>
            </div>
            <small className="text-muted">
              {new Date(this.props.post.createdAt).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </small>
          </div>
        </div>
      </div>
    );
  }

  _voteForPost = async () => {
    const postId = this.props.post.id;
    console.log(`VOTING FOR ${postId}`);
    try {
      await this.props.voteMutation({
        variables: { id: postId },
        options: {
          update: (store, data) => {
            const id = data.incrementVoteForPost.id;
            const votes = data.incrementVoteForPost.votes;
            this.props.updateStoreAfterVote(store, id, votes);
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
}

const VOTE_MUTATION = gql`
  mutation incrementVoteForPost($id: ID!) {
    incrementVoteForPost(id: $id) {
      __typename
      id
      votes
    }
  }
`;

export default graphql(VOTE_MUTATION, { name: 'voteMutation' })(Post);

// export default Post;
