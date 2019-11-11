import React from "react";
import "./Header.css";
import {logoutUser} from "../../redux/authReducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import logo from "./vinyl_illustration.png";

class Header extends React.Component {
    constructor(){
        super();
        this.state = {

        }
    }
    clickLogout = () => {
        
        this.props.logoutUser()
        .then(() => {
            this.props.history.push("/")
        })
        .catch((err) => {
             console.log(err);
        })
    }

    clickCart = () => {
        this.props.history.push("/cart")
    }

    clickListings = () => {
        this.props.history.push("/listings")
    }

    clickLogo = () => {
        this.props.history.push("/home")
    }

    render(){

        return (
            <div className="header_container">
                <ul>
                    <div>
                        <img src={logo} className="site_logo" alt="site_logo" onClick={this.clickLogo}/>
                    </div>
                    <div className="nav_links">
                        <li onClick={this.clickListings}>My Listings</li>
                        <li onClick={this.clickCart}>My Cart</li>
                        <li onClick={this.clickLogout}>Logout</li>
                    </div>
                </ul>
            </div>
        )
    }
}



export default withRouter(connect(null, {logoutUser})(Header))