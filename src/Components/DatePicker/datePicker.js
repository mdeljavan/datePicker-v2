import React, { Component } from 'react';
import DatePickerElement from './DateParameter/DateParameter';
import JalaliDate from './../../lib/JalaliDate';
class DatePicker extends Component {
    constructor(props) {
        super(props);
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
                dayName:null,
                values: null
            },
            doubleClickOnYear: false
        };
    };
    componentDidMount() {
        const yearValue = [];
        for (let i = this.state.year.min, ind = 0; i <= this.state.year.max; i++) {
            yearValue.push({
                index: ind,
                value: i
            });
            ind++;
        };

        const currentJalaliDate = new JalaliDate();
        const currentMonth = currentJalaliDate.getMonth();
        const currentYear = currentJalaliDate.getFullYear();
        const currentDay = currentJalaliDate.getDate()-1;
        const dayValues = [];
        for (let i = 1; i <= this.getDaysInmonth(currentMonth, currentYear); i++) {
            dayValues.push({
                index: i,
                value: i
            });
        };
        const currentYearIndex = this.getIndexOfvalue(yearValue, currentYear);
        const currentDayIndex = this.getIndexOfvalue(dayValues, currentDay);
        const currentNameDay = currentJalaliDate.getDate();
        this.initializeDate('month', this.state.month.values, currentMonth);
        this.initializeDate('year', yearValue, currentYearIndex);
        this.initializeDate('day', dayValues, currentDayIndex);
    };
    getIndexOfvalue = (arr, val) => {
        return arr.find(v => {
            return v.value === val;
        }).index;
    };
    getDaysInmonth = (month, year) => {
        return [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, JalaliDate.isLeap(year)][month];
    }
    initializeDate = (type, values, current) => {
        if (type === 'day') {
            this.setStateValues(type, values, current);
        } else {
            const { indexAfterChange, valuesAfterChange } = this.changeValuePlace([...values], current);
            this.setStateValues(type, valuesAfterChange, indexAfterChange);
        };
    };
    setStateValues = (type, newValues, index) => {
        const newStateType = {
            ...this.state[type],
            values: [...newValues],
            current: index
        }
        
        this.setState({ [type]: newStateType })
    }
    checkIndexAfterChange = (index, max, min) => {
        let currentIndex = 0;
        if (index > max) {
            currentIndex = min;
        } else if (index < min) {
            currentIndex = max;
        } else {
            currentIndex = index;
        };
        return currentIndex;
    };
    changeValuePlace = (values, index) => {
        const valuesAfterChange = [...values];
        let indexAfterChange = index;
        if (indexAfterChange === 0) {
            const lastValue = valuesAfterChange.splice(-1);
            valuesAfterChange.splice(0, 0, ...lastValue);
            indexAfterChange = indexAfterChange + 1;
        } else if (indexAfterChange === valuesAfterChange.length - 1) {
            const firstValue = valuesAfterChange.splice(0, 1);
            valuesAfterChange.push(...firstValue);
            indexAfterChange = indexAfterChange - 1;
        };
        return { indexAfterChange, valuesAfterChange };
    };
    onClickToChangeCurrentDate = (type, values, currentValue, howManyChange) => {
        let index = currentValue + howManyChange;
        const maximumIndex = values.length - 1;
        const minimumIndex = 0;
        const indexChecked = this.checkIndexAfterChange(index, maximumIndex, minimumIndex);
        const newValue = [...values];
        const { indexAfterChange, valuesAfterChange } = this.changeValuePlace(newValue, indexChecked);
        this.setStateValues(type, valuesAfterChange, indexAfterChange);
    };
    onDoubleClickOnYear = (event) => {
        if (event.target.tagName !== 'LI') return;
        this.setState(prevState => {
            return {
                doubleClickOnYear: !prevState.doubleClickOnYear
            };
        });
    };
    render() {
        let month = null, year = null, day = null;
        if (this.state.month.values && this.state.year.values) {
            const currentMonth = this.state.month.current;
            const monthValues = [...this.state.month.values];
            const currentYear = this.state.year.current;
            const yearValues = [...this.state.year.values];
            const currentDay = this.state.day.current;
            const dayValues = [...this.state.day.values];
            month = (
                <DatePickerElement
                    type="month"
                    values={monthValues}
                    current={currentMonth}
                    changeCurrentDate={(type, values, currentValue, howManyChange) => this.onClickToChangeCurrentDate(type, values, currentValue, howManyChange)} />
            );
            day = (
                <DatePickerElement
                    type="day"
                    values={dayValues}
                    current={currentDay}
                    // changeCurrentDate={(type, values, currentValue, howManyChange) => this.onClickToChangeCurrentDate(type, values, currentValue, howManyChange)}
                     />
            );
            year = (
                <DatePickerElement
                    type="year"
                    values={yearValues}
                    current={currentYear}
                    doubleClicked={this.state.doubleClickOnYear}
                    changeCurrentDate={(type, values, currentValue, howManyChange) => this.onClickToChangeCurrentDate(type, values, currentValue, howManyChange)}
                    onDoubleClicked={this.onDoubleClickOnYear} />
            );
        }
        return (
            <div className="DatePicker">
                {month}
                {day}
                {year}


            </div>
        );
    };
};

export default DatePicker;