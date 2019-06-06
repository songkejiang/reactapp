import React, { Component } from 'react'
import { PikerWraper } from './style.js'
import Mask from '../mask/index'
import FormatDate from '@/utils/formatDate'
import { CSSTransition } from 'react-transition-group'
export default class DatePiker extends Component {
  constructor(props) {
    super(props)
    this.state = {
			showDatePicker: true,
			startTime: null,
			endTime: null,
			dayList: [],
			seletedIndex: null,
			firstClick: true,
			tip: '请选择离店日期'
    }
  }
  componentDidMount() {
		this.initDate()
  }
  handlePikerClick() {
    this.setState({
      showDatePicker: true
    })
  }
  handleCancle() {
    this.setState({
      showDatePicker: false
    })
  }
  handleConfirm() {
    this.setState({
      showDatePicker: false
    })
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

			// setTimeout(() => {
			// 	// 选择离店日期后将日期传出去
			// 	this.$emit('choose', {
			// 		checkinDate: FormatDate(
			// 			'yyyy-MM-dd',
			// 			new Date(this.startTime)
			// 		),
			// 		checkoutDate: FormatDate('yyyy-MM-dd', new Date(this.endTime))
			// 	})
			// 	this.data.open = false
			// 	this.startTime = ''
			// 	this.endTime = ''
			// 	this.seletedIndex = ''
			// }, 500)
		}
	}
	initDate() {
		this.dayList = [] // 每次初始化要将数组清空
		let year = new Date(this.props.checkinDate).getFullYear() // 当前年份
		let month = new Date(this.props.checkinDate).getMonth() // 当前月份
		console.log('aaaa', month)
		let _this = this
		let i = 0
		this.setState({
			startTime: new Date(
				FormatDate(
					'yyyy-MM-dd',
					new Date(this.props.checkinDate)
				)
			).getTime()
		})
		this.setState({
			endTime: new Date(
				FormatDate(
					'yyyy-MM-dd',
					new Date(this.props.checkoutDate)
				)
			).getTime()
		})
		function formateDate(y, m) {
			console.log(m)
			let currenDay = new Date(new Date(y, m)) //
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
					obj2.time = new Date(FormatDate('yyyy-MM-dd', new Date(fullYear, currentMonth, k - firstDay + 1))).getTime() // 点击时获取当前日期
					obj2.initStart = new Date( // B端设置的开始时间
						FormatDate('yyyy-MM-dd', new Date(_this.props.checkinDate))
					).getTime()
					obj2.initEnd = new Date( // B端设置的结束时间
						FormatDate('yyyy-MM-dd', new Date(_this.props.checkoutDate))
					).getTime()
					obj2.start = new Date( // 用户选择的开始时间
						FormatDate('yyyy-MM-dd', new Date(_this.state.startTime))
					).getTime()
					obj2.end = new Date( // 用户选择的结束时间
						FormatDate('yyyy-MM-dd', new Date(_this.state.endTime))
					).getTime()
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
        <span onClick={this.handlePikerClick.bind(this)}>{children}</span>
        <PikerWraper>
          <Mask
            in={this.state.showDatePicker}
            classNames="fadeIn"
            timeout={300}
            unmountOnExit
          />
          <CSSTransition
            in={this.state.showDatePicker}
            classNames="slideUp"
            timeout={300}
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
																	<li key={innerIndex} className={`day ${(this.state.seletedIndex==index+''+innerIndex||this.state.startTime===day.time||this.state.endTime==day.time)&&day.day!==0?'select':''} ${(day.weekDay==0||day.weekDay==6)?'colorRed':''} ${(day.time>=day.initStart&&day.time<=day.initEnd)?'canSelect':''}`}
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
	checkoutDate: 1561046400000
}