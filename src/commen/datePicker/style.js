import styled, { keyframes } from 'styled-components'

export const PikerWraper = styled.div`
  .slideUp-enter {
    transform: translateY(100%);
  }
  .slideUp-enter-active {
    transform: translateY(0%);
    transition: all 0.3s linear;
  }
  .slideUp-exit {
    transform: translateY(0%);
    transition: all 0.3s linear;
  }
  .slideUp-exit-active {
    transform: translateY(100%);
  }
  position: fixed;
  height: 0%;
  bottom: 0;
  .pickerMain {
    position: fixed;
    width: 100%;
    bottom: 0;
    top: 100px;
    background: #fff;
		z-index: 1000;
		.colorRed {
			color: red;
		}
    .header {
      text-align: center;
      height: 35px;
      line-height: 35px;
      font-size: 18px;
      .cancel {
        float: left;
        width: 50px;
        font-size: 16px;
      }
      .confirm {
        float: right;
        width: 50px;
        font-size: 16px;
        color: #108ee9;
      }
    }
    .week {
      display: flex;
      font-size: 12px;
      height: 20px;
      span {
        flex: 1;
      }
    }
    .dayBody {
      overflow-y: auto;
      position: absolute;
      bottom: 0;
      top: 65px;
      width: 100%;
      left: 0;
      .yearMon {
        text-align: center;
        font-size: 16px;
        background: #f7f7f7;
        height: 36px;
        line-height: 36px;
      }
      .dayWraper {
				overflow:hidden;
        .day {
          float: left;
          width: 14.282%;
          height: 9vh;
          line-height: 9vh;
          text-align: center;
          list-style: none;
          font-size: 14px;
          border-radius: 3px;
          position: relative;
          &.canSelect {
            background: #ddf1fc;
            /* color: #000; */
          }
          &.select {
            background: #1b9ff1;
            color: #fff;
          }
          .liveHint {
            position: absolute;
            display: inline-block;
            background: rgba(0, 0, 0, 0.5);
            color: #fff;
            padding: 5px;
            line-height: 1em;
            font-size: 12px;
            white-space: nowrap;
            left: 50%;
            transform: translateX(-50%);
            bottom: 109%;
            &::after {
              content: '';
              position: absolute;
              width: 0;
              height: 0;
              border-width: 4px;
              border-color: rgba(0, 0, 0, 0.5) transparent transparent
                transparent;
              border-style: solid;
              left: 50%;
              bottom: -8px;
              transform: translateX(-50%);
            }
          }
          .sideLeft {
            left: 0%;
            transform: translateX(0%);
          }
          .sideRight {
            right: 0%;
            left: auto;
            transform: translateX(0%);
          }
        }
      }
    }
  }
`
