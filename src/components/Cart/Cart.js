import React from "react";
import {connect} from "react-redux";

class Cart extends React.Component {
    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return (
            <div>Cart Component</div>
        )
    }
}

export default connect(null, null)(Cart)