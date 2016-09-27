/**
 * Created by txiaozhe on 27/09/2016.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';

import getLunarDate from './getLunarDate';

export default class CalendarBody extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    getFirstDay = (year, month) => {
        var firstDay = new Date(year, month - 1, 1);
        return firstDay.getDay();
    }
    getMonthLen = (year, month) => {
        var nextMonth = new Date(year, month, 1);
        nextMonth.setHours(nextMonth.getHours() - 3);
        return nextMonth.getDate();
    }
    getCalendarTable = (year, month) => {
        //var self = this;
        var monthLen = this.getMonthLen(year, month);
        var firstDay = this.getFirstDay(year, month);
        var list = [[]];
        var i, cur, row, col;
        for (i = firstDay; i--;) {
            list[0].push('');
        }
        for (i = 1; i <= monthLen; i++) {
            cur = i + firstDay - 1;
            row = Math.floor(cur / 7);
            col = cur % 7;
            list[row] = list[row] || [];
            list[row].push(i);
        }
        var lastRow = list[row];
        var remain = 7 - list[row].length;
        for (i = 7 - lastRow.length; i--;) {
            lastRow.push('');
        }
        return list;
    }
    onClickCallback = (year, month, day, selectAction) => {
        this.props.onSelectedChange(new Date(year, month - 1, day), selectAction);
    }

    render() {
        //var self = this;
        var date = this.props.date;
        var year = date.getFullYear();
        var month = date.getMonth() + 1;

        var curDate = this.props.current;
        var curYear = curDate.getFullYear();
        var curMonth = curDate.getMonth() + 1;
        var curDay = curDate.getDate();

        var table = this.getCalendarTable(year, month);
        var rows = table.map((row) => {
            var days = row.map((day, index) => {
                var isCur = (year === curYear) && (month === curMonth) && (day === curDay);
                var isWeekend = index === 0 || index === 6;
                var lunarDate;
                var lunarDateView;
                var pressCb = (isCur ?  () => {
                } : () => {
                    this.onClickCallback(year, month, day);
                    //this.props._onSelectedChange;
                });
                var className = [styles.day, styles.center, styles.date];
                if (isCur) className.push(styles.cur);
                if (isWeekend) className.push(styles.weekend);
                if (day) {
                    lunarDate = getLunarDate(new Date(year, month - 1, day));
                    //lunarDate = getCNDate(new Date(year, month - 1, day));
                    // console.log("##############################################");
                    // console.log(lunarDate);
                    // console.log(lunarDate.month + '月' + lunarDate.day + '日');
                    lunarDateView = (
                        <View>
                            <Text style={styles.lunar}>
                                {(lunarDate.day == "初一") ? (lunarDate.month + '月') : (lunarDate.day)}
                            </Text>
                        </View>
                    );
                }
                return (
                    <TouchableOpacity style={className} onPress={pressCb}>
                        <Text>{day}</Text>
                        {lunarDateView}
                    </TouchableOpacity>
                );
            });
            return (
                <View style={[styles.row]}>
                    <View style={styles.row}>{days}</View>
                </View>
            );
        });
        return (
            <View style={[styles.rows]}>
                <View>{rows}</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text_center: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    row: {
        flexDirection: 'row',
    },

    date: {
        width: Dimensions.get('window').width / 7,
        height: Dimensions.get('window').width / 7,
    },

    center: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },

    react_calendar: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    weekend: {
        backgroundColor: '#f0f0f0',
    },
    cur: {
        backgroundColor: '#6A9983',//'@theme',
    },
    lunar: {
        color: '#000',
        fontSize: 10,
    },
    day: {
        borderBottomWidth: 1,
        borderRightWidth: 1,
    },

    header: {
        backgroundColor: '#fff',
    },
})