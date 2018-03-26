import React from 'react';
import DateParameterList from './List/List';
import ChangeButton from './ChangeButton/ChangeButton';
const dateParameter = (props) => {

    return (
        <ul className="pick">
            <DateParameterList
                values={props.values}
                current={props.current}
            />
            <ChangeButton
                classes='pick-arw-l next'
                type={props.type}
                clicked={props.changeCurrentDate}
                values={props.values}
                current={props.current}
                howManyChange={1}
            />
            <ChangeButton
                classes='pick-arw-r before'
                type={props.type}
                clicked={props.changeCurrentDate}
                values={props.values}
                current={props.current}
                howManyChange={-1} />
        </ul>

    )
};
export default dateParameter;