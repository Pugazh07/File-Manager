import React from 'react';

import './Header.css';

import Search from './Search/Search';
import HandleFolderFile from './HandleFolderFile/HandleFolderFile';

const Header = (props) => {
    return(
        <div className="Header">
            <Search onSearchItems={props.onSearchItems}/>
            <HandleFolderFile/>
        </div>
    )   
}

export default Header;