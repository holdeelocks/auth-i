import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';
import axios from 'axios';

import UserList from '../components/UserList';
import Header from '../components/Header';
import LoginRegister from '../components/LoginRegister';

class AppView extends Component {
	state = {
		showModal: false,
		loggedIn: false,
		users: []
	};

	async componentDidMount() {
		try {
			const userList = await axios.get('https://auth-holden.herokuapp.com/api/restricted/users', {
				withCredentials: true
			});

			this.setState({ users: userList.data });
		} catch (err) {
			console.log(err);
		}
	}

	login = users => {
		this.setState({ loggedIn: true, users });
	};

	toggle = () => {
		this.setState({
			showModal: !this.state.showModal
		});
	};

	logout = async e => {
		e.preventDefault();
		try {
			const logout = await axios.get('https://auth-holden.herokuapp.com/api/login/end', {
				withCredentials: true
			});
			this.setState({ loggedIn: false, users: [] });
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		const { showModal, loggedIn, users } = this.state;
		return (
			<div className="App">
				<Header onClick={this.toggle} />
				<h2>Welcome to the Frontend Auth App</h2>
				{!loggedIn && (
					<div>
						{!showModal && users.length === 0 && (
							<Link to="login">
								<Button color="primary" onClick={this.toggle}>
									Login
								</Button>
							</Link>
						)}
					</div>
				)}

				{users.length !== 0 && <Button onClick={this.logout}>Logout</Button>}

				<Route
					path="/login"
					render={props => (
						<LoginRegister {...props} toggle={this.toggle} modal={showModal} login={this.login} />
					)}
				/>
				<Route path="/users" render={props => <UserList {...props} users={users} />} />
			</div>
		);
	}
}

export default withRouter(AppView);
