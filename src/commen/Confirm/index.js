import ReactDOM from 'react-dom'
import React from 'react'
import {Confirm} from './style.js'
const Alert = props => {
  return (
    <Confirm className="mask" onTouchMove={(e) =>{e.preventDefault()}}>
			<div className='am-modal-mask'></div>
			<div className='am-modal-wrap'>
					<div className='am-modal am-modal-transparent'>
							<div className='am-modal-content'>
								<div className='am-modal-header'>
									 <div className='am-modal-title'>水电费</div>
								</div>
								<div className='am-modal-body'>
										<div className='am-modal-alert-content'>
											水电费水电费
										</div>
								</div>
								<div className='am-modal-footer'>
										<div className='am-modal-button-group-h'>
												<a className='am-modal-button'>Cnacel</a>
												<a className='am-modal-button'>Ok</a>
										</div>
								</div>
							</div>
					</div>
			</div>
      <p>{props.title}</p>
      <p>{props.content}</p>
      <div>
        {props.cbs.map((item, index) => {
          return (
            <span key={index} onClick={item.onPress}>
              {item.text}
            </span>
          )
        })}
      </div>
    </Confirm>
  )
}

export default Alert

Alert.show = function() {
  let props = { title: arguments[0], content: arguments[1], cbs: arguments[2] }
  let div = document.createElement('div')
  document.body.appendChild(div)
  ReactDOM.render(React.createElement(Alert, props), div)
}
