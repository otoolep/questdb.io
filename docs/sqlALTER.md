---
id: alter
title: ALTER TABLE
sidebar_label: ALTER TABLE
---

## ALTER TABLE
`ALTER TABLE` is used to add modify the structure of an existing table.

### ADD COLUMN

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

## ALTER COLUMN .. ADD INDEX

### Overview
`ADD INDEX` is used to create an index for an existing `symbol` column.

### Syntax
```sql
ALTER TABLE 'TABLE' ALTER COLUMN 'COLUMN_NAME' ADD INDEX;
```

### Example
```sql
ALTER TABLE trades ALTER COLUMN symbol ADD INDEX;
```

> For more information about `INDEX` please refer to the **[INDEX section](sqlINDEX.md)**.

## DROP COLUMN

### Overview
`DROP COLUMN` is used to remove an existing column from an existing table. 

> When using `DROP COLUMN`, the data in that column will be deleted

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

## DROP PARTITION

### Overview
`DROP PARTITION` is used to remove an existing partition from a table.

> When using `DROP PARTITION`, ALL data in the partition will be deleted.

> `DROP PARTITION` will drop ALL columns within the selected partition.

### Syntax
Dropping a partition is done with the following syntax:
```sql
ALTER TABLE 'TABLE' DROP PARTITION 'PARTITIONS';
```

Where
'TABLE' is the name of the table from which you would like to drop a partition.
'PARTITIONS' are the names of the partitions you would like to delete, separated by commas
The names of your partitions directly depend on how you created the table when using `PARTITION BY`
See [Create Table](sqlCREATE.md) for more information.

| Table Partition                           | Partition format                                  |
|-------------------------------------------|---------------------------------------------------|
|DAY                                        |'YYYY-MM-DD'                                       |
|MONTH                                      |'YYYY-MM'                                          |
|YEAR                                       |'YYYY'                                             |

### Examples
Drop one partition
```sql
--DAY
ALTER TABLE my_table DROP PARTITION '2019-05-18';
--MONTH
ALTER TABLE my_table DROP PARTITION '2019-05';
--YEAR
ALTER TABLE my_table DROP PARTITION '2019';
```

Drop several partitions
```sql
ALTER TABLE my_table DROP PARTITION '2018','2019';
```
