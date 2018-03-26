import React from 'react';
const changeButton = (props) => {
    const classes = ['pick-arw'];
    classes.push(props.classes);
    const onClickHandler = (type, values, currentIndex, howManyChange) => {
        props.clicked(type, values, currentIndex, howManyChange);
    }
    return (
        <div
            className={classes.join(' ')}
            onClick={() => onClickHandler(props.type, props.values, props.current, props.howManyChange)} />
    );
};
export default changeButton;