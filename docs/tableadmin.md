---
id: tableadmin
title: Table Administration
sidebar_label: Table Admin
---

## CREATE TABLE

### Overview
`CREATE TABLE` is used to create a new table in your database.  

### Syntax
General syntax is as follows
```sql
CREATE TABLE `NAME`(`SCHEMA`) [TIMESTAMP(`TS_COLUMN`)] [PARTITION BY `DIVISOR`];
```

Note that `TIMESTAMP` and `PARTITTION` are **optional**. The minimum to create a table is therefore simply:
```sql
CREATE TABLE `NAME`(`SCHEMA`);
```

> Table names are unique, therefore you should choose a
  unique name when creating a table. QuestDB assesses the existence of a table based on whether the corresponding
>directory exists or not.

> Table name can be utf8 encoded but must not contain '.' (dot). Dot is used to separate table and field name,
   where table is uses as an alias.



### NAME
`NAME` is the name of your table. This is the name that will then be invoked for interacting with the table. 
For example in `SELECT . . FROM` queries. You can choose any table name you would like as long as it is **unique**.

### SCHEMA
`SCHEMA` is a list of pairs of `COLUMN_NAMES` and `DATA_TYPES`, separated by commas.

> For more information on data types, see the section on **[data types](datatypes.md)**

Example:
```sql
syb SYMBOL, price DOUBLE, timestamp TIMESTAMP, str STRING
```

### OPTIONS
<table class="alt">
<thead>

<th>Parameter</th>
<th>Comments</th>

</thead>
<tbody>
<tr>
<td><code>PARTITION BY </code> (optional)</td>
<td>Define the time interval by which you want to partition your data. Currently supported are <code>NONE</code>, <code>DAY</code>, <code>MONTH</code> and <code>YEAR</code> </td>
</tr>
<tr>
<td><code>TIMESTAMP() </code> (optional)</td>
<td>Use to specify which column is to be used as timestamp</td>
</tr>
<tr>

</tbody>
</table>

> QuestDB partitions by timestamp. Where a column is used as `TIMESTAMP`, it will allow for PARTITION.
> Tables without `TIMESTAMP` can NOT be partitioned. 

> Where a column is designated as `TIMESTAMP`, QuestDB will enforce that new entries have a `TIMESTAMP` value 
>greater or equal to the latest to maintain ascending order.

> Timestamp flags a column to give it a special status. But that column does not need to correspond to a time. It can also be used as a `LONG`
> to enforce normal indexing by row number for example.

### Examples
Creating a table. No partition is set. It will by default create one single partition.
```sql
CREATE TABLE orders (sym SYMBOL, amount DOUBLE, side BYTE, timestamp TIMESTAMP) TIMESTAMP(timestamp);
```

Creating a table with partition by `DAY`:
```sql
CREATE TABLE orders (sym SYMBOL, amount DOUBLE, side BYTE, timestamp TIMESTAMP) PARTITION BY DAY;
```

## SYMBOL CACHE

### Usage
Where your `TYPE` is `SYMBOL`, you can use the `CACHE` flag to cache the symbol and make access faster.

> Caching symbol values is optional. 

When `SYMBOL` is `CACHED`, the `INT <-> STRING` dictionary is maintained on Java Heap. This allows faster dictionary access 
for both write and read operations. 

`NOCACHE` or omitting this option will maintain dictionary directly on memory mapped file. This is reduces memory requirement 
dramatically and allows for very large dictionary size. `NOCACHE` slows down write and read performance of `SYMBOL` as a penalty.

>If the number of distinct symbol value is too large (over 100k) then on-heap cache could lead to GC and out-of-memory errors. 
>We recommend `NOCACHE` in this case. 

### Syntax
To flag a `SYMBOL` column as `CACHE`, simply add `CACHE` next to the declaration.
```sql
CREATE TABLE orders (sym SYMBOL ['CACHE'])
``` 

