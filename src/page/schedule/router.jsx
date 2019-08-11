import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

// 页面
import Schedule from './index.jsx';
import AddSchedule from './add.jsx';

class ScheduleRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/schedule/index" component={Schedule} />
                <Route path="/schedule/add" component={AddSchedule} />
                <Redirect exact from="/schedule" to="/schedule/index" />
            </Switch>
        )
    }
}
export default ScheduleRouter;