import React, { Component } from 'react'

import {Button} from 'antd-mobile';
import axios from 'axios'
import Alert from '../../commen/Confirm'
import DatePicker from '../../commen/datePicker/index'
import DatePickerHook from '../../commen/datePicker-hook/index'
import { observer, inject } from 'mobx-react'

@inject('modelStore')
@observer class Model extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttons: [
        {
          text: 'Cancle',
          onPress: () => {
            this.setState({
              showAlert: false
            })
          }
        },
        {
          text: 'OK',
          onPress: () => {
            this.setState({
              showAlert: false
            })
            console.log('ok')
          }
        }
      ],
			showAlert: false,
			list: [
				{day: '请选择日期', checkinDate: Date.now(), checkoutDate: Date.now() + 3600 * 24 * 1000 * 10, startTime: Date.now(), endTime: Date.now() + 3600 * 24 * 1000 * 10},
				{day: '请选择日期', checkinDate: Date.now(), checkoutDate: Date.now() + 3600 * 24 * 1000 * 13},
				{day: '请选择日期', checkinDate: Date.now(), checkoutDate: Date.now() + 3600 * 24 * 1000 * 6}
      ],
      checkinDate: Date.now(),
      checkoutDate: Date.now() + 3600 * 24 * 1000 * 10,
      startTime: Date.now(),
      endTime: Date.now() + 3600 * 24 * 1000 * 10
		}
  }
  componentDidMount() {
    axios.get('/api/list.json')
    setTimeout(() => {
      axios.get('/api/list.json')
    }, 0)
  }
  handelClick() {
    Alert.show('提示', '确定删除吗?', [
      {
        text: 'Cancle',
        onPress: () => {
          console.log('cancel')
        }
      },
      {
        text: 'OK',
        onPress: () => {
          console.log('ok')
        }
      }
    ])
	}
	handleChangeUser(){
		this.props.modelStore.changeUser();
	}
	confirmDate(...args) {
		this.state.list[args[0]].day = (args[1].endTime - args[1].startTime)/3600/1000/24 + '天'
		this.state.list[args[0]].startTime = args[1].startTime
		this.state.list[args[0]].endTime = args[1].endTime
		this.setState({
			list: this.state.list
		})
  }
  confirmDate2(e) {
    console.log(e)
    this.setState({
			startTime: e.startTime,
			endTime: e.endTime,
		})
  }
  render() {
		const {count, user, changeUser} = this.props.modelStore
    return (
      <div>
				{count}
        <Button onClick={this.handelClick.bind(this)}>sdfsdf</Button>
        <Button onClick={this.handleChangeUser.bind(this)}>mobx</Button>
				{this.state.list.map((item, index) => {
					return <DatePicker key={index} checkinDate={item.checkinDate} startTime={item.startTime} endTime={item.endTime} checkoutDate={item.checkoutDate} onChange={this.confirmDate.bind(this, index)}>
						<div>{item.day}</div>
					</DatePicker>
				})}
        <DatePickerHook checkinDate={this.state.checkinDate} startTime={this.state.startTime} endTime={this.state.endTime} checkoutDate={this.state.checkoutDate} onChange={this.confirmDate2.bind(this)}>as</DatePickerHook>
        {/* {this.state.showAlert?<Alert buttons={this.state.buttons} title='sss' content='sssssss'></Alert>:''} */}
      </div>
    )
  }
}
export default Model
