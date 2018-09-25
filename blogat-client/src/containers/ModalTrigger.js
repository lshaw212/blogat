import React from "react";

const ModalTrigger = ({ 
  onOpen, text, buttonRef
}) => <button className="infoBtn" onClick={onOpen} ref={buttonRef}>{text}</button>

export default ModalTrigger;