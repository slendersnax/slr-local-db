// database handling --------------------------------------------------
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

    // localStorage wrappers for ease of use
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

    // quality of life functions

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

    deleteFromField = (name, index) => {
        let content = this.get(name).split(this.separator);
        content.splice(index, 1);

        if(content.length > 0) { // if we had more than one entry
            this.set(name, content.join(this.separator) + this.separator);
        }
    }

    // checking if a table exists
    // returns 0 if DOESN't, table's place in list of tables +1 if DOES
    isTable = (name) => {
        let tables = this.get(this.dbName).split(this.separator);

        for(let i = 0; i < tables.length; i ++) {
            let values = tables[i].split(this.innerSeparator);

            if(values[0] == name) {
                return i + 1; // so that if i == 0 we still know the table exists
            }
        }

        return 0;
    }

    // getting the number of a table's columns
    getColumnNumber = (name) => {
        let tables = this.get(this.dbName).split(this.separator);

        for(let i = 0; i < tables.length; i ++) {
            let values = tables[i].split(this.innerSeparator);

            if(values[0] == name) {
                return values[1];
            }
        }
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
        let exists = this.isTable(name);
        if(exists > 0) {
            let tables = this.get(this.dbName).split(this.separator);
            exists --;
            this.remove(name);           // removing the localStorage entry of the table
            tables.splice(exists, 1);    // removing the name of the table from the list of tables
            this.set(this.dbName, tables.join(this.separator));    // updating the list of tables with the new value
            console.log("MSG - table deleted successfully");
        }
        else {
            console.log("MSG - ERR - no table with this name");
        }
    }

    // value functions -----------------------------------------------------------------

    addEntry = (name, ...values) => {
        if(this.isTable(name)) {
            let nTableColumns = this.getColumnNumber(name);
            
            if(values.length == nTableColumns) {
                this.addToField(name, values.join(this.innerSeparator));
                console.log("MSG - values added successfully");
            }
            else {
                console.log("MSG - ERR - not enough/too many values");
            }
        }
        else {
            console.log("MSG - ERR - no table with this name");
        }
    }

    deleteEntry = (name, index) => {
        if(this.isTable(name)) {
            let tableContent = this.get(name).split(this.separator);

            if(index < tableContent.length) {
                tableContent.splice(index, 1);
            }
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

        for(let i = 0; i < tables.length; i ++) {
            console.log(tables[i].split(this.innerSeparator)[0] + " - " + tables[i].split(this.innerSeparator)[1]);
        }
    }
}