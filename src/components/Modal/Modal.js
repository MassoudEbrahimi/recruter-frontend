import {ModalBackDrop, ModalWrapper, ModalContent, ModalFooter, ModalHeader} from "./Modal.Styled";
import {ToastContainers} from "../../helpers";
import React , {Fragment} from "react";

const baseColor = "var(--btn-bg-color)";
const baseTextColor = "var(--text-color)";

const initBackdrop = {enable: true};
const initWrapper = {style: {width: 500, height: 220, marginTop: 5, zIndex: 21}};
const initHeader = {
    title: "Header",
    content: null,
    //todo if you need button header add => items: [{icon: "", text: "", eventHandler: null}],
    style: {backgroundColor: "var(--btn-bg-color)", textColor: "var(--text-color)", height: 50}
};
const initContent = {style: {height: 120}};
const initFooter = {
    //todo if you need button footer add => items: [{icon: "", text: "", eventHandler: null}],
    style: {
        height: 50, backgroundColor: "#132743",
        button: {
            backgroundColor: baseTextColor, textColor: "#132743",
            hover: {textColor: baseTextColor, backgroundColor: "#33588b"}
        }
    }
};
const initToast = {enable: false, position: "top-right", containerId: "D"}

const Modal = (props) => {
    const backdrop = {...initBackdrop, ...props?.backdrop};
    const wrapper = {...initWrapper, ...props?.wrapper, style: {...initWrapper.style, ...props.wrapper?.style}};
    const header = {...initHeader, ...props?.header, style: {...initHeader.style, ...props.header?.style}};
    const content = {...initContent, ...props?.content, style: {...initContent.style, ...props.content?.style}};
    const footer = {...initFooter, ...props?.footer, style: {...initFooter.style, ...props?.footer?.style}};
    const toast = {...initToast, ...props?.toast};


    const renderHeader = () => <ModalHeader backgroundColor={header?.style.backgroundColor} textColor={header?.style.textColor} height={header?.style.height}>
        {header?.content}
        {header?.title && <div>
            {header?.title || null}
        </div>}
        {header?.items && <div className="modal-header-btn-container">
            {header?.items
                .map((btn , index) =>
                    <div onClick={btn.eventHandler} key={index} className="modal-header-btn" style={{backgroundColor: btn?.background || baseColor , color : btn.color ||  baseTextColor}}>
                        {btn?.icon && <span><i className={btn.icon}/></span>}
                        {btn?.text && <span>{btn.text}</span>}
                    </div>
                )}
        </div>}
    </ModalHeader>
    const renderContent = () => <ModalContent height={content.style.height}>
        {props.children}
    </ModalContent>
    const renderFooter = () => <ModalFooter height={footer.style.height} backgroundColor={footer.style.backgroundColor} button={footer.style.button}>
        {footer?.items ? footer?.items
            .map((btn , index) =>
                btn?.link ?
                    <Fragment key={index}>
                        {btn.text}
                    </Fragment>:
                <button onClick={btn.eventHandler} key={index} style={{backgroundColor: btn?.background || baseColor , color : btn.color ||  baseTextColor}}>
                    {btn?.icon && <span><i className={btn.icon}/></span>}
                    {btn?.text && <span>{btn.text}</span>}
                </button>
            ) : null}
    </ModalFooter>
    const renderToast = () => toast?.enable && ToastContainers(toast.position , toast.containerId)
    const renderWrapper = () => <ModalWrapper width={wrapper.style.width} height={wrapper?.style.height} marginTop={wrapper.style.marginTop} zIndex={wrapper?.style.zIndex}>
        {renderToast()}
        {renderHeader()}
        {renderContent()}
        {renderFooter()}
    </ModalWrapper>

    return (
            <ModalBackDrop background={backdrop?.enable ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0)"}>
                {renderWrapper()}
            </ModalBackDrop>
    )
}
export default Modal;
