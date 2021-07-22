import * as actionTypes from './action';

const initialState={
    root: [{
        parent: null,
        path: "root",
        name: "root",
        type: "application/directory",
        dirCount: 3,
        fileCount: 1,
        children: [
            {
                parent: "root",
                path: "root/folder1",
                name: "folder1",
                type: "application/directory",
                dirCount: 1,
                fileCount: 1,
                children: [
                    {
                        parent: "root/folder1",
                        path: "root/folder1/folder1",
                        name: "folder1",
                        type: "application/directory",
                        dirCount: 0,
                        fileCount: 0,
                        children: []
                    },
                    {
                        parent: "root/folder1",
                        type: "application/file",
                        name: "file1.txt",
                        path: "root/folder1/file1.txt"
                    }
                ]
            },
            {
                parent: "root",
                path: "root/folder2",
                name: "folder2",
                type: "application/directory",
                dirCount: 0,
                fileCount: 2,
                children: [
                    {
                        parent: "root/folder2",
                        type: "application/file",
                        name: "file1.txt",
                        path: "root/folder2/file1.txt"
                    },
                    {
                        parent: "root/folder2",
                        type: "application/file",
                        name: "file2.txt",
                        path: "root/folder2/file2.txt"
                    },
                ]
            },
            {
                parent: "root",
                path: "root/folder3",
                name: "folder3",
                type: "application/directory",
                dirCount: 0,
                fileCount: 1,
                children: [
                    {
                        parent: "root/folder3",
                        type: "application/file",
                        name: "file1.txt",
                        path: "root/folder3/file1.txt"
                    }
                ]
            },
            {
                parent: "root",
                type: "application/file",
                name: "file1.txt",
                path: "root/file1.txt"
            }
        ]
    }],
    selectedPath: null,
    selectedPathParent: null,
    selectedPathType: null,
    selectedPathDirCount: null,
    selectedPathFileCount: null,
    addItem: {
        type: null,
        target: null,
        renameItem: false
    },
}

