---
id: functionsMeta
title: Meta functions
sidebar_label: Meta functions
---


## all_tables
`all_tables()` returns a list of tables

#### Arguments
- `all_tables()` does not require arguments.

#### Description
Returns all tables in the database. 
 
#### Return value
Returns a `table`.

#### Examples:
- Get all tables in the database

```sql
all_tables();
```

|tableName|
|---|
|table1|
|table2|
|...|

- Get all tables in the database that match 'sales'
```sql
all_tables() WHERE tableName ~= 'sales';
```

|tableName|
|---|
|sales-north|
|sales-west|
|sales-east|
|sales-south|

- Get all tables in reverse alphabetical order
```sql
all_tables() ORDER BY tableName DESC;
```

|tableName|
|---|
|table_n|
|table_n-1|
|table_n-2|
|...|



## table_columns
`table_columns('tableName')` returns the schema of a table

#### Arguments
- `tableName` is the name of an existing table as a string

#### Description
Returns the schema of the target table.
 
#### Return value
Returns a `table` with two columns:
- `columnName` - name of the available columns in the table
- `columnType` - type of the column

#### Examples:
- Get all columns in the table

```sql
table_columns('myTable')
```

|columnName| columnType|
|---|---|
|TS|TIMESTAMP|
|Name|STRING|
|Age|INT|
|Sex|SYMBOL|
|Grade|DOUBLE|
|...|...|

- Get all columns in the database that match the name 'sales'
```sql
SELECT columnName FROM table_columns('myTable') WHERE columnName ~= 'sales';
```

|columnName|
|---|
|sales-north|
|sales-west|
|sales-east|
|sales-south|

- Get the count of column types
```sql
SELECT columnType, count() FROM table_columns('wthr');
```

|columnType|count|
|---|---|
|INT|4|
|DOUBLE|8|
|SYMBOL|2|