import React, { useState } from 'react';

import './Search.css';

const Search = (props) => {
    const [searchKey, setSearchKey] = useState('');
    return(
        <div className="Search">
            <div className="SearchBar">
                <input
                className="SearchInput"
                value={searchKey}
                placeholder="Search"
                onFocus={(e)=>{e.currentTarget.select()}}
                onChange={
                    (e)=>{
                        setSearchKey(e.target.value)
                    }
                }
                onKeyUp={(e)=>{
                    e.stopPropagation();
                    switch (e.key){
                      case "Enter":
                        props.onSearchItems(searchKey.toLowerCase())
                        break
                      default:
                        break
                    }
                  }}
                />
                <span className="SearchIcon" onClick={searchKey ? ()=>{props.onSearchItems(searchKey.toLowerCase())} : null}>
                    <i className="fa fa-search"></i>
                </span>
            </div>
            
        </div>
    )   
}

export default Search;