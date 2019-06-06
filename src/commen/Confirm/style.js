import styled, { keyframes } from 'styled-components'
const scaleAnim = keyframes`
   0% {transform: scale(0.3)}
   30% {transform: scale(0.5)}
   50% {transform: scale(0.8)}
  70% {transform: scale(1.2)}
  100% {transform: scale(1)}
`
const scaleAnimOut = keyframes`
    0% {transform: scale(1); opacity:1}
    30% {transform: scale(1.2)}
    100% {transform: scale(0); opacity:0}
`
export const Confirm = styled.div`
   .fadeIn-enter{
     opacity: 0.01;
   }
   .fadeIn-enter-active {
      opacity: 1;
      transition: opacity .2s ease-in;
    }
    .fadeIn-exit{
      opacity: 1;
    }
   .fadeIn-exit-active {
      opacity: 0;
      transition: opacity .2s ease-in;
   }
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    z-index: 999;
    .am-modal-mask{
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        height: 100%;
        z-index: 999;
        background-color: rgba(0,0,0,.4);
    }
    .am-modal-wrap{
        position: fixed;
        overflow: auto;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 100%;
        z-index: 999;
        -webkit-overflow-scrolling: touch;
        outline: 0;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-transform: translateZ(1px);
        transform: translateZ(1px);
        .am-modal{
            width: 270px;
            position: relative;
            &.bounceIn{
              animation: ${scaleAnim} .2s ease-in forwards;
            }
            &.bounceOut{
                animation: ${scaleAnimOut} .2s linear forwards;
            }
        }
        .am-modal-content{
            border-radius: 7px;
            padding-top: 15px;
            position: relative;
            background-color: #fff;
            border: 0;
            background-clip: padding-box;
            text-align: center;
            height: 100%;
            overflow: hidden;
            .am-modal-header{
                padding: 6px 15px 15px;
                .am-modal-title{
                    margin: 0;
                    font-size: 18px;
                    line-height: 1;
                    color: #000;
                    text-align: center;
                }
            }
            .am-modal-body{
                padding: 0 15px 15px;
                font-size: 15px;
                color: #888;
                height: 100%;
                line-height: 1.5;
                overflow: auto;
            }
            .am-modal-footer{

            }
            .am-modal-button-group-h{
                position: relative;
                border-top: 1px solid #ddd;
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
            }
            .am-modal-button{
                -webkit-touch-callout: none;
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                -ms-flex: 1;
                flex: 1;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                text-align: center;
                text-decoration: none;
                outline: none;
                color: #108ee9;
                font-size: 18px;
                height: 50px;
                line-height: 50px;
                display: block;
                width: auto;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .am-modal-button:first-child{
                color: #000;
            }
            .am-modal-button:last-child{
                position: relative;
                border-left: 1px solid #ddd;
            }
        }
        

    }
`