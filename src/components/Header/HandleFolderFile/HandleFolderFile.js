import React, { useState } from 'react';
import { connect } from 'react-redux';

import './HandleFolderFile.css';
import Modal from '../../UI/Modal/Modal';
import * as actionTypes from '../../../store/action';

// import DeleteFolderFile from '../DeleteFolderFile/DeleteFolderFile';

const HandleFolderFile = (props) => {
    const [modalVisiblity, setModalVisiblity]=useState(false);
    const [chooseFile, setChooseFile]=useState({
        enable: false,
        choosenFile: null
    });
    const modalContent = "Please select a path";
    console.log(chooseFile.choosenFile)
    const openModalHandler = (event) => {
        event.stopPropagation();
        setModalVisiblity(true)
    }
    const closeModalHandler = (e, confirmation) =>{
        e.stopPropagation();
        if(modalVisiblity){
            if(confirmation === true){
                props.onDeleteItem()
            }
            setModalVisiblity(false)
        }
        else if(props.addItem.error){
            props.onCancelItem()
        }
        else if(chooseFile.enable){
            if(chooseFile.choosenFile && confirmation === true){
                props.onSaveItem(chooseFile.choosenFile)
            }
            setChooseFile({
                enable: false,
                choosenFile: null
            })
        }
    }
    const onChangeHandler = (e) =>{
        e.stopPropagation();
        let files = e.target.files;
        props.onAddItem("application/file")
        // console.log(files[0])
        let reader = new FileReader();
        reader.readAsDataURL(files[0])
        reader.onload = (e) => {
            // console.log("file data", e.target.result)
            setChooseFile({enable: chooseFile.enable, choosenFile: {
                file: files[0],
                data: e.target.result
            }})
        }
        
    }
    return(
        <div className="HandleFolderFile">
            <button className="button" disabled={!props.selectedPath || props.selectedPath===props.root.path} onClick={()=>props.onRenameItem(props.selectedPathType)}>
                Rename
            </button>
            <button className="button" disabled={!props.selectedPath || props.selectedPathType==="application/file"} onClick={()=>{props.onAddItem("application/directory")}}>
                Add Folder
            </button>
            {/* <button className="button" disabled={!props.selectedPath || props.selectedPathType==="application/file"} onClick={()=>{props.onAddItem("application/file")}}>
                Add File
            </button> */}
            <button className="button" disabled={!props.selectedPath || props.selectedPathType==="application/file"}
            onClick={()=>{
                // props.onAddItem("application/file")
                setChooseFile({
                    enable: true,
                    choosenFile: chooseFile.choosenFile
                })
            }}>
                Add File
            </button>
            <button className="DeleteFolderFile button" disabled={!props.selectedPath || props.selectedPath===props.root.path} onClick={openModalHandler}>
                Delete
            </button>
            {/* <DeleteFolderFile openModal={openModalHandler}/> */}
            {modalVisiblity ? <Modal
                                show={modalVisiblity}
                                conditional={true}
                                modalContent={modalContent}
                                pathToDelete={props.selectedPath}
                                closeModal={closeModalHandler}/> : null}
            {props.addItem.error ? <Modal
                                show={props.addItem.error}
                                conditional={false}
                                modalContent={props.addItem.error}
                                pathToDelete={null}
                                closeModal={closeModalHandler}/> : null}
            {chooseFile.enable ? <Modal
                        show={chooseFile.enable}
                        conditional={true}
                        modalContent={<input type='file' name='file' onChange={(e)=>onChangeHandler(e)}/>}
                        closeModal={closeModalHandler}/> : null}
        </div>
    )   
}

const mapStateToProps = state =>{
    return{
        root: state.root[0],
        selectedPath: state.selectedPath,
        selectedPathType: state.selectedPathType,
        addItem: state.addItem
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onAddItem: (itemType) => dispatch({type: actionTypes.ADDITEM, value: itemType}),
        onDeleteItem: () => dispatch({type: actionTypes.DELETEITEM}),
        onRenameItem: (itemType) => dispatch({type: actionTypes.RENAMEITEM, value: itemType}),
        onCancelItem: () => dispatch({type: actionTypes.CANCELITEM}),
        onSaveItem: (choosenFile) =>dispatch({type: actionTypes.SAVEITEM , value: {name: choosenFile.file.name, choosenFile: choosenFile} })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HandleFolderFile);