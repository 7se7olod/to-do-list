import styles from './Popup.module.css';
import React, {Fragment} from "react";
import ReactDom from 'react-dom';


const Popup = ({isVisible = false, title, content, onClose}) => {

    const Modal = () => {
      return (
          <div className={styles['main-popup']}>
              <div className={styles['main-backdrop']} onClick={onClose}></div>
              <div className={styles['window-popup']}>
                  <h1 className={styles['window-popup-title']}>
                      {title}
                  </h1>
                  <div className={styles['window-popup-content']}>
                      {content}
                  </div>
                  <button className={styles['window-popup-button']} onClick={onClose}>Закрыть</button>
              </div>
          </div>
      );
    };

    return !isVisible ? null : (
        <Fragment>
            {ReactDom.createPortal(<Modal/>, document.getElementById('modal'))}
        </Fragment>
    );
};

export default Popup;