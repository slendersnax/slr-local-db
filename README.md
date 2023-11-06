# slr_database

aka everything is a LocalStorage entry

### this means that:
   - database entry contains the names, column numbers, column names of the tables
   - each table is a different LocalStorage entry contaning its own entries

### to-do

1. database
   - [x] create
   - [x] delete
2. tables
   - [x] create
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
   - [ ] add a real **id** field to entries?

### description
An idea to use the very simple localStorage API as the basic get/set mechanism in a relational database handler(is that what they're called? anyway).
You can check my progress in the to-do list above.

Since starting this project I've become more comfortable with learning about and modifying existing technologies rathen than building mine from the ground up, but I'll still finish this (eventually) and clean it up (definitely).

### usage

Create an `SlrDB` object. Modifying the data is done through this object's methods. Not all of them require a description since (imo) they have pretty self-descriptive names, but there are some quirks with a few of them.

An additional note: the **index** parameter that some functions use does not exist as a column in the tables themselves, it simply refers to the index an item would have if each entry was an item in an array. This means that indexes start at 0 and the index of each item changes upon deleting an item before them.

Helper functions / methods:

`getTableNames()`

`getTableData(tableName)`: Get the data of the table with **tableName** in the form of an object which contains the following properties: **name**, **nOfColumns**, **columnNames** (an array). The latter two can also be retrieved using `getNumberOfColumns(tableName)`and `getColumnNames(tableName)`, respectively.

`getNumberOfEntries(tableName)`

Data modification functions:

`delDB()`: It deletes all the data in the database - it deletes all the LocalStorage table entries but only *empties* the database entry so that it can be used for future operations.

`addTable(tableName, nOfColumns, ...columnNames)`: **columnNames** can either be a list of separate strings as arguments, or an array of strings.

`deleteTable(tableName)`

`addEntry(tableName, ...values)`: **values** can either be an array with a length equal to the table's columns, or a list of individual variables with the same length.

`modifyEntry(tableName, index, columnName, newValue)`

`deleteEntry(tableName, index)`

`getEntry(tableName, index)`

`getAllEntries(tableName)`


There are a few more, but those are helper *helper* functions that are used internally, so I won't include them here.
