import React, {Component} from 'react';
import io from 'socket.io-client';
import {USER_CONNECTED, LOGOUT} from '../Events';
import LoginForm from './loginForm';
import ChatContainer from './chat/ChatContainer';

const socketURL = "http://172.31.98.32:3001/"

export default class Layout extends Component {
    constructor(props){
        super(props);

        this.state={
            socket: '',
            user: '',
        }
    }

    componentWillMount(){
        this.initSocket();
    }

    initSocket = () => {
        const socket = io(socketURL)
        socket.on('connect', ()=>{
            console.log("Socket connected")
        })

        this.setState({socket})
    }

    setUser = (user)=>{
        const {socket} = this.state
        socket.emit(USER_CONNECTED, user);
        this.setState({user})
    }
    logout = () =>{
        const {socket} = this.state
        socket.emit(LOGOUT)
        this.setState({user: null})
    }


    render() {
        const {title} = this.props
        const {socket, user} = this.state
        return(
            <div className="container">
                { ! user ?
                <LoginForm socket={socket} setUser={this.setUser}/>
                : 
                <ChatContainer socket={socket} user={user} logout={this.logout}/>
                }</div>
        )
    }
}