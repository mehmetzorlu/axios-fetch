import React, { Component} from 'react';
import Posts from './components/Posts';
import AddPost from './components/AddPost';
import axios from 'axios';

class App extends Component {

  state =  {
    useAxios: true,
    posts: []
  };

  loadPostData() {
    if (this.state.useAxios) {
      console.log('load with axios');
      axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res => {
          this.setState({
            posts: res.data
          })
        });
    } else {
      console.log('load with fetch');
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(json => this.setState({
          posts: json
        }));
    }
  }

  componentDidMount(){
    this.loadPostData();
  }

  changeConnection = (e) => {
    this.setState({
      useAxios: !this.state.useAxios
    });
    
    //state is not change instantly, so wait a few ms, then load data with new method
    setTimeout(()=> {
       this.loadPostData();
    }, 250)
  }

  deletePost = (id) => {
    //delete on the server
    if (this.state.useAxios) {
      console.log('delete with axios');
      axios.delete('https://jsonplaceholder.typicode.com/posts/' + id)
      .then(res => console.log(res.data));
    } else {
      console.log('delete with fetch');
      fetch('https://jsonplaceholder.typicode.com/posts/' + id, { 
        method: 'delete'
      })
      .then(res => console.log(res.json()));
    }

    const posts = this.state.posts.filter(post => {
      return post.id !== id
    });

    this.setState({
      posts: posts
    });
  }


  addPost = (title, body) => {
    const post = {
      userId: 1,
      id: Math.random(),
      title : title,
      body: body
    }

    //post on the server
    if (this.state.useAxios) {
      console.log('post with axios');
      axios.post('https://jsonplaceholder.typicode.com/posts', post)
      .then(res => {
        console.log(res.data);
      });
    } else {
      console.log('post with fetch');
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(json => console.log(json));
    }

    this.setState({
      posts: [post, ...this.state.posts]
    });
  }

  render() {
    return (
      <div className="App" style={{ padding: 15}}>
        <h1>Posts</h1>

        <div className="switch">
            <label>
            Fetch
            <input type="checkbox" checked={this.state.useAxios} onChange={this.changeConnection} />
            <span className="lever"></span>
            Axios
            </label>
        </div>

        <AddPost addPost={this.addPost}/>

        <Posts posts={this.state.posts} deletePost={this.deletePost} />
      </div>
    );
  }
}

export default App;
