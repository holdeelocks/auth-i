import React from 'react';
import axios from 'axios';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Col,
	Form,
	FormGroup,
	Label,
	Input
} from 'reactstrap';

class LoginRegister extends React.Component {
	state = {
		username: '',
		password: ''
	};

	handleChange = ({ target: { name, value } }) => {
		this.setState({ [name]: value });
	};

	onSubmit = async e => {
		e.preventDefault();
		try {
			const loggedIn = await axios.post(
				'https://auth-holden.herokuapp.com/api/login',
				{ ...this.state },
				{ withCredentials: true }
			);
			const userList = await axios.get('https://auth-holden.herokuapp.com/api/restricted/users', {
				withCredentials: true
			});
			this.props.login(userList.data);
			this.props.toggle();
			this.props.history.push('/users');
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		const { email, password } = this.state;

		return (
			<div>
				<Modal isOpen={this.props.modal}>
					<ModalHeader>Login or Register</ModalHeader>
					<ModalBody>
						<Form className="form">
							<Col>
								<FormGroup>
									<Label>username</Label>
									<Input
										type="text"
										name="username"
										placeholder="username"
										value={email}
										onChange={this.handleChange}
									/>
								</FormGroup>
							</Col>
							<Col>
								<FormGroup>
									<Label for="examplePassword">password</Label>
									<Input
										type="password"
										name="password"
										placeholder="********"
										value={password}
										onChange={this.handleChange}
									/>
								</FormGroup>
							</Col>
							<Button type="submit" color="primary" onClick={this.onSubmit}>
								Submit
							</Button>
							<Button color="secondary" onClick={this.props.toggle}>
								Cancel
							</Button>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

export default LoginRegister;