`[CACHE]` is optional. If you do not want to `CACHE` the symbol column in question, you can either explicitly declare:
```sql
CREATE TABLE orders (sym SYMBOL NOCACHE)
``` 

or ommit `CACHE` and `NOCACHE` alltogether, which is equivalent:
```sql
CREATE TABLE orders (sym SYMBOL)
```

### Example
The following syntax is used to declare a symbol column as `CACHE`:
```sql
CREATE TABLE orders (sym SYMBOL CACHE, amount DOUBLE, side BYTE, timestamp TIMESTAMP)
```

The following syntax is used to declare a symbol column as `NOCACHE`:
```sql
CREATE TABLE orders (sym SYMBOL NOCACHE, amount DOUBLE, side BYTE, timestamp TIMESTAMP)
// is equivalent to //
CREATE TABLE orders (sym SYMBOL, amount DOUBLE, side BYTE, timestamp TIMESTAMP)
```


## CREATE TABLE AS
You can create a new table by copying the contents of another table using `CREATE TABLE AS`.

### Syntax
The syntax involves `CREATE TABLE` followed by the name of the new table followed by `AS` and your `QUERY` between ()

```sql
CREATE TABLE 'NEW_TABLE_NAME' AS (`QUERY`);
```

`QUERY` is the query you would like to use to create your new table from the existing table.

### Examples
The following will create a new table called `ratings` and will populate it with all the contents of 'ratings.csv'
```sql
CREATE TABLE ratings as ('ratings.csv');
//equivalent to//
CREATE TABLE ratings as (SELECT * FROM 'ratings.csv');
```

The following will create a new table called 'goodratings' and will populate it with the contents of ratings.csv matching the query
```sql
CREATE TABLE goodratings as ('ratings.csv' where rating > 3.5);
//equivalent to//
CREATE TABLE goodratings as (SELECT * FROM 'ratings.csv' where rating > 3.5);
```

### CAST

### Usage
`CREATE TABLE AS` can be used in conjunction with `CAST` to change column types.

### Syntax
 ```sql
 CREATE TABLE 'NAME' as (`QUERY`), CAST(`COLUMN` as `TYPE`);
 ```

where
`NAME` is the name of the table you want to create via `CREATE TABLE AS`
`QUERY` is the query you would like to use to create your new table from the existing table.
'COLUMN' is the `COLUMN_NAME` in the existing table for which you wish to change type.
`TYPE` is the new type (see **[types](datatypes.md)**)

### Examples
Casting one column
```sql
CREATE TABLE ratings as (SELECT * FROM 'ratings.csv'), cast(rating as DOUBLE);
```

Casting several columns
```sql
CREATE TABLE ratings as (SELECT * FROM 'ratings.csv'), 
cast(rating as DOUBLE),
cast(movieId as DOUBLE);
```

With symbol caching
```sql
CREATE TABLE orders as ('orders.csv'),
cast(buyOrSell as SYMBOL CACHE);
```



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
`TYPE` is the **[data type](datatypes.md)** for the new column.

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
`NEW_TYPE` is the new **[data type](datatypes.md)** for the column.

### Examples
The following example converts `movieId` that is of `LONG` type to `DOUBLE`

```sql
ALTER TABLE ratings ALTER COLUMN movieId DOUBLE;
```


## DROP TABLE
`DROP TABLE` is used to permanently delete a table and its contents.

### Syntax
`DROP TABLE` uses the following syntax

```sql
DROP TABLE 'TABLE_NAME';
```

### Examples
```sql
DROP TABLE ratings;
```

> When you would like to delete the data inside a table but to keep the table, use the **truncate** function.
>


## TRUNCATE TABLE
`TRUNCATE TABLE` is used to permanently delete the contents of a table without deleting the table itself.

### Syntax
`TRUNCATE TABLE` uses the following syntax

```sql
TRUNCATE TABLE 'TABLE_NAME';
```

### Examples
```sql
TRUNCATE TABLE ratings;
```

> When you would like to delete both the data and the table structure, use the **drop** function.