import "./Modal.scss";
import  styled  from 'styled-components';
import "../../css/variable.scss"
// Modal
export const ModalBackDrop = styled.div`
  background: ${props => props?.background}; 
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;`

export const ModalWrapper = styled.div`
  background: var(--bg-color);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  margin: ${props => props.marginTop}% auto 0 auto;
  overflow: hidden;
  animation: minimise 1000ms linear;
  -webkit-animation: minimise 1000ms linear;
  -moz-animation: minimise 1000ms linear;
  animation-name: bounce;
  -webkit-animation-name: bounce;
  -moz-animation-name: bounce;
  transition: all 0.4s linear;
  border-radius:5px;
  z-index: ${props => props?.zIndex};`


export const ModalHeader = styled.div`
  display: flex;
  background: var(--secondary-bg-color);
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  color: var(--text-color);
  height: ${props => props.height}px;
  font-size: 12px;
  & .modal-header-btn-container{
    display:flex;
  }
  & .modal-header-btn{
    background-color: var(--btn-bg-color);
    color: var(--second-text-color);
    width: 30px;
    text-align:center;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius : 3px;
    padding:1px 5px;
    transition: all 0.4s linear;
    margin-left: 2px; 
    &:hover{
      opacity: .5;
    }
  }
`
export const ModalContent = styled.div`
  height: ${props => props.height}px;
  width: 100%;
  overflow: hidden;
  transition: all 0.4s linear;
`

export const ModalFooter = styled.div`
  height: ${props => props.height}px;
  width: 100%;
  background: var(--secondary-bg-color);
  transition: all 0.4s linear;
  display :flex;
  align-items: center;
  padding : 0 5px;
  & button,
  & > a {
    @include Button();
    padding: 8px 20px;
    display: inline-block;
    background: ${props => props.button.backgroundColor};
    font-size: 12px;
    font-family: inherit;
    color: ${props => props.button.textColor};
    text-align: center;
    outline: none;
    border: 1px solid transparent;
    border-radius: 3px;
    margin: 5px 3px;
    cursor: pointer;
    & span > i{
      margin-left: 5px;
    }
    & a{
      color: ${props => props.button.textColor};
    }
  }
  // & button:hover,
  // & > a:hover {
  //   opacity: .5;
  //   border: 1px solid transparent;
  //   transition: all 0.5s;
  //   & a{
  //     color:${props => props.button.hover.textColor} ;
  //   }
  }

`
