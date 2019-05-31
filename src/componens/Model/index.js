import React, {Component} from 'react'

import { Button } from 'react-weui'
import axios from 'axios'
import Alert from '../../commen/Confirm'
export default class Model extends Component{
    componentDidMount() {
        axios.get('/api/list.json')
        setTimeout(() => {
          axios.get('/api/list.json')
        }, 2000)
        Alert.show('提示', '确定删除吗?', [
            {
                text: 'OK', onPress: () => {

                    console.log(this)
                }
            },
            {
                text: 'cancle', onPress: () => {
                    console.log('cancel')
                }
            }
        ])
    }
    render() {
        return(
            <Button>sdfsdf</Button>
        )
    }
}