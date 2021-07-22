import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux'

import * as actionTypes from '../../store/action'
import Tree from '../Tree/Tree';
import Input from '../UI/Input/Input';

const TreeNode = ({node, onSelectPath, selectedPath, addItem, onSaveItem, onCancelItem}) =>{
    // if(addItem.target === node.path) console.log("[Tree.js addItem]",addItem)
    const [childVisible, setChildVisiblity]=useState(false);    
    // const [inputElementConfig, setInputElementConfig]=useState({
    //   value: null,
    //   istouched: false
    // });
    
    const hasChild = node.children ? true : false;
    return (
        <li className="TreeNode" >
          <div >
            {hasChild && (
              <div
                className={`NodeToggler ${
                  childVisible ? "active" : ""
                }`}
              >
                <FontAwesomeIcon onClick={() => {setChildVisiblity(!childVisible)}} icon="caret-right" />
              </div>
            )}
    
            <span
            className={selectedPath === node.path ? "active" : null}
            onClick={(e)=>{
                e.stopPropagation()
                
                onSelectPath(node.path, node.parent, node.type, node.dirCount, node.fileCount, true, 'tree')}}
            onDoubleClick={(e) => {
              e.stopPropagation();
              setChildVisiblity(!childVisible)}}>
              <i className={`mr-1 ${node.type === 'application/directory' ? "fa fa-folder" : "fa fa-file"}`}></i>
              {!(addItem.renameItem && selectedPath === node.path) ? node.name : (
                <Input
                  type='text'
                  value={node.name}
                  autoFocus={true}
                  size={4}
                  onSaveItem={onSaveItem}
                  onCancelItem={onCancelItem}/>
                  )}

            </span>
          </div>

          {addItem.type === 'application/directory' && node.path === addItem.target && <Input
            type="text"
            className="Input"
            value={addItem.inputValue}
            autoFocus={true}
            addItem={addItem}
            size={3}
            onSaveItem={onSaveItem}
            onCancelItem={onCancelItem}/>}

          {hasChild && node.children.length > 0 && childVisible && (
              <ul className="TreeContainer">
                <Tree data={node.children} onSelectPath={onSelectPath} selectedPath={selectedPath}/>
              </ul>
          )}
        </li>
      );

    }

const mapStateToProps = state => {
  return {
    addItem: state.addItem,
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onSaveItem: (itemName)=>dispatch({type: actionTypes.SAVEITEM, value: {name: itemName }}),
    onCancelItem: ()=>dispatch({type: actionTypes.CANCELITEM})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(TreeNode);