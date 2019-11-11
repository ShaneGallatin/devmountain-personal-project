import React from "react";
import {connect} from "react-redux";
import {updateState} from "../../redux/authReducer"
import "./Register.css"
import axios from "axios";

class Register extends React.Component {
    constructor(){
        super();
        this.state = {
            error: false
        }
    }
    
    handleUsernameChange = e => {
        this.props.updateState({username: e.target.value}) 
    }

    handlePasswordChange = e => {
        this.props.updateState({password: e.target.value});
    }

    handleEmailChange = e => {
        this.props.updateState({email: e.target.value});
    }

    goToLogin = () => {
        this.props.history.push("/login");
    }

    handleRegister = e => {
        e.preventDefault();
        axios.post("/auth/register", {
            username: this.props.username,
            password: this.props.password,
            email: this.props.email
        })
        .then(() => {
            this.props.history.push("/login");
        })
        .catch(() => {
            this.setState({error: true});
        })
    }

    render(){
        return (
            <div className="register_body">
            <div className="register_container">
                
                <div className="register_container_box">
                    <h3>Registration</h3>
                    <form
                        className="register_form"
                        type="submit"
                        onSubmit={this.handleRegister}
                    >
                        <input 
                            className="register_input"
                            placeholder="Username"
                            onChange={this.handleUsernameChange}
                        ></input>
                        <input
                            className="register_input"
                            type="password"
                            placeholder="Password"
                            onChange={this.handlePasswordChange}
                        ></input>
                        <input
                            className="register_input"
                            placeholder="Email"
                            onChange={this.handleEmailChange}
                        ></input>
                        <button className="register_button" onClick={this.handleRegister}>Register!</button>
                        <p>Already have an account?</p>
                        <p onClick={this.goToLogin} className="login_link">Click Here</p>
                    </form>
                    {this.state.error === true ? (
                        <div>Username taken. Please try another</div>
                    ) : null} 
                </div>
            </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.authReducer.username,
        password: state.authReducer.password,
        email: state.authReducer.email
    }
}

export default connect(mapStateToProps, {updateState})(Register) 