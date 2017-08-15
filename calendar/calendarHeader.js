/*
 * MIT License
 *
 * Copyright (c) 2017 Tang Xiaozhe.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

"use strict";

import React, {Component} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import getLunarDate from "./getLunarDate";
import {Style, Color} from "../res";

export default class CalendarHeader extends Component {
  constructor(props) {
    super(props);

    this.date = this.props.date;

    this.state = {
      year: this.date.getFullYear(),
      month: this.date.getMonth() + 1,
      day: this.date.getDay(),

      lYear: getLunarDate(this.date).year,
      lAniYear: getLunarDate(this.date).zodiac
    };
  }

  onClickLeft = () => {
    let _year = this.state.year;
    let _month = this.state.month;
    _month--;
    this.setState({month: _month});
    if (_month === 0) {
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
  };

  onClickRight = () => {
    let _year = this.state.year;
    let _month = this.state.month;
    _month++;

    this.setState({month: _month});
    if (_month === 13) {
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
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onClickLeft} style={Style.Center}>
          <Text style={{fontSize: 30, marginLeft: 10}}>{"<"}</Text>
        </TouchableOpacity>
        <View style={styles.date}>
          <Text style={{fontSize: 30, }}>{this.state.year}年{this.state.month}月</Text>
          <Text style={{fontSize: 10, marginBottom: 2}}>{this.state.lYear}{this.state.lAniYear}年</Text>
        </View>
        <TouchableOpacity onPress={this.onClickRight} style={Style.Center}>
          <Text style={{fontSize: 30, marginRight: 10}}>{">"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.green
  },

  date: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
