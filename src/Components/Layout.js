import React, { Component } from 'react';
import io from 'socket.io-client'
import { USER_CONNECTED, LOGOUT, VERIFY_USER } from '../Events'
import ChatContainer from './chats/ChatContainer'

// Path/variable needs to be set in Heroku env 
const socketUrl = process.env.REACT_APP_URL_VAR

export default class Layout extends Component {
	
	constructor(props) {
	  super(props);
		
	  this.state = {
		  socket:null,
		  user:null,
		  error:""
	  };

	}

	componentWillMount() {
		this.initSocket()
	}

	/*
	*	Connect to and initializes the socket.
	*/
	initSocket = ()=>{
		const socket = io(socketUrl)
		socket.on('connect', this.reInitialize)	
		socket.emit(VERIFY_USER, localStorage.getItem('nickname'), ({user, isUser})=> {
			//TODO: some error handling if isUser is not true 
			if(!isUser){
				this.setState({ user, socket })
				socket.emit(USER_CONNECTED, user);
			}else{
				this.setState({ user:null, socket, error:"No Socket" })
			}
		})

	}
	
	// Reconnects user if needed
	reInitialize = ()=>{
		const { socket, user } = this.state
		if(user){
			socket.emit(VERIFY_USER, user.name, ({isUser, user})=>{ 
				if(isUser)
					this.setState({user:null})
				else 
					this.setState({user})
			})				
		}
	}

	/*
	*	Sets the user property in state to null.
	*/
	logout = ()=>{
		const { socket } = this.state
		socket.emit(LOGOUT)
		this.setState({ user:null })
		this.props.auth.logout()

	}

	goTo(route) {
		this.props.history.replace(`/${route}`)
	  }

	login() {
		this.props.auth.login()
	  }

	render() {
		const { socket, user } = this.state
		const { isAuthenticated } = this.props.auth

		return (
			<div className="container">
				{
					!user ?	
					<div>You got no user</div>
					:
					isAuthenticated() &&
					<ChatContainer socket={socket} user={user} logout={this.logout}/>
				}
			</div>
		);
	}
}
