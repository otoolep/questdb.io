---
id: create
title: CREATE TABLE
sidebar_label: CREATE TABLE
---

Creates new table in the database  

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
CREATE TABLE my_table(symb SYMBOL, price DOUBLE, ts TIMESTAMP, strng STRING)
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

> `Windows users`: NTFS tends to considerably slow down as the number of directories increases. This in turn affects the
>database performance as it needs to access the filesystem of the host machine. If you are running QuestDB on Windows, we recommend
>using larger partitions (BY MONTH instead of BY DAY for example).

### Examples
Creating a table. No partition is set. It will by default create one single partition.
```sql
CREATE TABLE orders(sym SYMBOL, amount DOUBLE, side BYTE, timestamp TIMESTAMP) TIMESTAMP(timestamp);
```

Creating a table with partition by `DAY`:
```sql
CREATE TABLE orders(sym SYMBOL, amount DOUBLE, side BYTE, timestamp TIMESTAMP) PARTITION BY DAY;
```

> `Windows users`: NTFS tends to considerably slow down as the number of directories increases. This in turn affects the
>database performance as it needs to access the filesystem of the host machine. If you are running QuestDB on Windows, we recommend
>using larger partitions (BY MONTH instead of BY DAY for example).

## INDEX

QuestDB supports indexes on `symbol` fields. To create an index on a symbol field when creating a table, please use the following syntax:

### Syntax
```sql
CREATE TABLE 'TABLE'(symbol_field symbol INDEX, ...);
```

### Example
```sql
CREATE TABLE orders(sym SYMBOL INDEX, anount DOUBLE, side BYTE, timestamp TIMESTAMP);
```

> Indexes can also be created on the fly. For more information about `INDEX` please refer to the **[INDEX section](sqlINDEX.md)**.

> `Windows users`: NTFS tends to considerably slow down as the number of directories increases. This in turn affects the
>database performance as it needs to access the filesystem of the host machine. If you are running QuestDB on Windows, we recommend
>using larger partitions (BY MONTH instead of BY DAY for example).

## INDEX

QuestDB supports indexes on `symbol` fields. To create an index on a symbol field when creating a table, please use the following syntax:

### Syntax
```sql
CREATE TABLE 'TABLE'(symbol_field symbol INDEX, ...);
```

### Example
```sql
CREATE TABLE orders(sym SYMBOL INDEX, anount DOUBLE, side BYTE, timestamp TIMESTAMP);
```

> Indexes can also be created on the fly. For more information about `INDEX` please refer to the **[INDEX section](sqlINDEX.md)**.

## SYMBOL CACHE

### Usage
`SYMBOL` converts strings as integers and stores a dictionary of `INT <-> STRING`. This allows to store strings as integers and 
seamlessly reduces storage requirements and compexity for string operations. 

When `SYMBOL` is `CACHED`, the `INT <-> STRING` dictionary is maintained on the Java Heap. This allows faster dictionary access 
for both read and write operations. 

`NOCACHE` or omitting this option will maintain dictionary directly on memory mapped file. This is reduces memory requirement 
dramatically and allows for very large dictionary size. `NOCACHE` slows down write and read performance of `SYMBOL` as a penalty.

>If the number of distinct symbol value is too large (over 100k) then on-heap cache could lead to GC and out-of-memory errors. 
>We recommend `NOCACHE` in this case. 

### Syntax
To flag a `SYMBOL` column as `CACHE`, simply add `CACHE` next to the declaration.
```sql
CREATE TABLE orders(sym SYMBOL ['CACHE'])
``` 

`[CACHE]` is optional. If you do not want to `CACHE` the symbol column in question, you can either explicitly declare:
```sql
CREATE TABLE orders(sym SYMBOL NOCACHE)
``` 

or omit `CACHE` and `NOCACHE` altogether, which is equivalent:
```sql
CREATE TABLE orders(sym SYMBOL)
```

### Example
The following syntax is used to declare a symbol column as `CACHE`:
```sql
CREATE TABLE orders(sym SYMBOL CACHE, amount DOUBLE, side BYTE, timestamp TIMESTAMP)
```

The following syntax is used to declare a symbol column as `NOCACHE`:
```sql
CREATE TABLE orders(sym SYMBOL NOCACHE, amount DOUBLE, side BYTE, timestamp TIMESTAMP)
// is equivalent to //
CREATE TABLE orders(sym SYMBOL, amount DOUBLE, side BYTE, timestamp TIMESTAMP)
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

## CAST

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

