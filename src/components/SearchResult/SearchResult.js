import React from 'react';

import './SearchResult.css'

const SearchResult = (props) =>{
    console.log(props)
    return(<div className="SearchResult">
        {props.item.path}
    </div>)
}

export default SearchResult;