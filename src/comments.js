import React from 'react';
import './App.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

class Post  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            host_comments: "https://jsonplaceholder.typicode.com/comments?postId=",
            comments: [],
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if((nextProps.id !== this.props.id)){
            this.getComments(nextProps.id);
        }
    }

    getComments (id) {
        axios.get(this.state.host_comments+id).then((res) => {
            this.setState({
                comments: res.data,
            });
            console.log('COMMENTS', this.state.comments)
        });
    }

    closeModal = () => {
        this.props.closeModal(false);
        this.setState(({
            comments: [],
         }))
    }

    render () {
        return (
            <div>
                <Modal isOpen={this.props.isOpen}  >
                    <ModalHeader className="modal-header col-12">
                        COMMENTS
                    </ModalHeader>
                    <ModalBody>
                        <table class="">
                            <tr>                  
                                <th>POSTID</th>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>BODY</th>
                            </tr>
                            {this.state.comments.map((comment,index) =>                   
                                <tr key={index}>
                                    <td>{comment.postId}</td>
                                    <td>{comment.id}</td>
                                    <td>{comment.name}</td>
                                    <td>{comment.email}</td>
                                    <td>{comment.body}</td>
                                </tr>
                            )}
                        </table>
                            <ModalFooter>
                                <Button color="danger" onClick={this.closeModal}>Cerrar</Button>{' '}
                            </ModalFooter>
                    </ModalBody>
                </Modal>
                
            </div>
        )
    }
}
export default Post;