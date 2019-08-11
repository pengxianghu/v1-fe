import React from 'react';

import './index.scss';

class ScheduleState extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let Red = (
            <div className="red"></div>
        );
        let Green = (
            <div className="green"></div>
        );
        let Orange = (
            <div className="ora"></div>
        );

        let obj;
        if (this.props.state == 1) {
            obj = Red;
        } else if (this.props.state == 0){
            obj = Green;
        }

        return (
            <div>
                {obj}
            </div>
        );
    }
}

export default ScheduleState;