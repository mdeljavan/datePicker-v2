import React, { Component } from 'react';
import DatePickerElement from './DateParameter/DateParameter';
import JalaliDate from './../../lib/JalaliDate';
class DatePicker extends Component {
    constructor ( props ) {
        super( props );
        const minYear = props.minYear ? props.minYear : new JalaliDate().getFullYear() - 30;
        const maxYear = props.maxYear ? props.maxYear : new JalaliDate().getFullYear() + 10;
        this.state = {
            month: {
                taday: null,
                current: null,
                values: [
                    {
                        value: 'فروردین',
                        index: 1

                    },
                    {
                        value: 'اردیبهشت',
                        index: 2

                    },
                    {
                        value: 'خرداد',
                        index: 3

                    },
                    {
                        value: 'تیر',
                        index: 4

                    },
                    {
                        value: 'مرداد',
                        index: 5

                    },
                    {
                        value: 'شهریور',
                        index: 6

                    },
                    {
                        value: 'مهر',
                        index: 7

                    },
                    {
                        value: 'آبان',
                        index: 8

                    },
                    {
                        value: 'آذر',
                        index: 9

                    },
                    {
                        value: 'دی',
                        index: 10

                    },
                    {
                        value: 'بهمن',
                        index: 11

                    },
                    {
                        value: 'اسفند',
                        index: 12

                    }
                ]
            },
            year: {
                today: null,
                current: null,
                values: null,
                min: minYear,
                max: maxYear
            },
            day: {
                today: null,
                current: 1,
                values: null
            }
        };
    };
    componentDidMount () {
        const yearValue = [];
        for ( let i = this.state.year.min, ind=0; i <= this.state.year.max; i++ ) {
            yearValue.push( {
                index: ind,
                value: i
            } );
            ind++;
        };
        const jalaliDate = new JalaliDate();
        const currentMonth = jalaliDate.getMonth();
        const currentYear = jalaliDate.getFullYear();
        const currentYearIndex = yearValue.find( year => { 
            return year.value === currentYear;
        }).index;
        const currentDay = jalaliDate.getDay();
        const currentNameDay = jalaliDate.getDate();
        this.initializeDate( 'month', this.state.month.values, currentMonth );
        this.initializeDate( 'year', yearValue, currentYearIndex );
    };
    initializeDate = ( type, values, current ) => {
        const { indexAfterChange, valuesAfterChange } = this.changeValuePlace( [ ...values ], current );
        this.setStateValues( type, valuesAfterChange, indexAfterChange );
    }
    setStateValues = ( type, newValues, index ) => {
        const newStateType = {
            ...this.state[ type ],
            values: [ ...newValues ],
            current: index
        }
        this.setState( { [ type ]: newStateType } )
    }
    checkIndexAfterChange = ( index, max, min ) => {
        let currentIndex = 0;
        if ( index > max ) {
            currentIndex = min;
        } else if ( index < min ) {
            currentIndex = max;
        } else {
            currentIndex = index;
        };
        return currentIndex;
    };
    changeValuePlace = ( values, index ) => {
        const valuesAfterChange = [ ...values ];
        let indexAfterChange = index;
        if ( indexAfterChange === 0 ) {
            const lastValue = valuesAfterChange.splice( -1 );
            valuesAfterChange.splice( 0, 0, ...lastValue );
            indexAfterChange = indexAfterChange + 1;
        } else if ( indexAfterChange === valuesAfterChange.length - 1 ) {
            const firstValue = valuesAfterChange.splice( 0, 1 );
            valuesAfterChange.push( ...firstValue );
            indexAfterChange = indexAfterChange - 1;
        };
        return { indexAfterChange, valuesAfterChange };
    };
    onChangeCurrentDate = ( type, values, currentValue, howManyChange ) => {
        let index = currentValue + howManyChange;
        const maximumIndex = values.length - 1;
        const minimumIndex = 0;
        const indexChecked = this.checkIndexAfterChange( index, maximumIndex, minimumIndex );
        const newValue = [ ...values ];
        const { indexAfterChange, valuesAfterChange } = this.changeValuePlace( newValue, indexChecked );
        this.setStateValues( type, valuesAfterChange, indexAfterChange );
    };
    render () {
        let month = null, year = null, day = null;
        if ( this.state.month.values && this.state.year.values ) {
            const currentMonth = this.state.month.current;
            const monthValues = [ ...this.state.month.values ];
            const currentYear = this.state.year.current;
            const yearValues = [ ...this.state.year.values ];
            month = (
                <DatePickerElement
                    type="month"
                    values={ monthValues }
                    current={ currentMonth }
                    changeCurrentDate={ ( type, values, currentValue, howManyChange ) => this.onChangeCurrentDate( type, values, currentValue, howManyChange ) } />
            );
            year = (
                <DatePickerElement
                    type="year"
                    values={ yearValues }
                    current={ currentYear }
                    changeCurrentDate={ ( type, values, currentValue, howManyChange ) => this.onChangeCurrentDate( type, values, currentValue, howManyChange ) } />
            );
        }
        return (
            <div>
                { month }
                { year }


            </div>
        );
    };
};

export default DatePicker;