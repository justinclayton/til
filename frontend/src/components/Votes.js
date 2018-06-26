import React, { Component } from 'react';

export default class Votes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localVotes: 0,
    };

    this.incrementVote = this.incrementVote.bind(this);
    this.decrementVote = this.decrementVote.bind(this);
  }

  incrementVote() {
    let increasedLocalVotes = this.state.localVotes + 1;
    this.setState({ localVotes: increasedLocalVotes });

    fetch(
      `https://3b08iupwp6.execute-api.us-west-2.amazonaws.com/Prod/posts/${
        this.props.id
      }/vote`,
      {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      },
    )
      .then(response => response.json())
      .then(json => console.log('Posted vote successfully', json));
  }

  decrementVote() {
    let decreasedLocalVotes = this.state.localVotes - 1;
    this.setState({ localVotes: decreasedLocalVotes });
    fetch(
      `https://3b08iupwp6.execute-api.us-west-2.amazonaws.com/Prod/posts/${
        this.props.id
      }/vote`,
      {
        mode: 'cors',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      },
    )
      .then(response => response.json())
      .then(json => console.log('Deleted vote successfully', json));
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ localVotes: 0 });
  }

  render() {
    return (
      <div class="row">
        <div class="col-sm-3">
          Votes:{' '}
          <a class="card-link">{this.props.votes + this.state.localVotes} </a>
          <a onClick={this.incrementVote} class="card-vote">
            <i class="fas fa-thumbs-up" />
          </a>
          &nbsp;&nbsp;
          <a onClick={this.decrementVote} class="card-vote">
            <i class="fas fa-thumbs-down" />
          </a>
        </div>
      </div>
    );
  }
}
