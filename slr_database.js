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
    // getting the names of the tables in the form of an array
    
    getTableNames = () => {
        let tables = this.get(this.dbName).split(this.separator);
        return tables.map(item => item.split(this.innerSeparator)[0]);
    }
    
    // checking if a table exists
    // returns -1 if DOESN't, table's place in list of tables if DOES
    tableExists = (name) => {
        return this.getTableNames().indexOf(name);
    }

    // getting the number of a table's columns
    getNumberOfColumns = (name) => {
        let tables = this.get(this.dbName).split(this.separator);
        let index = this.tableExists(name);

        return tables[index].split(this.innerSeparator)[1];
    }
    
    // getting the names of a table's columns
    getColumnNames = (name) => {
        let index = this.tableExists(name);
        let columnNames = this.get(this.dbName).split(this.separator)[index].split(this.innerSeparator);
        columnNames.splice(0, 2); // deleting the name and number of columns from the beginning of the array
        
        return columnNames;
    }

    // getting the number of a table's rows/entries
    getNumberOfEntries = (name) => {
        return this.get(name).split(this.separator).length;
    }

    // database functions -------------------------------------------------------------
    
    delDB = () => {
        let tables = this.get(this.dbName).split(this.separator);

        // deleting all the tables and their contents
        for(let i = 0; i < tables.length; i ++) {
            this.remove(tables[i].split(this.innerSeparator)[0]);
        }

        // removing the main db entry (what to name this)
        this.setEmpty(this.dbName);
    }


    // table functions -----------------------------------------------------------------
    addTable = (name, nOfColumns, ...columnNames) => {
        let bChecked = false;
        let msg;
        
        if(typeof(nOfColumns) == "number") {
            nOfColumns = Math.floor(nOfColumns)
            if(columnNames.length == nOfColumns) {
                bChecked = true;
            }
            else {
                msg = "MSG - ERR - there must be " + nOfColumns + " column names provided.";
            }
        }
        else {
            msg = "MSG - ERR - number of columns must be a number"
        }
        
        if(bChecked) {
            this.set(name, "");
            let newTable = name + this.innerSeparator + nOfColumns + this.innerSeparator + columnNames.join(this.innerSeparator)
            this.addToField(this.dbName, newTable);
            msg = "MSG - table added successfully";
        }
        
        console.log(msg);
    }

    deleteTable = (name) => {
        let bChecked = false;
        let msg;

        if(this.tableExists(name) > -1) {
            bChecked = true;
        }
        else {
            msg = "MSG - ERR - no table with this name";
        }

        if(bChecked) {
            this.remove(name);                          // removing the localStorage entry of the table
            this.deleteFromField(this.dbName, index);   // removing the table's name from the list of tables
            msg = "MSG - table deleted successfully";
        }

        console.log(msg);
    }



    // value functions -----------------------------------------------------------------

    addEntry = (name, ...values) => {
        let bChecked = false;
        let msg;

        if(this.tableExists(name) > -1) {
            if(values.length == this.getNumberOfColumns(name)) {
                bChecked = true;
            }
            else {
                msg = "MSG - ERR - not enough/too many values";
            }
        }
        else {
            msg = "MSG - ERR - no table with this name";111
        }

        if(bChecked) {
            this.addToField(name, values.join(this.innerSeparator));
            msg = "MSG - values added successfully";
        }

        console.log(msg);
    }

    deleteEntry = (name, index) => {
        let bChecked = false;
        let msg;

        if(this.tableExists(name) > -1) {
            let tableContent = this.get(name).split(this.separator);

            if(index < tableContent.length) {
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
            this.deleteFromField(name, index);
            msg = "MSG - entry deleted successfully";
        }

        console.log(msg);
    }

    // returns the entry in a given row in the form of an array
    getEntry = (name, index) => {
        let bChecked = false;
        let msg;

        if(this.tableExists(name) > -1) {
            if(index < this.getNumberOfEntries(name)) {
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

        console.log(msg);

        if(bChecked) {
            return this.get(name).split(this.separator)[index].split(this.innerSeparator);
        }
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
