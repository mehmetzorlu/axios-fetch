import React from 'react';

const Posts = ({posts, deletePost}) => {
    const postList = posts.length ? (
        posts.map(post => {
            return (
                 <div className="col s12 m6 l3" key={post.id}>
                    <div className="card blue-grey darken-1 small">
                        <div className="card-content white-text">
                            <span className="card-title">{post.title}</span>
                            <p>{post.body}</p>
                        </div>
                        <div className="card-action">
                            <button className="waves-effect waves-light btn" id={post.id} onClick={(e) => {deletePost(Number(e.target.id))}}>Delete</button>
                        </div>
                    </div>
                </div>
            )
        })
    ) : (
        <p className="center">There is no posts!</p>
    );    

    return (
        <div className="collection">
            <div className="row">
            {postList}
            </div>  
        </div>
    );
}

export default Posts;