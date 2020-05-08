var dataManager = {
    checkIfExists : function(dataKey) {
        let data = store.get(dataKey);
        return (typeof data !== 'undefined');
    },
    create : function(dataKey, data) {
        store.set(dataKey, data);
        return true;
    },
    get : function(dataKey) {
        return store.get(dataKey);
    },
    gather : function(dataKeys) {
        let data = {};

        $(dataKeys).each(function(index, dataKey) {
            data[dataKey] = store.get(dataKey);
        });

        return data;
    },
    read : function(fileName) {
        let rawdata = fs.readFileSync('./src/data/' + fileName + '.json');
        return JSON.parse(rawdata);
    }
}
