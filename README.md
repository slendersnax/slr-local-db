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
   - [ ] modify entry (by index)

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


Update Oct 2022, leaving it as it is now. I might come back later to clean it up/complete it, though it's not bad as it is.
