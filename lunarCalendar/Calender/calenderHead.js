/**
 * Created by txiaozhe on 27/09/2016.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';


export default class CalendarHead extends Component {
    render() {
        var nodes = ['日', '一', '二', '三', '四', '五', '六'].map(function (text, index) {
            var className = [styles.day, (index === 0 || index === 6 ? styles.weekend : '')];
            return (
                <View key={index} style={className}>
                    <Text>{text}</Text>
                </View>
            );
        });
        return (
            <View>
                <View style={styles.row}>{nodes}</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    day: {
        flex: 1,
        height: 30,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    row: {
        flexDirection: 'row',
    },
    weekend: {
        backgroundColor: '#f0f0f0',
    },
})