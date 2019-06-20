import React, { useState, useLayoutEffect } from 'react'
import { PikerWraper } from './style.js'
import Mask from '../mask/index'
import FormatDate from '@/utils/formatDate'
import { CSSTransition } from 'react-transition-group'
import { Toast } from 'antd-mobile'

export default function DatePiker(props) {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(0)
  const [dayList, setDayList] = useState([])
  const [seletedIndex, setSeletedIndex] = useState(null)
  const [firstClick, setFirstClick] = useState(true)
  const [tip, setTip] = useState('请选择离店日期')
  const handlePikerClick = () => {
    let { startTime, endTime } = props
    if (!startTime) {
      startTime = props.checkinDate
    }
    if (!endTime) {
      endTime = props.checkoutDate
    }
    setShowDatePicker(true)
    setStartTime(
      new Date(FormatDate('yyyy-MM-dd 00:00:00', startTime)).getTime()
    )
    setEndTime(new Date(FormatDate('yyyy-MM-dd 00:00:00', endTime)).getTime())
    setDayList(() => []) // 每次初始化要将数组清空
    initDate()
  }
  function handleCancle() {
    setShowDatePicker(false)
    setSeletedIndex(null)
  }
  function handleConfirm() {
    if (!endTime) {
      Toast.info('请选择离店日期', 1)
      return
    }
    setShowDatePicker(false)
    props.onChange({ endTime: endTime, startTime: startTime })
  }
  function chooseDay(i, j, day, dayList) {
    if (day.day !== 0 && day.time >= day.initStart && day.time <= day.initEnd) {
      dayList.forEach(item => {
        item.days.forEach(t => {
          t.showtip = false // 每次选择后都将提示框隐藏
        })
      })
    }
    if (
      firstClick &&
      day.day !== 0 &&
      day.time >= day.initStart &&
      day.time <= day.initEnd
    ) {
      day.showtip = true
      setStartTime(day.time)
      setEndTime(0)
      setSeletedIndex(i + '' + j)
      setFirstClick(false)
      setTip('请选择离店日期')
    }
    if (
      !firstClick &&
      day.day !== 0 &&
      day.time >= day.initStart &&
      day.time <= day.initEnd
    ) {
      setSeletedIndex(i + '' + j)
      setEndTime(day.time)
      if (startTime >= day.time) {
        day.showtip = true
        setStartTime(day.time)
        setEndTime(0)
        setFirstClick(false)
        return false
      }
      day.showtip = true
      setFirstClick(true)
    }
  }
  useLayoutEffect(() => {
    if (!endTime) return
    setTip(
      '共' +
        (((new Date(endTime).getTime() - new Date(startTime).getTime()) /
          86400000) |
          0) +
        '晚'
    )
  }, [endTime])
  function initDate() {
    let checkinDate = new Date(
      FormatDate('yyyy-MM-dd 00:00:00', props.checkinDate)
    ).getTime()
    let checkoutDate = new Date(
      FormatDate('yyyy-MM-dd 00:00:00', props.checkoutDate)
    ).getTime()
    let year = new Date(checkinDate).getFullYear() // 当前年份
    let month = new Date(checkinDate).getMonth() // 当前月份
    let i = 0
    let dayList = []
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
        if (k < firstDay) {
          // 日期小于当月第一天的情况
          obj2.weekDay = -1
          obj2.day = 0
          obj.days.push(obj2)
        } else {
          obj2.weekDay = new Date(
            fullYear,
            currentMonth,
            k - firstDay + 1
          ).getDay() // 获取周几
          obj2.day = k - firstDay + 1
          obj2.time = new Date(
            fullYear,
            currentMonth,
            k - firstDay + 1
          ).getTime() // 点击时获取当前日期
          obj2.initStart = new Date(checkinDate) // B端设置的开始时间
          obj2.initEnd = new Date(checkoutDate) // B端设置的结束时间
          obj2.start = new Date(startTime) // 用户选择的开始时间
          obj2.end = new Date(endTime) // 用户选择的结束时间
          obj2.showtip = false
          obj.days.push(obj2)
        }
      }
      dayList.push(obj)
      setDayList(dayList)
      i++
      if (i <= 2) {
        formateDate(year, month + i)
      }
    }

    formateDate(year, month)
  }
  const { children } = props
  return (
    <div className={props.className}>
      <span onClick={handlePikerClick.bind(this)}>
        {React.Children.map(children, child => {
          return child
        })}
      </span>
      <PikerWraper timeout={200}>
        <Mask
          in={showDatePicker}
          classNames="fadeIn"
          timeout={200}
          unmountOnExit
        />
        <CSSTransition
          in={showDatePicker}
          classNames="slideUp"
          timeout={900}
          unmountOnExit
        >
          <div className="pickerMain">
            <div className="header">
              <span className="cancel" onClick={handleCancle}>
                取消
              </span>
              <span className="confirm" onClick={handleConfirm}>
                确定
              </span>
              <div className="text">选择日期</div>
              <div className="week">
                <span className="colorRed"> 日</span>
                <span> 一</span>
                <span> 二</span>
                <span> 三</span>
                <span> 四</span>
                <span> 五</span>
                <span className="colorRed"> 六</span>
              </div>
              <div className="dayBody">
                {dayList.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="yearMon">{item.title}</div>
                      <ul className="dayWraper">
                        {item.days.map((day, innerIndex) => {
                          return (
                            <li
                              key={innerIndex}
                              className={`day ${
                                seletedIndex == index + '' + innerIndex ||
                                startTime === day.time ||
                                (endTime === day.time && day.day !== 0)
                                  ? 'select'
                                  : ''
                              } ${
                                day.weekDay == 0 || day.weekDay == 6
                                  ? 'colorRed'
                                  : ''
                              } ${
                                day.time >= day.initStart &&
                                day.time <= day.initEnd
                                  ? 'canSelect'
                                  : ''
                              }`}
                              onClick={() => {
                                chooseDay(index, innerIndex, day, dayList)
                              }}
                            >
                              {day.day !== 0 ? day.day : ''}
                              {day.showtip ? (
                                <span
                                  className={`liveHint ${
                                    day.weekDay === 0
                                      ? 'sideLeft'
                                      : day.weekDay == 6
                                      ? 'sideRight'
                                      : ''
                                  }`}
                                >
                                  {tip}
                                </span>
                              ) : null}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CSSTransition>
      </PikerWraper>
    </div>
  )
}
DatePiker.defaultProps = {
  checkinDate: 1557936000000,
  checkoutDate: 1560268800000,
  startTime: '',
  endTime: ''
}
