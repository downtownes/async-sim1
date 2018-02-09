import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Bins from './Components/Bins/Bins';
import Product from './Components/Product/Product';
import CreateItem from './Components/CreateItem/CreateItem';

export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/bins/:id" component={Bins} />
        <Route path="/bin/:id" component={Product} />
        <Route path="/create/:id" component={CreateItem} />
    </Switch>
)