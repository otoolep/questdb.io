---
id: alter
title: ALTER TABLE
sidebar_label: ALTER TABLE
---

## ALTER TABLE
`ALTER TABLE` is used to add modify the structure of an existing table.

### ADD

### Overview
`ADD` is used to add a new column to an existing table

### Syntax
Adding a column is done with the following syntax:
```sql
ALTER TABLE 'TABLE' ADD COLUMN 'COLUMN_NAME' 'TYPE';
```

#### Parameters
`TABLE` is the name of the table you would like to `ALTER`
`COLUMN_NAME` is the name the new column will have
`TYPE` is the **[data type](refDATATYPES.md)** for the new column.

### Examples
The following example adds a new column called `comment` that is of `STRING` type to the table `ratings`

```sql
ALTER TABLE ratings ADD COLUMN comment STRING;
```

## DROP

### Overview
`DROP` is used to remove an existing column from an existing table. 

> When using `DROP`, the data in that column will be deleted

### Syntax
Dropping a column a column is done with the following syntax:
```sql
ALTER TABLE 'TABLE' DROP COLUMN 'COLUMN_NAME';
```

### Parameters
`TABLE` is the name of the table you would like to `ALTER`
`COLUMN_NAME` is the name the new column will have

### Examples
The following example deletes the column called `comment` from the table `ratings`

```sql
ALTER TABLE ratings DROP COLUMN comment ;
```

## ALTER COLUMN

### Overview
`ALTER` is used to alter the type of a given column.

### Syntax
Adding a column is done with the following syntax:
```sql
ALTER TABLE 'TABLE' ALTER COLUMN 'COLUMN_NAME' 'NEW_TYPE';
```

### Parameters
`TABLE` is the name of the table you would like to `ALTER`
`COLUMN_NAME` is the name of the column to be altered
`NEW_TYPE` is the new **[data type](refDATATYPES.md)** for the column.

### Examples
The following example converts `movieId` that is of `LONG` type to `DOUBLE`

```sql
ALTER TABLE ratings ALTER COLUMN movieId DOUBLE;
```

