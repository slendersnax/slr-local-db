/*

slr_database

aka everything is a localStorage entry

set-up:
    - one entry contains the names of the tables
    - each table is a different entry

*/

// database handling --------------------------------------------------
class SlrDB {
    constructor() {
        if(window.localStorage.getItem("slr_database")) {

        }
        else {
            window.localStorage.setItem("slr_database");
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

    // database functions -------------------------------------------------------------
    // the only one we really need is resetting the database, deleting everything
    // 
    addDB = (name) => {
        set(name, "");
    }

    delDB = (name) => {

    }

    // wrapper functions

    // table functions -----------------------------------------------------------------
    addTable = () => {

    }

    deleteTable = () => {

    }
}