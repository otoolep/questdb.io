---
id: show
title: SHOW
sidebar_label: SHOW
---

## SHOW 
`SHOW` displays tables and columns available in the database.

> These commands return the tables and columns as a table. If you would like to query your tables and columns 
with filters or to use the results as part of a function, see table_columns() and all_tables() functions.

### Examples
Show all tables:
```sql
SHOW TABLES;
```

|tableName|
|---|
|table1|
|table2|
|...|

Show all columns for table `weather`
```sql
SHOW COLUMNS FROM myTable;
```

|columnName| type|
|---|---|
|column1 | timestamp |
|column2 | int |
|column3 | SYMBOL|
|...|...|

