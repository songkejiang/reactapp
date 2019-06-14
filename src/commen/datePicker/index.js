import React, { Component } from 'react'
import { PikerWraper } from './style.js'
import Mask from '../mask/index'
import FormatDate from '@/utils/formatDate'
import { CSSTransition } from 'react-transition-group'
import { Toast} from 'antd-mobile';

export default class DatePiker extends Component {
  constructor(props) {
    super(props)
    this.state = {
			showDatePicker: false,
			startTime: null,
			endTime: null,
			dayList: [],
			seletedIndex: null,
			firstClick: true,
			tip: '请选择离店日期'
    }
  }
  componentDidMount() {
  }
  handlePikerClick() {
		let {startTime, endTime} = this.props
		if (!startTime) {
			startTime = this.props.checkinDate
		}
		if (!endTime) {
			endTime = this.props.checkoutDate
		}
    this.setState({
			showDatePicker: true,
			startTime: new Date(FormatDate('yyyy-MM-dd 00:00:00', startTime)).getTime(),
			endTime: new Date(FormatDate('yyyy-MM-dd 00:00:00', endTime)).getTime()
		}, ()=> {
			this.initDate()
		})
  }
  handleCancle() {
    this.setState({
			showDatePicker: false,
			seletedIndex: null
    })
  }
  handleConfirm() {
		if (!this.state.endTime) {
			Toast.info('请选择离店日期', 1);
			return 
		}
    this.setState({
      showDatePicker: false
		})
		this.props.onChange({endTime: this.state.endTime, startTime: this.state.startTime})
	}
	async chooseDay(i, j, day, dayList) {
		if (
			day.day !== 0 &&
			day.time >= day.initStart &&
			day.time <= day.initEnd
		) {
			dayList.forEach(item => {
				item.days.forEach(t => {
					t.showtip = false // 每次选择后都将提示框隐藏
				})
			})
		}
		if (
			this.state.firstClick &&
			day.day !== 0 &&
			day.time >= day.initStart &&
			day.time <= day.initEnd
		) {
			day.showtip = true
			await this.setState({
				startTime: day.time,
				endTime : 0,
				seletedIndex: i + '' + j,
				firstClick: false,
				tip : '请选择离店日期'
			})
		} else if (
			!this.state.firstClick &&
			day.day !== 0 &&
			day.time >= day.initStart &&
			day.time <= day.initEnd
		) {
			await this.setState({
				seletedIndex : i + '' + j,
				endTime : day.time,
				firstClick: false
			})
			if (this.state.startTime >= this.state.endTime) {
				day.showtip = true
				await this.setState({
					startTime : this.state.endTime,
					endTime : 0,
					firstClick: false,
					tip : '请选择离店日期'

				})
				return false
			}
			day.showtip = true
			await this.setState({
				firstClick: true,
				tip : '共' + (((new Date(this.state.endTime).getTime() - new Date(this.state.startTime).getTime()) / 86400000) |
				0) + '晚'
			})
		}
	}
	initDate() {
		this.dayList = [] // 每次初始化要将数组清空
		this.checkinDate =  new Date(FormatDate('yyyy-MM-dd 00:00:00', this.props.checkinDate)).getTime()
		this.checkoutDate = new Date(FormatDate('yyyy-MM-dd 00:00:00', this.props.checkoutDate)).getTime()
		let year = new Date(this.checkinDate).getFullYear() // 当前年份
		let month = new Date(this.checkinDate).getMonth() // 当前月份
		let _this = this
		let i = 0
		function formateDate(y, m) {
			let currenDay = new Date(y, m) //
			let currentMonth = currenDay.getMonth() // 当前月份 比实际月份少 1
			let fullYear = currenDay.getFullYear() // 当前年份
			let days = new Date(fullYear, currentMonth + 1, 0).getDate() // 当前月多少天
			let firstDay = new Date(fullYear, currentMonth, 1).getDay() // 当前月第一天星期几
			let obj = {}
			obj.title = `${fullYear}年${currentMonth + 1}月`
			obj.days = []
			obj.firstDay = firstDay
			for (var k = 0; k < days + firstDay; k++) {
				var obj2 = {}
				if (k < firstDay) { // 日期小于当月第一天的情况
					obj2.weekDay = -1
					obj2.day = 0
					obj.days.push(obj2)
				} else {
					obj2.weekDay = new Date(fullYear, currentMonth, k - firstDay + 1).getDay() // 获取周几
					obj2.day = k - firstDay + 1
					obj2.time = new Date(fullYear, currentMonth, k - firstDay + 1).getTime() // 点击时获取当前日期
					obj2.initStart = new Date(_this.checkinDate) // B端设置的开始时间
					obj2.initEnd = new Date(_this.checkoutDate) // B端设置的结束时间
					obj2.start = new Date(_this.state.startTime) // 用户选择的开始时间
					obj2.end = new Date(_this.state.endTime) // 用户选择的结束时间
					obj2.showtip = false
					obj.days.push(obj2)
				}
			}
			_this.dayList.push(obj)
			_this.setState({
				dayList: _this.dayList
			})
			i++
			if (i <= 2) {
				formateDate(year, month + i)
			}
		}

		formateDate(year, month)
	}
  render() {
    const { children } = this.props
    return (
      <div className={this.props.className}>
        <span onClick={this.handlePikerClick.bind(this)}>
					{React.Children.map(children, (child) => {
						return child
					})}
				</span>
        <PikerWraper
				  timeout={200}
				>
          <Mask
            in={this.state.showDatePicker}
            classNames="fadeIn"
            timeout={200}
            unmountOnExit
          />
          <CSSTransition
            in={this.state.showDatePicker}
            classNames="slideUp"
            timeout={900}
            unmountOnExit
          >
            <div className="pickerMain">
              <div className="header">
                <span className="cancel" onClick={this.handleCancle.bind(this)}>
                  取消
                </span>
                <span
                  className="confirm"
                  onClick={this.handleConfirm.bind(this)}
                >
                  确定
                </span>
                <div className="text">选择日期</div>
								<div className='week'>
									<span className="colorRed"> 日</span>
									<span> 一</span>
									<span> 二</span>
									<span> 三</span>
									<span> 四</span>
									<span> 五</span>
									<span className="colorRed"> 六</span>
								</div>
								<div className='dayBody'>
									{
										this.state.dayList.map((item, index) => {
											return(
												<div key={index}>
													<div className='yearMon'>
														{item.title}
													</div>
													<ul className="dayWraper">
														{
															item.days.map((day, innerIndex)=> {
																return(
																	<li key={innerIndex} className={`day ${(this.state.seletedIndex==index+''+innerIndex||this.state.startTime === day.time)|| this.state.endTime === day.time&&day.day!==0?'select':''} ${(day.weekDay==0||day.weekDay==6)?'colorRed':''} ${(day.time>=day.initStart&&day.time<=day.initEnd)?'canSelect':''}`}
																		onClick={()=> {this.chooseDay(index,innerIndex,day, this.state.dayList)}}
																	>
																		{
																			day.day!==0?day.day:''
																		}
																		{
																			day.showtip?<span className={`liveHint ${day.weekDay===0?'sideLeft':day.weekDay==6?'sideRight':''}`}>{this.state.tip}
																		</span>:null
																		}
																	</li>
																)
															})
														}
												</ul>
												</div>
											)
										})
									}
								</div>
              </div>
            </div>
          </CSSTransition>
        </PikerWraper>
      </div>
    )
  }
}
DatePiker.defaultProps = {
	checkinDate: 1557936000000,
	checkoutDate: 1560268800000,
	startTime: '',
	endTime: ''
}