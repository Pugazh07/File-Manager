import React from 'react';

const DeleteFolderFile = (props) => {
    return(
        <button className="DeleteFolderFile button" onClick={props.openModal}>
            Delete
        </button>
    )   
}



export default DeleteFolderFile;