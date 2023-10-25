# slr_database

aka everything is a localStorage entry

#### set-up:
   - database entry contains the names and column numbers of the tables
   - each table is a different localStorage entry

### to-do

1. database
   - [x] create
   - [x] delete
2. tables
   - [x] create - there is only one database
   - [x] delete
   - modify
      - [ ] create new columns
      - [ ] modify existing columns
      - [ ] delete columns
3. entries
   - [x] add entry to table
   - [x] delete entry (by index)
      - [ ] maybe make other deletion methods too?
   - [x] modify entry (by index)

4. misc
   - [x] make columns have names - otherwise modifying tables is...weird
   - [ ] parse entries, table names etc. before entering them
   - [x] check if database itself exists before operations NO NEED AS CONSTRUCTOR DOES THIS ALREADY
   - [ ] better error handling DONEish?
      - it's much cleaner than before but is it better?
      - [x] make it with throw

   - [ ] maybe make it all part of only ONE big file
      - [ ] separate fork

### description
An idea to use the very simple localStorage API as the basic get/set mechanism in a relational database handler(is that what they're called? anyway).
You can check my progress in the to-do list above.

Since starting this project I've become more comfortable with learning about and modifying existing technologies rathen than building mine from the ground up, but I'll still finish this (eventually) and clean it up (definitely).

### usage

You can just add another `<script>` tag and include it, or an `export` directive at the bottom of the file, then create an `SlrDB` object. Modifying the data is done through this object's methods.

Helper functions:

`getTableNames()`: Returns an array with the names of all the tables in the database.

`getTableData(tableName)`: Get the data of the table with `tableName` in the form of an object which contains the `name`, number of columns (`nOfColumns`), and an array called `columnNames`. The latter two can also be retrieved using `getNumberOfColumns(tableName)`and `getColumnNames(tableName)`, respectively.

`getNumberOfEntries(tableName)`: Get the number of entries in the table with `tableName`.

Data modification functions:

`delDB()`: It deletes all the data in the database - it deletes all the LocalStorage table entries but only *empties* the database entry so that it can be used for future operations.

`addTable(tableName, nOfColumns, ...columnNames)`: Add a table with the specified `tableName`, `number of columns` and a list of `ccolumnNames` which can either be a list of strings, or an array of strings.

`deleteTable(tableName)`: Delete the table with the specified name (if it exists).

`addEntry(tableName, ...values)`: Add an entry into the table with `tableName` - the `values` can either be an array with a length ofthe table's columns, or individual variables with the same length.

`modifyEntry(tableName, index, columnName, newValue)`: Modify an entry by `index` in `tableName` - change the old value in `columnName` with the `newValue`.

`deleteEntry(tableName, index)`: Delete an entry by `index` from `tableName`.

`getEntry(tableName, index)`: Retrieve the entry by `index` from `tableName`.

`getAllEntries(tableName)`: Retrieve all the entries from the table with `tableName`.


There are a few more, but those are helper *helper* functions that are used internally, so I won't include them here.
