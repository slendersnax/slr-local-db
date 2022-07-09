# slr_database

aka everything is a localStorage entry

#### set-up:
   - database entry contains the names and column numbers of the tables
   - each table is a different localStorage entry

### to-do

1. database
   - create DONE
   - delete DONE
2. tables
   - create - there is only one database DONE
   - delete DONE
   - modify
      - create new columns
      - modify existing columns
      - delete columns
3. entries
   - add entry to table DONE
   - delete entry (by index) DONE
      - maybe make other deletion methods too?
   - modify entry (by index)

4. misc
   - make columns have names - otherwise modifying tables is...weird
   - parse entries, table names etc. before entering them
   - check if database itself exists before operations
   - better error handling DONEish?
      - it's much cleaner than before but is it better?

   - maybe make it all part of only ONE big file?