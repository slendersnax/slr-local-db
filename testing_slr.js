// adding some data
let handler = new SlrDB();
handler.delDB();

handler.addTable("cars", 2);
handler.addTable("students", 3);
handler.addTable("dinosaur types", 1);
handler.addTable("dinosaurs", 2);

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
let el_select = document.getElementById("table-names");
let el_button = document.getElementById("show-table-content");

let el_table = document.getElementById("content");

// -----------------------------------------------------------------------

const removeChildren = (elem) => {
    for(let i = elem.childNodes.length - 1; i >= 0; i --) {
        elem.removeChild(elem.childNodes[i]);
    }
}

const appendTableNames = () => {
    let tables = handler.getTableNames();
    
    removeChildren(el_select);

    for(let i = 0; i < tables.length; i ++) {
        let option = document.createElement("option");
        option.innerHTML = tables[i];
        option.value = tables[i];

        el_select.appendChild(option);
    }
}

const showTableContent = () => {
    let tableName = el_select.value;
    let nEntries = handler.getNumberOfEntries(tableName);
    let nCols = handler.getColumnNumber(tableName);

    removeChildren(el_table);

    let titleRow = document.createElement("tr");
    let titleCell = document.createElement("th");
    titleRow.appendChild(titleCell);
    el_table.appendChild(titleRow);

    titleCell.innerHTML = tableName;
    titleCell.setAttribute("colspan", nCols);
    titleCell.setAttribute("text-align", "center");

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

appendTableNames();

el_button.addEventListener("click", function() {
    showTableContent();
});