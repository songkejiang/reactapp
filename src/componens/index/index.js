import React, {Component} from 'react';
import {Button} from 'antd-mobile';
import Model from '@/componens/Model/index'
import Input from '@/commen/Input.js'
import Form from '@/commen/Form.js'
const Index = (props) => {
      return (
            <div>
                <Button type="primary" onClick={() => {props.history.push('/hooks')}}>按钮</Button>
                <Model></Model>
                <Form>
                <Input v_model="name"></Input>
                </Form>
            </div>
            
        );
}
export default Index;







