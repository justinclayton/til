import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import CreatePost from './CreatePost';
import PostList from './PostList';

// const authToken = localStorage.getItem(AUTH_TOKEN);

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-dark navbar-expand-md bg-dark">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <Link to="/new" className="navbar-brand">
          New
        </Link>
      </nav>
    </header>
  );
};

class App extends Component {
  state = {
    posts: '',
  };

  render() {
    return (
      <div className="bg-secondary">
        <main className="container" role="main">
          <div className="col-xs-3" />
          <div className="App container-fluid col-xs-6">
            <CreatePost />
            <PostList />
          </div>
          <div className="col-xs-3" />
        </main>
      </div>
    );
  }
}

// export default App;
export default App;
