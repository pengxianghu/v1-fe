/*
 * @Description: 
 * @Autor: pengxianghu
 * @Date: 2019-08-11 09:24:03
 * @LastEditTime: 2019-08-11 16:43:31
 */

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
            console.log("red");
        } else if (this.props.state == 0){
            obj = Green;
            console.log("green");
        } else {
            obj = Orange;
            console.log("orange");
        }

        return (
            <div>
                {obj}
            </div>
        );
    }
}

export default ScheduleState;