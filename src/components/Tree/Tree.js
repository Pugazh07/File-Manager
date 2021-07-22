import React from 'react';

import TreeNode from '../TreeNode/TreeNode'
import './Tree.css';

const Tree = ({data=[], onSelectPath, selectedPath}) => {
    // console.log("[Tree.js data]",selectedPath.split("/"))
    return <ul className="TreeContainer">
            {data.map(tree => (
                <TreeNode
                key={tree.path}
                node={tree}
                onSelectPath={onSelectPath}
                selectedPath={selectedPath}/>
            ))}
        </ul>
}

export default Tree;