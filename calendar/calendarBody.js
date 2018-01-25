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

export default class CalendarBody extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	
	getFirstDay = (year, month) => {
		let firstDay = new Date(year, month - 1, 1);
		return firstDay.getDay();
	};
	
	getMonthLen = (year, month) => {
		let nextMonth = new Date(year, month, 1);
		nextMonth.setHours(nextMonth.getHours() - 3);
		return nextMonth.getDate();
	};
	
	getCalendarTable = (year, month) => {
		//let self = this;
		let monthLen = this.getMonthLen(year, month);
		let firstDay = this.getFirstDay(year, month);
		let list = [[]];
		let i, cur, row, col;
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
		let lastRow = list[row];
		let remain = 7 - list[row].length;
		for (i = 7 - lastRow.length; i--;) {
			lastRow.push('');
		}
		return list;
	};
	
	onClickCallback = (year, month, day, selectAction) => {
		this.props.onSelectedChange(new Date(year, month - 1, day), selectAction);
	};
	
	render() {
		//let self = this;
		let date = this.props.date;
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		
		let curDate = this.props.current;
		let curYear = curDate.getFullYear();
		let curMonth = curDate.getMonth() + 1;
		let curDay = curDate.getDate();
		let cur = {
			backgroundColor: "#6A9983"
		};
		let table = this.getCalendarTable(year, month);
		let rows = table.map((row, rowId) => {
			let days = row.map((day, index) => {
				let isCur = (year === curYear) && (month === curMonth) && (day === curDay);
				let isWeekend = index === 0 || index === 6;
				let lunarDate;
				let lunarDateView;
				let pressCb = (isCur ? () => {
				} : () => {
					this.onClickCallback(year, month, day);
					//this.props._onSelectedChange;
				});
				let className = [styles.day, styles.center, styles.date, this.props.dateStyle];
				if (isCur) className.push(this.props.selectDateStyle ? this.props.selectDateStyle : cur);
				if (isWeekend) className.push(this.props.weekendStyle ? this.props.weekendStyle : styles.weekend);
				if (day) {
					lunarDate = getLunarDate(new Date(year, month - 1, day));
					//lunarDate = getCNDate(new Date(year, month - 1, day));
					// console.log("##############################################");
					// console.log(lunarDate);
					// console.log(lunarDate.month + "月" + lunarDate.day + "日");
					lunarDateView = (
						<View>
							<Text style={styles.lunar}>
								{(lunarDate.day == "初一") ? (lunarDate.month + "月") : (lunarDate.day)}
							</Text>
						</View>
					);
				}
				return (
					<TouchableOpacity
						key={index}
						style={[className]}
						onPress={pressCb}>
						<Text>{day}</Text>
						{lunarDateView}
					</TouchableOpacity>
				);
			});
			return (
				<View
					key={rowId}
					style={[styles.row]}>
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
		justifyContent: "center",
		alignItems: "center"
	},
	
	row: {
		flexDirection: "row",
		flex: 1,
	},
	
	date: {
		// width: Style.WidthScale(7),
		// height: Style.WidthScale(7)
		flex: 1,
		padding: 6,
	},
	
	center: {
		justifyContent: "center",
		flexDirection: "column",
		alignItems: "center"
	},
	
	react_calendar: {
		width: Style.WIDTH,
		height: Style.HEIGHT
	},
	
	weekend: {
		backgroundColor: "#f00"
	},
	
	lunar: {
		color: Color.black,
		fontSize: 10
	},
	
	day: {
		borderBottomWidth: 1,
		borderRightWidth: 1
	},
	
	header: {
		backgroundColor: Color.white
	}
});
