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
    ToastAndroid,
} from 'react-native';

import CalendarHeader from './calenderHeader';
import CalendarHead from './calenderHead';
import CalendarBody from './calenderBody';

export default class Calendar extends Component {

    constructor(props) {
        super(props);
        var cur = new Date();
        this.state = {
            date: cur,
            current: cur
        };
    }

    onNavChange = (date) => {
        this.setState({
            date: date
        });
    }
    onSelectedChange = (date) => {

        // if(this.props._onSelectedChange !== null) {
        //     this.setState({
        //         current: date
        //     });
        //
        //     return this.props._onSelectedChange;
        // } else {
        this.setState({
            current: date
        });
        ToastAndroid.show(date, ToastAndroid.SHORT);
        //}
    }

    render() {
        var date = this.state.date;
        var current = this.state.current;
        return (
            <View style={[styles.react_calendar]}>
                <CalendarHeader date={date} onNavChange={this.onNavChange}></CalendarHeader>
                <View>
                    <CalendarHead></CalendarHead>
                    <CalendarBody
                        current={current}
                        date={date}
                        onSelectedChange={this.onSelectedChange}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    react_calendar: {
        backgroundColor: '#fff',
    },
})