// adding some data
let handler = new SlrDB();

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

const appendTableNames = () => {
    let tables = handler.getTableNames();

    for(let i = 0; i < tables.length; i ++) {
        let option = document.createElement("option");
        option.innerHTML = tables[i];
        option.value = tables[i];

        el_select.appendChild(option);
    }
}

appendTableNames();