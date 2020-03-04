---
id: alterTable
title: ALTER TABLE
sidebar_label: ALTER TABLE
---

## Syntax

![alt-text](assets/alter-table.svg)

> alter table commits current transaction regardless of the outcome of the alter table statement

### ADD COLUMN

Adds columns to existing table. Table has to exist and column names have to be unique with existing table columns. 

![alt-text](assets/alter-table-add-column.svg)

Single column is added instantly and is not back-populated even if table contains data. Please refer our guide to [the data types](datatypes.md).
Adding a new column does not lock the table for reading and also does not wait on any reads to finish.

While single column is added atomically, adding multiple columns is not an atomic operation. QuestDB will stop adding remaining columns on the list on the first failure.
It is therefore possible to add some columns and not others.

### Example
The following example adds a new column called `comment` that is of `STRING` type to the table `ratings`

```sql
ALTER TABLE ratings ADD COLUMN comment STRING;
```

## ADD INDEX to Column

Syntax of adding index to column is as follows:

![alt-text](assets/alter-table-add-index.svg)

Adding index is an atomic, non-blocking and non-waiting operation. Once complete optimiser will start using new index for SQL executions.

### Example
```sql
ALTER TABLE trades ALTER COLUMN symbol ADD INDEX;
```

> For more information about `INDEX` please refer to the **[INDEX section](sqlINDEX.md)**.

## DROP COLUMN

Drops (removes) column from existing table. Before the operation can proceed it commits current transaction. Hence transaction
is committed regardless of the success or failure of the drop.  

![alt-text](assets/alter-table-drop-column.svg)

Dropping column does not lock the table for reading and also does not wait on any reads to finish. Drop column will also attempt to
remove column files from all partitions, thus freeing up disk space right away. On Windows OS that may not be possible and
file remove operation is postponed until files are released by all threads. However logical drop column will succeed on Windows in
presence of active readers.

### Example
The following example deletes the column called `comment` from the table `ratings`

```sql
ALTER TABLE ratings DROP COLUMN comment;
```

## DROP PARTITION

Drops one or more table partitions. Partition name mush match the name of the directory for the given partition.

![alt-text](assets/alter-table-drop-partition.svg)

Just like with columns dropping of partitions is a non-blocking and non-waiting operation. While being atomic for a single partitions, dropping of
multiple partitions is in itself non-atomic. Drop partition will bail on the first failure and will not continue with the list.

Naming convention for partition directories is as follows:

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
