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
    // returns 0 if DOESN't, table's place in list of tables +1 if DOES
    isTable = (name) => {
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
        let index = this.isTable(name);

        if(index > -1) {
            this.remove(name);           // removing the localStorage entry of the table
            this.deleteFromField(this.dbName, index);
            console.log("MSG - table deleted successfully");
        }
        else {
            console.log("MSG - ERR - no table with this name");
        }
    }



    // value functions -----------------------------------------------------------------

    addEntry = (name, ...values) => {
        if(this.isTable(name) > -1) {
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
        index --; // because humans start counting from 1, but arrays start from 0
        if(this.isTable(name) > -1) {
            let tableContent = this.get(name).split(this.separator);

            if(index < tableContent.length) {
                this.deleteFromField(name, index);
            }
        }
        else {
            console.log("MSG - ERR - no table with this name");
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