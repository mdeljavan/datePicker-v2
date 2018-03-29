import React from 'react';
import DateParameterList from './List/List';
import ChangeButton from './ChangeButton/ChangeButton';
const dateParameter = ( props ) => {
    let arwr2 = null;
    let arwl2 = null;
    if ( props.type === 'year' ) {
        arwl2 = (
            <ChangeButton
                classes={ 'pick-arw-l pick-arw-s2 next ' }
                class='pick-i-l'
                type={ props.type }
                clicked={ props.changeCurrentDate }
                values={ props.values }
                current={ props.current }
                howManyChange={ 10 }
            />
        );
        arwr2 = (
            <ChangeButton
                classes='pick-arw-r pick-arw-s2 before'
                class='pick-i-r'
                type={ props.type }
                clicked={ props.changeCurrentDate }
                values={ props.values }
                current={ props.current }
                howManyChange={ -10 }
            />
        );
    }
    const classesPick = [ 'pick' ];
    if ( props.type === 'year' ) {
        classesPick.push( 'pick-y' );
    } else if ( props.type === 'month' ) {
        classesPick.push( 'pick-m' );
    };
    if ( props.doubleClicked ) {
        classesPick.push( 'pick-jump' );
    };
    return (
        <ul
            className={ classesPick.join( ' ' ) }
            onDoubleClick={ props.type === 'year' ? props.onDoubleClicked : null }>
            <DateParameterList
                values={ props.values }
                current={ props.current }

            />
            <ChangeButton
                classes='pick-arw-l pick-arw-s1 next'
                class='pick-i-l'
                type={ props.type }
                clicked={ props.changeCurrentDate }
                values={ props.values }
                current={ props.current }
                howManyChange={ 1 }
            />
            <ChangeButton
                classes='pick-arw-r pick-arw-s1 before'
                class='pick-i-r'
                type={ props.type }
                clicked={ props.changeCurrentDate }
                values={ props.values }
                current={ props.current }
                howManyChange={ -1 } />
            { arwl2 }
            { arwr2 }
        </ul>

    )
};
export default dateParameter;