const reducer = (state=initialState, action) =>{
    switch(action.type){
        case actionTypes.SELECTPATH:
            console.log("SelectPath triggered")
            {
                const pathKeys=action.value.path.split("/").slice(1);
            let selectedContent = null;
            let i=0;
            function selectPath(child){
                if(action.value.path === child.path || action.value.path === state.root[0].path){
                    if(action.value.pathType === 'application/directory'){
                        selectedContent = [...child.children]
                    }
                    else if(action.value.pathType === 'application/directory'){
                        selectedContent = {downloadOption: true}
                    }
                }
                else if(child.children){
                    let index = child.children.findIndex(ele => ele.name === pathKeys[i])
                    i++
                    selectPath(child.children[index])
                }
            }
            action.value.expand && selectPath(state.root[0])
            console.log(selectedContent)
            return action.value.expand ? {
                ...state,
                selectedPath: action.value.path,
                selectedPathParent: action.value.pathParent,
                selectedPathType: action.value.pathType,
                selectedPathDirCount: action.value.dirCount,
                selectedPathFileCount: action.value.fileCount,
                selectedContent: selectedContent,
                selectedFrom: action.value.origin,
                searchResult: null
            } : {
                ...state,
                selectedPath: action.value.path,
                selectedPathParent: action.value.pathParent,
                selectedPathType: action.value.pathType,
                selectedPathDirCount: action.value.dirCount,
                selectedPathFileCount: action.value.fileCount,
                selectedFrom: action.value.origin,
                searchResult: null
            }
        }
        case actionTypes.DELETEITEM:
            console.log("DeleteItem triggered")
            {
                const pathKeys=state.selectedPath.split("/").slice(1);
            let item=JSON.parse(JSON.stringify(state.root))
            let selectedContent = null;
            let length=pathKeys.length
            let i=0;
            function deleteItem(child){
                if(i === length-1){
                    child.children=child.children.filter(ele => ele.path !== state.selectedPath)
                    selectedContent=[...child.children]
                }
                else if(child.children){
                    let index = child.children.findIndex(ele => ele.name === pathKeys[i])
                    i++
                    deleteItem(child.children[index])
                }
            }
            deleteItem(item[0])
            return {
                ...state,
                root: item,
                selectedPath: null,
                selectedPathParent: null,
                selectedPathType: null,
                selectedPathDirCount: null,
                selectedPathFileCount: null,
                selectedContent: selectedContent
            }
            }
            
        case actionTypes.ADDITEM:
            console.log("AddItem triggered")
            if(state.selectedPathType){
                let targetFolder = state.selectedPathType === "application/directory" ? state.selectedPath : state.selectedPathParent;
                let inputValue = null;
                if(action.value === 'application/directory'){
                    inputValue=`folder${state.selectedPathDirCount + 1}`
                }
                else if(action.value === "application/file"){
                    inputValue=`file${state.selectedPathFileCount + 1}.txt`
                }
                return{
                    ...state,
                    addItem: {type: action.value, target: targetFolder, inputValue: inputValue}
                }
            }
            break
        case actionTypes.SAVEITEM:
            console.log("SaveItem triggered")
            let updateItem=JSON.parse(JSON.stringify(state.root))
            const pathKey=state.selectedPath.split("/").slice(1);
            // console.log(pathKey)
            let dirCount = state.selectedPathDirCount;
            let fileCount = state.selectedPathFileCount;
            let renameItem = state.addItem.renameItem;
            let selectedPath = null;
            let duplicateError = null;
            let selectedContent = null;
            let j=0
            function saveItem(child){
                // console.log(child)
                // console.log(state.addItem.target)
                if(state.addItem.target === child.path || state.selectedPath === state.root[0].path || (renameItem && (state.selectedPath === state.root[0].path || state.selectedPathParent === child.path))){
                    let index = child.children.findIndex( ele => ele.name === action.value.name && ele.type === state.addItem.type)
                    duplicateError = index >=0 ? `${action.value.name} already present in this folder` : null;
                    if(!duplicateError){
                        if(state.addItem.renameItem){
                            let index = child.children.findIndex(ele => ele.path === state.selectedPath)
                            child.children[index].name = action.value.name
                            child.children[index].path = child.path + "/" + action.value.name
                            selectedPath = child.children[index].path
                        }
                        else{
                            if(state.addItem.type === "application/directory"){
                                child.children=child.children.concat({
                                    parent: child.path,
                                    path: child.path + "/" + action.value.name,
                                    name: action.value.name,
                                    type: state.addItem.type,
                                    dirCount: 0,
                                    fileCount: 0,
                                    children: []
                                })
                                child.dirCount = child.dirCount + 1
                                dirCount = child.dirCount
                            }
                            else{
                                child.children=child.children.concat({
                                    parent: child.path,
                                    type: state.addItem.type,
                                    name: action.value.name,
                                    path: child.path + "/" + action.value.name,
                                    date: action.value.choosenFile.data
                                })
                                child.fileCount = child.fileCount + 1
                                fileCount = child.fileCount
                            }
                        }
                    
                    child.children.sort((a,b) => {
                        return a.type === b.type ? (a.name > b.name ? 1 : -1) : (a.type > b.type ? 1 : -1)
                    })
                    selectedContent=[...child.children]
                }}
                else if(child.children){
                    let index = child.children.findIndex(ele => ele.name === pathKey[j])
                    j++
                    saveItem(child.children[index])
                }
            }
            saveItem(updateItem[0])
            return !duplicateError ? {
                ...state,
                root: updateItem,
                addItem: {
                    type: null,
                    target: null,
                    error: duplicateError
                },
                selectedPath: selectedPath ? selectedPath : state.selectedPath,
                selectedPathDirCount: dirCount,
                selectedPathFileCount: fileCount,
                selectedContent: selectedContent
            } : {
                ...state,
                addItem: {
                    ...state.addItem,
                    error: duplicateError
                },
            }
        case actionTypes.CANCELITEM:
            console.log("CancelItem triggered")
            return{
                ...state,
                addItem: {
                    type: null,
                    target: null,
                    renameItem: false
                }
            }
        case actionTypes.RENAMEITEM:
            return{
                ...state,
                addItem: {
                    ...state.addItem,
                    type: action.value,
                    renameItem: true,
                    error: null
                }
            }
        case actionTypes.SEARCHITEMS:
            console.log(action.type, "triggered", action.value);
            {
                let searchResult = []
                function searchItem(child){
                    if(child.name.toLowerCase().indexOf(action.value) >= 0){
                        searchResult.push(child)
                    }
                    if(child.children){
                        child.children.forEach(element => {
                            searchItem(element)
                        });
                    }
                }
                searchItem(state.root[0])
                console.log(searchResult)
                return{
                    ...state,
                    selectedContent: null,
                    searchResult: searchResult
                }
            }
        default:
            break
    }
    return state
}

export default reducer;