import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Col, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

class LoginRegister extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  onSubmit = async e => {
    e.preventDefault();
    // const user = { email: this.state.email, password: this.state.password };
    const loggedIn = await axios.post("http://localhost:5000/api/login", { ...this.state });
    // console.log(loggedIn);
    if (loggedIn) {
      this.props.login(loggedIn.data.cookie);
      this.props.toggle();
      this.props.history.push("/");
    }
    // axios
    //   .post("/api/login", { ...this.state })
    //   .then(res => {
    //     console.log(res.data);
    //     this.setState({ loggedIn: res.data });
    //   })
    //   .catch(err => console.log(err));
  };

  render() {
    const { email, password } = this.state;
    // console.log(this.props.modal);

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
