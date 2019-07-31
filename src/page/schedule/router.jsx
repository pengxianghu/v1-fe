import React            from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

// 页面
import ToDoList from './index.jsx';

class ToDoListRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/to-do-list" component={ToDoList}/>
                <Redirect exact from="/to-do" to="/to-do-list"/>
            </Switch>
        )
    }
}
export default ToDoListRouter;