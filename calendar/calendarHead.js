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
  Text
} from "react-native";

import {String, Color, Style} from "../res";

export default class CalendarHead extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let nodes = String.week.map((text, index) => {
      let className = [styles.day, (index === 0 || index === 6 ? styles.weekend : '')];
      return (
        <View key={index} style={[className, this.props.style]}>
          <Text>{text}</Text>
        </View>
      );
    });
    return (
      <View>
        <View style={[Style.Row, this.props.style]}>{nodes}</View>
      </View>
    );
  }
}

const styles = {
  day: {
    flex: 1,
    height: 30,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  weekend: {
    backgroundColor: Color.grey
  }
};
