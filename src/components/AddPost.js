import React, { Component } from 'react'

class AddPost extends Component {
    state= {
        title: '',
        body:''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    addPost = () => {
        this.props.addPost(this.state.title, this.state.body);

        this.setState({
            title: '',
            body: ''
        })
    }

    render() {
        return (
            <div className="container"  style={{ padding: 15}}>
                <div className="row" style={{ padding: 5, borderStyle: 'solid', borderColor: 'green' }}>
                    <form className="col s12" onSubmit={this.handleSubmit}>
                        <label>Title</label>
                        <input type="text" name="title" onChange={this.handleChange} value={this.state.title}></input>
                        <label>Body</label>
                        <input type="text" name="body" onChange={this.handleChange} value={this.state.body}></input>
                        <button className="waves-effect waves-light btn" onClick={() => this.addPost()}>Post</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddPost