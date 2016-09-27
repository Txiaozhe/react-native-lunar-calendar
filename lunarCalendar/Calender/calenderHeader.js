/**
 * Created by txiaozhe on 27/09/2016.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';

import getLunarDate from './getLunarDate';

export default class CalendarHeader extends Component{

    constructor(props) {
        super(props);

        this.date = this.props.date;

        this.state = {
            year: this.date.getFullYear(),
            month: this.date.getMonth() + 1,
            day: this.date.getDay(),

            lYear: getLunarDate(this.date).year,
            lAniYear: getLunarDate(this.date).zodiac,
        };
    }

    onClickLeft = () => {
        let _year = this.state.year;
        let _month = this.state.month;
        _month--;
        this.setState({month: _month});
        if(_month === 0) {
            _month = 12;
            _year--;
            this.setState({
                month: 12,
                year: _year,
            });
        }
        this.props.onNavChange(new Date(_year, _month - 1));
        this.setState({
            lYear: getLunarDate(new Date(_year, _month)).year,
            lAniYear: getLunarDate(new Date(_year, _month)).zodiac,
        })
    }

    onClickRight = () => {
        let _year = this.state.year;
        let _month = this.state.month;
        _month++;

        this.setState({month: _month});
        if(_month === 13) {
            _month = 1;
            _year++;
            this.setState({
                month: 1,
                year: _year,
            });
        }
        this.props.onNavChange(new Date(_year, _month - 1));
        this.setState({
            lYear: getLunarDate(new Date(_year, _month)).year,
            lAniYear: getLunarDate(new Date(_year, _month)).zodiac,
        })
    }

    render () {
        // var year = this.date.getFullYear();
        // var month = this.date.getMonth() + 1;

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.onClickLeft} style={styles.leftArrow}>
                    <Text style={{fontSize: 30, marginLeft: 10}}>{'<'}</Text>
                </TouchableOpacity>
                <View style={styles.date}>
                    <Text style={{fontSize: 30, }}>{this.state.year}年{this.state.month}月</Text>
                    <Text style={{fontSize: 10, marginBottom: 2}}>{this.state.lYear}{this.state.lAniYear}年</Text>
                </View>
                <TouchableOpacity onPress={this.onClickRight} style={styles.leftArrow}>
                    <Text style={{fontSize: 30, marginRight: 10}}>{'>'}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6A9983',
    },
    leftArrow: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    date: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})