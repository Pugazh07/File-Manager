import React from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/action'
import './SelectedContent.css';

const SelectedContent = (props) =>{
    console.log(props.selectedContent)
    return<div className="SelectedContent">
        <section className="SelectedItem SelectedContentHeader">
            <div>
                Name
            </div>
            <div>
                Type
            </div>
            <div>
                Size
            </div>
        </section>
        <section>
            {props.selectedContent.map(item =>{
                return(
                        <section
                    className={`SelectedItem SelectedItemContent ${props.selectedPath === item.path ? 'active' : null}`}
                    key={item.path}
                        >
                        <div>
                        <i className={`mr-1 ${item.type === 'application/directory' ? "fa fa-folder" : "fa fa-file"}`}></i>
                        {item.name}
                        </div>
                        <div>
                            {item.type}
                        </div>
                        <div>
                            {item.size}
                        </div>
                    </section>
                )
            })}
            
        </section>
        <section>
            
        </section>
        {/* <FontAwesomeIcon icon="download" /> */}
    </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(SelectedContent);