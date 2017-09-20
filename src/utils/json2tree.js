/// </summary>
/// <param name="rows">行结构数据</param> 
/// <param name="attributes">属性信息</param> 
 function convertTreeData(rows, attributes) {
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

var tree_raw_data = [];
export function init_tree_raw_data(node) {
    tree_raw_data = [];
}
export function add_tree_raw_data(node) {
    tree_raw_data.push(node);
}

export function edit_tree_raw_data(node) {
    for (var n in tree_raw_data) {
        if (tree_raw_data[n].id == node.id) {
            tree_raw_data[n].label = node.label;
            break;
        }
    }
}

export function del_tree_raw_data(node) {
    for (var n in tree_raw_data) {
        if (tree_raw_data[n].id == node.id) {
            tree_raw_data.splice(n, 1);
            break;
        }
    }
}

export function convert_tree_raw_data2tree() {
    /// 属性配置信息
    var attributes = {
        // 标识字段名
        keyField: 'id',
        // 上级标识字段名
        parentKeyField: 'pid',
        // 文本字段名
        textField: 'label',
        // 根节点标识
        rootKey: 0
    };
    return convertTreeData(tree_raw_data, attributes);
}