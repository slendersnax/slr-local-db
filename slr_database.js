/*

slr_database

aka everything is a localStorage entry

set-up:
    - database entry contains the names of the tables
    - each table is a different entry


ideas:
    - maybe make all the functions return something as a form of error signaling?
*/

// database handling --------------------------------------------------
class SlrDB {
    constructor() {
        this.dbName = "slr_database";
        this.dbColumnsName = this.dbName + "_column_numbers"
        this.separator = "/";
        this.innerSeparator = ";";

        if(window.localStorage.getItem(this.dbName)) {

        }
        else {
            window.localStorage.setItem(this.dbName, "");
            window.localStorage.setItem(this.dbColumnsName, "");
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
        window.localStorage.removeItem(key);
    }

    // adding one value to a generic field
    addToField = (name, content) => {
        this.set(name, this.get(name) + this.separator + content);
    }

    // database functions -------------------------------------------------------------
    // the only one we really need is resetting the database, deleting everything
    
    delDB = () => {
        // delete database
        // delete tables details
        // delete contents of tables
    }

    // wrapper functions

    // table functions -----------------------------------------------------------------
    addTable = (name, nOfColumns) => {
        this.set(name, "");
        this.addToField(this.dbColumnsName, nOfColumns);
        
        this.addToField(this.dbName, name);
        this.addToField(this.dbName, nOfColumns);
    }

    deleteTable = (name) => {
        // delete the table entry
        // also delete its name and number of columns from the tables' names
    }

    // value functions -----------------------------------------------------------------

    addToTable = (name, ...values) => {
        if(this.get(name)) {

        }
        else {

        }
    }
}