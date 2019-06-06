import styled, { keyframes } from 'styled-components'
export const MaskWraper = styled.div`
    .fadeIn-enter{
      opacity: 0.01;
    }
   .fadeIn-enter-active {
      opacity: 1;
      transition: opacity ${props => props.timeout/1000}s linear;
    }
    .fadeIn-exit{
      opacity: 1;
    }
   .fadeIn-exit-active {
      opacity: 0;
      transition: opacity ${props => props.timeout/1000}s linear;
   }
   .mask{
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        height: 100%;
        z-index: 999;
        background-color: rgba(0,0,0,.4);
   }
`