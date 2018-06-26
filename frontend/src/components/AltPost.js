import gql from 'graphql-tag';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';

class Post extends Component {
  render() {
    return (
      <div className="row-md-4 p-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Today I Learned...</h5>
            <p className="card-text">{this.props.post.content}</p>
            <div className="row">
              <div className="col-sm-3">
                Votes: <a className="card-link">{this.props.post.votes}</a>
              </div>
              <div className="col-sm-3">
                <a onClick={this._voteForPost} className="card-vote">
                  +
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
        update: (store, data) => {
          this.props.updateStoreAfterVote(store, data, postId);
        },
      });
    } catch (e) {
      console.log('ZOMG ERROR');
      console.log(e);
    }
  };
}

const VOTE_MUTATION = gql`
  mutation incrementVoteForPost($id: ID!) {
    incrementVoteForPost(id: $id) {
      id
      votes
    }
  }
`;

export default graphql(VOTE_MUTATION, { name: 'voteMutation' })(Post);

// export default Post;
