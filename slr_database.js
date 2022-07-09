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

        if(content.length > 0) { // if we had more than one entry
            this.set(name, content.join(this.separator));
        }
    }

    // checking if a table exists
    // returns -1 if DOESN't, table's place in list of tables if DOES
    tableExists = (name) => {
        let tables = this.get(this.dbName).split(this.separator);

        for(let i = 0; i < tables.length; i ++) {
            let values = tables[i].split(this.innerSeparator);

            if(values[0] == name) {
                return i; // so that if i == 0 we still know the table exists
            }
        }

        return -1;
    }

    // getting the number of a table's columns
    getNumberOfColumns = (name) => {
        let tables = this.get(this.dbName).split(this.separator);

        for(let i = 0; i < tables.length; i ++) {
            let values = tables[i].split(this.innerSeparator);

            if(values[0] == name) {
                return values[1];
            }
        }
    }

    // getting the number of a table's rows/entries

    getNumberOfEntries = (name) => {
        let table = this.get(name).split(this.separator);

        return table.length;
    }

    // getting the names of the tables in the form of an array

    getTableNames = () => {
        let tables = this.get(this.dbName).split(this.separator);
        
        return tables.map(item => item.split(this.innerSeparator)[0]);
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
    addTable = (name, nOfColumns) => {
        this.set(name, "");
        this.addToField(this.dbName, name + this.innerSeparator + nOfColumns);
    }

    deleteTable = (name) => {
        let bChecked = false;
        let msg;
        let index = this.tableExists(name);

        if(index > -1) {
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
            let nTableColumns = this.getNumberOfColumns(name);
            
            if(values.length == nTableColumns) {
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