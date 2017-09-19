/// </summary>
/// <param name="rows">行结构数据</param> 
/// <param name="attributes">属性信息</param> 
export function convertTreeData(rows, attributes) {
    var keyNodes = {}, parentKeyNodes = {};
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        row.id = row[attributes.keyField];
        row.parentId = row[attributes.parentKeyField];
        row.text = row[attributes.textField];
        row.children = [];

        keyNodes[row.id] = row;

        if (parentKeyNodes[row.parentId]) { parentKeyNodes[row.parentId].push(row); }
        else { parentKeyNodes[row.parentId] = [row]; }

        var children = parentKeyNodes[row.id];
        if (children) { row.children = children; }

        var pNode = keyNodes[row.parentId];
        if (pNode) { pNode.children.push(row); }
    }
    return parentKeyNodes[attributes.rootKey];
}