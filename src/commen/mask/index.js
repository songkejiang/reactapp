import React, { Component } from 'react'
import { MaskWraper } from './style.js'
import { CSSTransition } from 'react-transition-group'

const Mask = (props)=> {
    return(
        <MaskWraper timeout={props.timeout}   onTouchMove={e => { e.preventDefault() }}>
            <CSSTransition
                in={props.in}
                classNames={props.classNames}
                timeout={props.timeout}
                unmountOnExit={props.unmountOnExit}
            >
                <div className='mask'></div>
            </CSSTransition>
        </MaskWraper>
        
    )
}
export default Mask