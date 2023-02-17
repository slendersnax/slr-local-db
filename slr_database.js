class SlrDB {
    constructor() {
        this.dbName = "slr_database";
        this.separator = "/";
        this.innerSeparator = ";";

        if(window.localStorage.getItem(this.dbName)) {}
        else {
            window.localStorage.setItem(this.dbName, "");
        }
    }

    // localStorage wrappers for ease of use ------------------------------------------
    set = (key, value) => {
        window.localStorage.setItem(key, value);
    }

    get = (key) => {
        return window.localStorage.getItem(key);
    }

    // important to make the distinction between this and complete removal
    setEmpty = (key) => {
        window.localStorage.setItem(key, "");
    }

    remove = (key) => {
        window.localStorage.removeItem(key);
    }


    // quality of life functions ------------------------------------------------------
    
    // adding one value to a generic field
    addToField = (name, value) => {
        let content = this.get(name);

        if(content != "") {
            this.set(name, content + this.separator + value);
        }
        else {
            this.set(name, value);
        }
    }

    // deleting one value from a generic field
    deleteFromField = (name, index) => {
        let content = this.get(name).split(this.separator);
        content.splice(index, 1);

        this.set(name, content.join(this.separator));
    }
    
    // table helper functions

    // getting the names and attributes of the tables in the form of an array
    getTablesAttrs = () => {
        return this.get(this.dbName).split(this.separator);
    }

    // getting the names and attributes of a table in the form of an object
    getTableData = (tableName) => {
        let tableArr = this.getTablesAttrs()[this.indexOfTable(tableName)].split(this.innerSeparator);
        let data = {
            name: tableArr[0],
            nOfColumns: tableArr[1],
            columnNames: tableArr.slice(2)
        };
        
        return data;
    }
    
    getTableNames = () => {
        return this.getTablesAttrs().map(item => item.split(this.innerSeparator)[0]);
    }
    
    // checking if a table exists
    // returns -1 if DOESN't, table's place in list of tables if DOES
    indexOfTable = (tableName) => {
        return this.getTableNames().indexOf(tableName);
    }

    // getting the number of a table's columns
    getNumberOfColumns = (tableName) => {
        return this.getTablesAttrs()[this.indexOfTable(tableName)].split(this.innerSeparator)[1];
    }
    
    // getting the names of a table's columns
    getColumnNames = (tableName) => {
        let columnNames = this.getTablesAttrs()[this.indexOfTable(tableName)].split(this.innerSeparator);
        columnNames.splice(0, 2); // deleting the name and number of columns from the beginning of the array
        
        return columnNames;
    }

    // getting the number of a table's rows/entries
    getNumberOfEntries = (tableName) => {
        if(this.indexOfTable(tableName) > -1)
            return this.get(tableName).split(this.separator).length;
        else
            throw "MSG - ERR - no table with this name";
    }
    
    // items can either be given as a list of variables
    // or as an array
    // used when checking the format of column names and variables in a new entry
    verifyItems = (items) => {
        let type = typeof(items[0]);
        
        if(type == "string")
            return 1;

        if(type == "object") // aka array of strings
            return -1;
        
        return 0;
    } 

    // database functions -------------------------------------------------------------
    
    delDB = () => {
        let tableNames = this.getTableNames();

        // deleting all the tables and their contents
        for(let i = 0; i < tableNames.length; i ++) {
            this.remove(tableNames[i]);
        }

        // removing the main db entry (what to name this?)
        this.setEmpty(this.dbName);
    }
    
    // table functions -----------------------------------------------------------------
    addTable = (tableName, nOfColumns, ...columnNames) => {
        let bChecked = false;
        let msg;
        let cntype = this.verifyItems(columnNames);
        let cn;
        
        if(this.indexOfTable(tableName) == -1) {
            if(typeof(nOfColumns) == "number") {
                nOfColumns = Math.floor(nOfColumns)
                
                if(cntype != 0) {
                    cn = cntype == 1 ? columnNames : columnNames[0];
            
                    if(cn.length == nOfColumns) {
                        bChecked = true;
                    }
                    else {
                        msg = "MSG - ERR - there must be " + nOfColumns + " column names provided.";
                    }
                }
                else {
                    msg = "MSG - ERR - column names must be provided as multiple separate values or as an array.";
                }
            }
            else {
                msg = "MSG - ERR - number of columns must be a number";
            }
        }
        else {
            msg = "MSG - ERR - a table with this name already exists";
        }
        
        if(bChecked) {
            this.set(tableName, "");
            let newTable = tableName + this.innerSeparator + nOfColumns + this.innerSeparator + cn.join(this.innerSeparator)
            this.addToField(this.dbName, newTable);
            msg = "MSG - table added successfully";
            console.log(msg);
        }
        else {
            throw msg;
        }
    }

    deleteTable = (tableName) => {
        let bChecked = false;
        let msg;

        if(this.indexOfTable(tableName) > -1) {
            bChecked = true;
        }
        else {
            msg = "MSG - ERR - no table with this name";
        }

        if(bChecked) {
            this.remove(tableName);                          // removing the localStorage entry of the table
            this.deleteFromField(this.dbName, index);   // removing the table's name from the list of tables
            msg = "MSG - table deleted successfully";
            console.log(msg);
        }
        else {
            throw msg;
        }
    }


    // value functions -----------------------------------------------------------------

    addEntry = (tableName, ...values) => {
        let bChecked = false;
        let msg;
        let valType = this.verifyItems(values);
        let vals;

        if(this.indexOfTable(tableName) > -1) {
            if(valType != 0) {
                vals = valType == 1 ? values : values[0];
                
                if(vals.length == this.getNumberOfColumns(tableName)) {
                    bChecked = true;
                }
                else {
                    msg = "MSG - ERR - not enough/too many values";
                }
            }
        }
        else {
            msg = "MSG - ERR - no table with this name";
        }

        if(bChecked) {
            this.addToField(tableName, vals.join(this.innerSeparator));
            msg = "MSG - values added successfully";
            console.log(msg);
        }
        else {
            throw msg;
        }
    }

    modifyEntry = (tableName, index, columnName, newValue) => {
        let bChecked = false;
        let msg;
        let colIndex;

        if(this.indexOfTable(tableName) > -1) {
            if(index < this.getNumberOfEntries(tableName)) {
                colIndex = this.getColumnNames(tableName).indexOf(columnName);
                if(colIndex > -1) {
                    bChecked = true;
                }
                else {
                    msg = "MSG - ERR - no column with that name in this table";
                }
            }
            else {
                msg = "MSG - ERR - no entry with that index";
            }
        }
        else {
            msg = "MSG - ERR - no table with this name";
        }

        // should work on this somehow
        // what we're doing here is we're getting all the entries
        // then modifying THAT ONE VALUE and rejoining everything together
        if(bChecked) {
            let allEntries = this.getAllEntries(tableName);
            let newTableVal = [];

            allEntries[index][colIndex] = newValue;

            for(let i = 0; i < allEntries.length; i ++) {
                newTableVal[i] = allEntries[i].join(this.innerSeparator);
            }

            this.set(tableName, newTableVal.join(this.separator));
            console.log(msg);
        }
        else {
            throw msg;
        }
    }

    deleteEntry = (tableName, index) => {
        let bChecked = false;
        let msg;

        if(this.indexOfTable(tableName) > -1) {
            if(index < this.getNumberOfEntries(tableName)) {
                bChecked = true;
            }
            else {
                msg = "MSG - ERR - no entry with that index";
            }
        }
        else {
            msg = "MSG - ERR - no table with this name";
        }

        if(bChecked) {
            this.deleteFromField(tableName, index);
            msg = "MSG - entry deleted successfully";
            console.log(msg);
        }
        else {
            throw msg;
        }
    }

    // returns the entry in a given row in the form of an array
    getEntry = (tableName, index) => {
        let bChecked = false;
        let msg;

        if(this.indexOfTable(tableName) > -1) {
            if(index < this.getNumberOfEntries(tableName)) {
                bChecked = true;
                msg = "MSG - successfully retrieved entry";
            }
            else {
                msg = "MSG - ERR - not enough entries";
            }
        }
        else {
            msg = "MSG - ERR - no table with this name."
        }

        if(bChecked) {
            console.log(msg);
            return this.get(tableName).split(this.separator)[index].split(this.innerSeparator);
        }
        else {
            throw msg;
        }
    }

    getAllEntries = (tableName) => {
        let nEntries = this.getNumberOfEntries(tableName);
        let m_entries = [];

        for(let i = 0; i < nEntries; i ++) {
            m_entries[i] = this.getEntry(tableName, i);
        }

        return m_entries;
    }

    // for debugging
    printTableContent = (name) => {
        let content = this.get(name).split(this.separator);

        for(let i = 0; i < content.length; i ++) {
            console.log(content[i]);
        }
    }

    printTables = () => {
        let tables = this.get(this.dbName).split(this.separator);

        if(tables != "") {
            for(let i = 0; i < tables.length; i ++) {
                console.log(tables[i].split(this.innerSeparator)[0] + " - " + tables[i].split(this.innerSeparator)[1]);
            }
        }
    }
}
