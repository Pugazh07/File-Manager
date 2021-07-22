import React, { useState } from 'react';

const Input = (props) =>{
    const [inputElementConfig, setInputElementConfig]=useState({
        value: null,
        istouched: false
      });
    console.log(props)
    return(
        <input
                  type={props.type}
                  className={props.className}
                  value={inputElementConfig.istouched ? inputElementConfig.value : props.value}
                  autoFocus={props.autoFocus}
                  onFocus={(e)=> {
                    e.stopPropagation();
                    e.currentTarget.select();
                  }}
                  onChange={(e)=>{
                    setInputElementConfig({value: e.currentTarget.value, istouched: true})
                  }}
                  onBlur={(e)=>{
                    e.stopPropagation();
                    if(e.currentTarget.value !== props.value || props.addItem){
                      props.onSaveItem(e.currentTarget.value)
                    }
                    else
                    {
                      props.onCancelItem()
                    }
                    setInputElementConfig({value: null, istouched: false})
                  }}
                  onClick={(e)=>{
                      e.stopPropagation();
                  }}
                  onKeyDown={(e)=>{
                    e.stopPropagation();
                    switch (e.key){
                      case "Enter":
                        if(e.currentTarget.value !== props.value || props.addItem){
                          props.onSaveItem(e.currentTarget.value)
                        }
                        else{
                            props.onCancelItem()
                        }
                        setInputElementConfig({value: null, istouched: false})
                        break
                      case "Escape":
                        props.onCancelItem()
                        setInputElementConfig({value: null, istouched: false})
                        break
                      default:
                        break
                    }
                  }}
                  size={props.size}/>
    )
}

export default Input;