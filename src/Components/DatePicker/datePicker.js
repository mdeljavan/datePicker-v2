import React, { Component } from 'react';
import DatePickerElement from './DateParameter/DateParameter';
class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: {
                taday: null,
                current: 11,
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
                current: 1,
                values: null
            },
            day: {
                today: null,
                current: 1,
                values: null
            }
        };
    };
    componentDidMount() {
        const yearValue = [];
        for (let i = this.props.minYear; i <= this.props.maxYear; i++) {
            yearValue.push(i)
        };
        const { indexAfterChange, valuesAfterChange } = this.changeValuePlace([...this.state.month.values], this.state.month.current);
        this.setStateValues('month',valuesAfterChange, indexAfterChange);

    };
    setStateValues = (type, newValues, index) => {
        const newStateType = {
            ...this.state[type],
            values: [...newValues],
            current: index
        }
        console.log(newStateType)
        this.setState({ [type]: newStateType })
    }
    checkIndexAfterChange = (index, max, min) => {
        if (index > max) {
            return min;
        } else if (index < min) {
            return max;
        } else {
            return index;
        };
    };
    changeValuePlace = (values, index) => {
        const valuesAfterChange = [...values];
        let indexAfterChange = index;
        if (indexAfterChange === 0) {
            const lastValue = valuesAfterChange.splice(-1);
            valuesAfterChange.splice(0, 0, ...lastValue);
            indexAfterChange = 1;
        } else if (indexAfterChange === valuesAfterChange.length - 1) {
            const firstValue = valuesAfterChange.splice(0, 1);
            valuesAfterChange.push(...firstValue);
            indexAfterChange = valuesAfterChange.length - 2;
        };
        return { indexAfterChange, valuesAfterChange };
    };
    onChangeCurrentDate = (type, values, currentValue, howManyChange) => {
        console.log(type, values, currentValue, howManyChange)
        let index = currentValue + howManyChange;
        const maximumIndex = values.length - 1;
        const minimumIndex = 0;
        const indexChecked = this.checkIndexAfterChange(index, maximumIndex, minimumIndex);
        const newValue = [...values];
        const { indexAfterChange, valuesAfterChange } = this.changeValuePlace(newValue, indexChecked);
        this.setStateValues(type, valuesAfterChange, indexAfterChange);
    };
    render() {
        const currentMonth = this.state.month.current;
        return (
            <div>
                <DatePickerElement
                    type="month"
                    values={this.state.month.values}
                    current={this.state.month.current}
                    changeCurrentDate={(type, values, currentValue, howManyChange) => this.onChangeCurrentDate(type, values, currentValue, howManyChange)} />
                {/* <Day />
                <Year /> */}
            </div>
        );
    };
};

export default DatePicker;