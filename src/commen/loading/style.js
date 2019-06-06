import styled, {keyframes} from 'styled-components'

const cirleAnim = keyframes`
   100% {
     transform: rotate(360deg);
   }
`
export const LoadWraper = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    transform: translateZ(1px);
    position: fixed;
    width: 100%;
    z-index: 1999;
    font-size: 14px;
    text-align: center;
    .main {
        max-width: 50%;
        min-width: 60px;
        border-radius: 3px;
        color: #fff;
        background-color: rgba(58, 58, 58, 0.9);
        line-height: 1.5;
        padding: 9px 15px;
        .loading_icon{
            animation: ${cirleAnim} 1s linear infinite;
            width: 36px;
            height: 36px;
            fill: currentColor;
            background-size: cover;
        }
    }
`
