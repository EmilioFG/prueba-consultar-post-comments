import React from 'react';
import './App.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Comments from './comments.js';

class Post  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            host_post: "https://jsonplaceholder.typicode.com/posts",
            posts: [],
            showComments: false,
            id: null,
        }
    }

    componentDidMount () {
        this.getPosts();
    }

    getPosts () {
        axios.get(this.state.host_post).then((res) => {
            this.setState({
                posts: res.data,
            });
            console.log('POSTS', this.state.posts)
        });
    }

    closeModal = () => {
        this.setState(({
            showComments: false,
            id: null,
        }));
    }

    render () {
        return (
            <div>
                <h1>Posts</h1>
                <table className="table-striped">
                    <tr>                  
                      <th>USER</th>
                      <th>ID</th>
                      <th>TITLE</th>
                      <th>BODY</th>
                      <th>COMMENTS</th>
                    </tr>
                    {this.state.posts.map((post,index) =>                   
                        <tr key={index} className="table-active">
                            <td>{post.userId}</td>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                            <td>
                                <button type="button" className="btn btn-success"
                                        style={{cursor: 'pointer'}}
                                        title="Comments"
                                        onClick={(e,row)=>this.setState(({ showComments: true, id: post.id }))}
                                        index={index} >
                                </button>
                            </td>
                        </tr>
                    )}
                </table>
                <Comments 
                    {...this.props}
                    isOpen={this.state.showComments}
                    id={this.state.id}
                    closeModal={this.closeModal}
                />
            </div>
        )
    }
}
export default Post;