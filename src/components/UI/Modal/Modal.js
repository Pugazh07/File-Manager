import React from 'react';

import Backdrop from '../Backdrop/Backdrop';

import styles from './Modal.module.css';

 const modal = (props) => {
     console.log("[Modal.js] props", styles)
     let content=<section>Are you sure to remove "{props.pathToDelete}"</section>
     let footer = (<footer>
        <button className={styles.Cancel} onClick={(e) => props.closeModal(e, false)}>
        Cancel
    </button>
    <button className={styles.Confirm} onClick={(e) => props.closeModal(e, true)}>
        Proceed
    </button>
    </footer>)
     
     if(!props.pathToDelete || props.pathToDelete === "root"){
         if(!props.conditional){
            footer = <footer>
            <button className={styles.Cancel} onClick={(e) => props.closeModal(e, false)}>
                Ok
           </button>
           </footer>
         }
        content = props.pathToDelete === "root" ? <section>"root" folder can't be removed</section> : <section>{props.modalContent}</section>
     }
      
        return(
            <React.Fragment>
                <Backdrop show={props.show} clicked={(e)=>props.closeModal(e, false)} />
                <div 
                className={styles.Modal}
                style={{transform: props.show ? 'translateY(0)' : 'translateY(100vh)',
                opacity: props.show ? '1' : '0'}}>
                    <header>Alert</header>
                    {content}
                    {footer}
                </div>
            </React.Fragment>
        )
}

export default modal;