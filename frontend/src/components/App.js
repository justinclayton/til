import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import CreatePost from './CreatePost';
import PostList from './PostList';

// const authToken = localStorage.getItem(AUTH_TOKEN);

class App extends Component {
  state = {
    posts: '',
  };

  render() {
    return (
      <div className="root">
        <aside>
          <CreatePost />
        </aside>
        <main role="main">
          <div className="App container-fluid">
            <PostList />
          </div>
        </main>
      </div>
    );
  }
}

// export default App;
export default App;
