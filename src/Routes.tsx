import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Search from "app/src/pages/Search";
import Favorites from "app/src/pages/Favorites";

export default () => (
    <Switch>
        <Route path="/search" component={Search} />
        <Route path="/favorites" component={Favorites} />
        <Redirect exact from="/" to="/search" />
        <Route render={() => <p>Not Found!</p>} />
    </Switch>
);