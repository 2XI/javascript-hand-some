/** 深度优先的深克隆 */

function cloneDeep(value) {
    let copied_objs = []

    function _cloneDeep(value) {
        if (value === null) return null;

        if (typeof value === 'object') {
            for(let i = 0; i < copied_objs.length; i++) {
                if (value === copied_objs[i].source) {
                    return copied_objs[i].target;
                }
            }

            let new_value = {};

            if (Array.isArray(value)) new_value = []

            copied_objs.push({ source: value, target: new_value })

            Object.keys(value).forEach(key => {
                new_value[key] = _cloneDeep(value[key])
            })

            return new_value
        } else {
            return value
        }
    }

    return _cloneDeep(value)
}

/** 广度优先的深克隆 */
function cloneDeep(value) {
    
}