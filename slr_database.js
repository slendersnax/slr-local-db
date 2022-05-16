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

    remove = (key) => {
        window.localStorage.setItem(key, "");
    }

    // to make life easier

    // adding one value to a generic field
    addToField = (name, content) => {
        this.set(name, this.get(name) + content + this.separator);
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
    // the only one we really need is resetting the database, deleting everything
    
    delDB = () => {
        let tables = this.get(this.dbName).split(this.separator);

        // deleting all the tables and their contents
        for(let i = 0; i < tables.length; i ++) {
            this.remove(tables[i].split(this.innerSeparator)[0]);
        }

        // removing the main db entry (what to name this)
        this.remove(this.dbName);
    }

    // wrapper functions

    // table functions -----------------------------------------------------------------
    addTable = (name, nOfColumns) => {
        this.set(name, "");
        this.addToField(this.dbName, name + this.innerSeparator + nOfColumns);
    }

    deleteTable = (name) => {
        // delete the table entry
        // also delete its name and number of columns from the tables' names
    }

    // value functions -----------------------------------------------------------------

    addToTable = (name, ...values) => {
        if(this.get(name)) {
            let nTableColumns = this.getColumnNumber(name);
            
            if(values.length == nTableColumns) {
                this.addToField(name, values.join(this.innerSeparator));
            }
            else {
                // too many or not enough values
            }
        }
        else {
            // no table with this name
        }
    }
}