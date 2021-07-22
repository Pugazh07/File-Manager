import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/action'

import Tree from '../../components/Tree/Tree';
import Header from '../../components/Header/Header';
import SearchResult from '../../components/SearchResult/SearchResult';

import './fileManager.css';
import SelectedContent from '../../components/SelectedContent/SelectedContent';

class FileManager extends Component {
    render(){
        let selectedContent = this.props.selectedPath ? <p>Selected path: {this.props.selectedPath}</p> : "Please select a folder/file";
        let searchResultList = null;
        console.log(this.props)
        // if(this.state.selectedContent){
        //     sel
        // }
        if(this.props.searchResult){
            searchResultList = this.props.searchResult.length > 0 ? this.props.searchResult.map( result => (
                <SearchResult key={result.path} item={result}/>
            )) : "No results Found";
        }
        return <div className="FileManager">
            <section>
                <Header onSearchItems={this.props.onSearchItems}/>
            </section>
            <div className="Container">
            <section
            className="TreeView"
            /* onClick={(e) => {
                this.props.onSelectPath(null)}} */
                >
                <Tree data={this.props.root} onSelectPath={this.props.onSelectPath} selectedPath={this.props.selectedPath}/>
            </section>
            <section className="Content">
                {/* <Route path={this.props.selectedPath} render={()=>selectedContent} /> */}
                {selectedContent}
                {searchResultList && <div>
                    {/* <Route path='/search' render={() =>searchResultList} /> */}
                    <h1>Search result</h1>
                    {searchResultList}
                </div>}
                {this.props.selectedContent && <SelectedContent
                                            selectedContent={this.props.selectedContent}
                                            selectedPath={this.props.selectedPath}
                                            onSelectPath={this.props.onSelectPath}/>}
            </section>
            </div>
        </div>
    }
}

const mapStateToProps = state =>{
    return{
        root: state.root,
        selectedPath: state.selectedPath,
        searchResult: state.searchResult,
        selectedContent: state.selectedContent,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onSelectPath: (path, parent, type, dirCount, fileCount, expand, origin) => dispatch(
            {
                type: actionTypes.SELECTPATH,
                value: {path: path, pathParent: parent, pathType: type, dirCount: dirCount, fileCount: fileCount, expand: expand, origin: origin}
            }),
        onSearchItems: (searchKey) => dispatch({type: actionTypes.SEARCHITEMS, value: searchKey}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FileManager)