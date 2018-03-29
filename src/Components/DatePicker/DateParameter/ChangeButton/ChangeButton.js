import React from 'react';
const changeButton = (props) => {
    const classes = [ 'pick-arw' ];
    console.log(props.classes)
    classes.push(props.classes);
    const onClickHandler = (type, values, currentIndex, howManyChange) => {
        props.clicked(type, values, currentIndex, howManyChange);
    }
    console.log(props.class)
    return (
        <div
            className={classes.join(' ')}
            onClick={ () => onClickHandler( props.type, props.values, props.current, props.howManyChange ) } >
            <i className={props.class}></i>
        </div>
    );
};
export default changeButton;