import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import { Confirm } from './style.js'
import Mask from '../mask/index'
@test
class Alert extends Component {
	constructor(props, context) {
		super(props, context)
	    console.log('props', props)
	    console.log('context', context)
		this.state={
			showModel: false
		}
	}
	componentDidMount() {
		this.setState({
			showModel: true
		})

	}
    handleClose(item) {
		this.setState({
			showModel: false
		}, ()=>{
			setTimeout(()=> {
				Alert.close()
				item.onPress();
			}, 300)
		})
	}
    render() {
    return (
			<React.Fragment>{this.props.buttons.length}
				{
					this.props.buttons.length>0?<Confirm className="mask" onTouchMove={e => { e.preventDefault() }}>
					<Mask
					in={this.state.showModel}
					classNames='fadeIn'
					timeout={300}
					unmountOnExit>
					</Mask>
						<div className="am-modal-wrap">
							<div className={`am-modal ${this.state.showModel?'bounceIn':'bounceOut'}`}>
									<div className="am-modal-content">
										<div className="am-modal-header">
											<div className="am-modal-title">{this.props.title}</div>
										</div>
										<div className="am-modal-body">
											<div className="am-modal-alert-content">{this.props.content}</div>
										</div>
										<div className="am-modal-footer">
											<div className="am-modal-button-group-h">
												{this.props.buttons.map(item => {
													return (
														<span className="am-modal-button" key={item.text} onClick={() => {this.handleClose(item)}}>
															{item.text}
														</span>
													)
												})}
											</div>
										</div>
									</div>
								</div>
						</div>
					</Confirm>:''
				}
			</React.Fragment>
    )
  }
}
Alert.defaultProps={
	title: '标题', content: '确认删除吗?', buttons: [] 
}
function test(target) {
	target.div = document.createElement('div')
	target.show = function() {
		let props = { title: arguments[0], content: arguments[1], buttons: arguments[2] }
		document.body.appendChild(Alert.div)
		ReactDOM.render(React.createElement(Alert, props), Alert.div)
	}
	target.close = function () {
		if (!document.documentElement.contains(Alert.div)) return
		ReactDOM.unmountComponentAtNode(Alert.div)
		document.body.removeChild(Alert.div)
	}
}

export default Alert