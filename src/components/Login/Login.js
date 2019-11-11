import React from "react";
import {connect} from "react-redux";
import {updateState, loginUser} from "../../redux/authReducer";
import "./Login.css"

class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            error: false
        }
    }

    handleUsernameChange = e => {
        this.props.updateState({username: e.target.value});
    }

    handlePasswordChange = e => {
        this.props.updateState({password: e.target.value});
    }

    clickLogin = e => {
        e.preventDefault();
        this.props.loginUser(this.props.username, this.props.password)
        .then(() => {
            this.props.history.push("/home")
        })
        .catch(() => {
            this.setState({error: true});
        })
    }

    goToRegister = () => {
        this.props.history.push("/")
    }

    

    render(){
        return (
            <div className="login_body">
            <div className="login_container">
                
                <div className="login_container_box">
                    <h3>Login</h3>
                    <form className="login_form"
                    type="submit"
                    onSubmit={this.clickLogin}
                    >
                        <input className="register_input"
                        placeholder="Username"
                        onChange={this.handleUsernameChange}
                        ></input>
                        <input className="register_input"
                        type="password"
                        placeholder="Password"
                        onChange={this.handlePasswordChange}
                        ></input>
                        <button className="login_button" onClick={this.clickLogin}>Login</button>
                        <p>Don't have an account?</p>
                        <p onClick={this.goToRegister} className="register_link">Click Here</p>
                    </form>
                    {this.state.error === true ? (
                        <div>Wrong username or password.</div>
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
        password: state.authReducer.password
    }
}

export default connect(mapStateToProps, {updateState, loginUser})(Login); 