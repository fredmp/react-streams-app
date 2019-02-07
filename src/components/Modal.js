import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  const { title, content, actions, onDismiss } = props;
  return ReactDOM.createPortal(
    <div className="ui dimmer modals visible active" onClick={onDismiss}>
      <div
        className="ui standard modal visible active"
        onClick={e => e.stopPropagation()}
      >
        {title && <div className="header">{title}</div>}
        {content && <div className="content">{content}</div>}
        {actions && <div className="actions">{actions}</div>}
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
