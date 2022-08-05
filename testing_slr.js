// adding some data
let handler = new SlrDB();
handler.delDB();

let test = ["Brand", "Colour"]

handler.addTable("cars", 2, test);
handler.addTable("students", 3, ["Name", "Major", "Current Year"]);
handler.addTable("dinosaur types", 1, ["type"]);
handler.addTable("dinosaurs", 2, ["Name", "Size"]);

handler.addEntry("cars", "Ford", "Red");
handler.addEntry("cars", "Porsche", "Black");
handler.addEntry("cars", "Koenigsegg", "Pink");

handler.addEntry("students", "Margaret", "Physics", 2);
handler.addEntry("students", "Easter", "Computer Science", 3);
handler.addEntry("students", "John", "Physics", 1);
handler.addEntry("students", "Dolly", "English Literature", 4);

handler.addEntry("dinosaur types", "herbivore");
handler.addEntry("dinosaur types", "carnivore");

handler.addEntry("dinosaurs", "T-Rex", "big");
handler.addEntry("dinosaurs", "Diplodocus", "big");
handler.addEntry("dinosaurs", "Minirex", "smol");

// testing --------------------
let el_select = document.getElementsByClassName("table-names");
let el_buttonShowTable = document.getElementById("show-table-content");

let el_addTable = document.getElementById("add-table");
let el_addColumn = document.getElementById("add-column");
let el_columnNamesContainer = document.getElementById("column-name-container");


let el_table = document.getElementById("content");

// -----------------------------------------------------------------------

const removeChildren = (elem) => {
    for(let i = elem.childNodes.length - 1; i >= 0; i --) {
        elem.removeChild(elem.childNodes[i]);
    }
}

// add table names to dropdown list
const listTableNames = () => {
    let tables = handler.getTableNames();
    
    for(let i = 0; i < el_select.length; i ++) {
        removeChildren(el_select[i]);
    }

    for(let i = 0; i < tables.length; i ++) {
        let option = document.createElement("option");
        option.innerHTML = tables[i];
        option.value = tables[i];
        
        for(let j = 0; j < el_select.length; j ++) {
            el_select[j].appendChild(option);
        }
    }
}

// displaying a table on the right
const showTableContent = () => {
    let tableName = el_select[0].value;
    let nEntries = handler.getNumberOfEntries(tableName);
    let nCols = handler.getNumberOfColumns(tableName);
    let nColNames = handler.getColumnNames(tableName);

    let titleRow = document.createElement("tr");
    let titleCell = document.createElement("th");
    let columnNamesRow = document.createElement("tr");
    
    titleRow.appendChild(titleCell);
    
    titleCell.innerHTML = tableName;
    titleCell.setAttribute("colspan", nCols);
    titleCell.setAttribute("text-align", "center");
    
    for(let i = 0; i < nCols; i ++) {
        let th = document.createElement("th");
        th.innerHTML = nColNames[i];
        
        columnNamesRow.appendChild(th);
    }
    
    removeChildren(el_table);
    el_table.appendChild(titleRow);
    el_table.appendChild(columnNamesRow);

    for(let i = 0; i < nEntries; i ++) {
        let tr = document.createElement("tr");
        let entry = handler.getEntry(tableName, i);

        for(j = 0; j < nCols; j ++) {
            let td = document.createElement("td");
            td.innerHTML = entry[j];
            
            tr.appendChild(td);
        }

        el_table.appendChild(tr);
    }
}

const addColumnInput = () => {
    let colCont = document.createElement("div");
    let newCol = document.createElement("input");
    let delCol = document.createElement("button");
    
    newCol.setAttribute("type", "text");
    newCol.setAttribute("placeholder", "column name");
    delCol.innerHTML = "delete column";
    delCol.addEventListener("click", function() {
        colCont.parentNode.removeChild(colCont);
    });
    
    colCont.style.height = "22px";
    colCont.appendChild(newCol);
    colCont.appendChild(delCol);
    
    el_columnNamesContainer.appendChild(colCont);
}

const addTable = () => {
    let name = document.getElementById("table-name").value;
    let nOfColumns = el_columnNamesContainer.children.length;
    
    let nameInputs = [];
    for(let i = 0; i < el_columnNamesContainer.children.length; i ++) {
        nameInputs[i] = el_columnNamesContainer.children[i].getElementsByTagName("input")[0].value;
    }
    
    handler.addTable(name, nOfColumns, nameInputs);
    listTableNames();
}

el_addColumn.addEventListener("click", function() {
    addColumnInput();
});

el_addTable.addEventListener("click", function() {
    addTable();
});

el_buttonShowTable.addEventListener("click", function() {
    showTableContent();
});

listTableNames();
