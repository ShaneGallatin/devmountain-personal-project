import React from "react";
import {Switch, Route} from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import Listings from "./components/Listings/Listings";

export default (
    <>
    <Header/>
    <Switch>
        <Route component={Register} exact path ="/" />
        <Route component={Login} path="/login" />
        <Route component={Home} path="/home" />
        <Route component={Cart} path="/cart" />
        <Route component={Listings} path="/listings"/>
        <Route render={() => <h1>404 - NOT FOUND</h1>} />
    </Switch>
    </>
)