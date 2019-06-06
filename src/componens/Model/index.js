import React, { Component } from 'react'

import {Button} from 'antd-mobile';
import axios from 'axios'
import Alert from '../../commen/Confirm'
import Loading from '../../commen/loading/index'
import DatePicker from '../../commen/datePicker/index'
import { observable } from 'mobx'
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
      showAlert: false
		}
  }
  componentDidMount() {
    axios.get('/api/list.json')
    setTimeout(() => {
      axios.get('/api/list.json')
    }, 0)
    console.log(Alert.show)
    // Alert.show('提示', '确定删除吗?', [
    //     {
    //         text: 'Cancle', onPress: () => {
    //             console.log('cancel')
    //         }
    //     },
    //     {
    //         text: 'OK', onPress: () => {

    //             console.log('ok')
    //         }
    //     }
    // ])
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
  render() {
		const {count, user, changeUser} = this.props.modelStore
    return (
      <div>
				{count}
        <Button onClick={this.handelClick.bind(this)}>sdfsdf</Button>
        <Button onClick={this.handleChangeUser.bind(this)}>mobx</Button>
        <DatePicker className="sss">
          <div>sdasdasdasd</div> asdasd
        </DatePicker>
        {/* {this.state.showAlert?<Alert buttons={this.state.buttons} title='sss' content='sssssss'></Alert>:''} */}
      </div>
    )
  }
}
export default Model
