import React from 'react';
import DateParameterList from './List/List';
import ChangeButton from './ChangeButton/ChangeButton';
const dateParameter = (props) => {
    let arw_s2_1 = null;
    let arw_s2_2 = null;
    let arw_s1_1 = null;
    let arw_s1_2 = null;
    if (props.type === 'year') {
        arw_s2_1 = (
            <ChangeButton
                classes={'pick-arw-l pick-arw-s2 next '}
                class='pick-i-l'
                type={props.type}
                clicked={props.changeCurrentDate}
                values={props.values}
                current={props.current}
                howManyChange={10}
            />
        );
        arw_s2_1 = (
            <ChangeButton
                classes='pick-arw-r pick-arw-s2 before'
                class='pick-i-r'
                type={props.type}
                clicked={props.changeCurrentDate}
                values={props.values}
                current={props.current}
                howManyChange={-10}
            />
        );
    }
    if (props.type === 'year' || props.type === 'month') {
        arw_s1_1 = (
            <ChangeButton
                classes='pick-arw-l pick-arw-s1 next'
                class='pick-i-l'
                type={props.type}
                clicked={props.changeCurrentDate}
                values={props.values}
                current={props.current}
                howManyChange={1}
            />
        );
        arw_s1_2=(
            <ChangeButton
                classes='pick-arw-r pick-arw-s1 before'
                class='pick-i-r'
                type={ props.type }
                clicked={ props.changeCurrentDate }
                values={ props.values }
                current={ props.current }
                howManyChange={ -1 } />
        );
    }
    const classesPick = ['pick'];
    if (props.type === 'year') {
        classesPick.push('pick-y');
    } else if (props.type === 'month') {
        classesPick.push('pick-m');
    } else if (props.type === 'day') {
        classesPick.push('pick-d');
    };
    if (props.doubleClicked) {
        classesPick.push('pick-jump');
    };
    return (
        <ul
            className={classesPick.join(' ')}
            onDoubleClick={props.type === 'year' ? props.onDoubleClicked : null}>
            <DateParameterList
                values={props.values}
                current={props.current}

            />
            {arw_s1_1}
            {arw_s1_2}
            {arw_s2_1}
            {arw_s2_2}
        </ul>

    )
};
export default dateParameter;