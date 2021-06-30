// text parser --------------------------------------------------------
class SlrParser {
    constructor() {

    }
}

// database handling --------------------------------------------------
class SlrDB {
    constructor() {
        sCurDB = "";
        rDbs = "";
        rTables = "";

        if(window.localStorage.getItem("slrDBs")) {

        }
        else {
            window.localStorage.setItem("slrDBs");
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
    // base functions
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