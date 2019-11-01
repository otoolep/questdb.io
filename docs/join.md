---
id: join
title: JOIN
sidebar_label: JOIN
---

`JOIN` is used in order to combine rows from two or more tables together based on a common column.
It can be used directly on tables, or on the results of other queries themselves.

QuestDB supports (INNER) JOIN, LEFT JOIN, ASOF JOIN, OUTER JOIN and CROSS JOIN.


## (INNER) JOIN 

### Overview
`(INNER) JOIN` is used to return rows from 2 tables where the records on the compared column have matching values in both tables
![alt-text](assets/innerjoin.gif)

### Syntax
General syntax is as follows:
```sql
SELECT column_names 
FROM table1 
[INNER] JOIN table2 
ON table1.column_name = table2.column_name;
```

### Examples

The following query will return the movieId and the average rating from table `ratings`. It will also add a column
for the `title` from table `movies`. The corresponding title will be identified based on the `movieId` in the `ratings` table
matching an `id` in the `movies` table.
```sql
SELECT movieId a, title, avg(rating)
FROM ratings
INNER JOIN (select movieId id, title from movies)
ON ratings.movieId = id; 
```

By default `JOIN` is interpreted as `INNER JOIN`. Therefore `INNER` can be dropped

```sql
SELECT movieId a, title, avg(rating)
FROM ratings
JOIN (select movieId id, title from movies)
ON ratings.movieId = id; 
```

## OUTER JOIN

### Overview
`(LEFT) OUTER JOIN` will return **all** records from the LEFT table, and if matched, the records of the RIGHT table.
When there is no match for the RIGHT table, it will return `NULL` values.
![alt-text](assets/leftjoin.gif)

### Syntax
General syntax is as follows:
```sql
SELECT column_names 
FROM table1 
OUTER JOIN table2 
ON table1.column_name = table2.column_name;
```

### Examples
@TODO

## ASOF JOIN

### Overview
`ASOF` joins are used on time-series data to join two tables based on timestamp where timestamps do not exactly match.
For a given record at a given timestamp, it will return the corresponding record in the other table at the closest timestamp
**prior to** the timstamp in the first table.

> To be able to leverage `ASOF JOIN`, both joined table must have a designated `timestamp` column. To designate a column as `timestamp`, 
>please refer to the **[CREATE TABLE](tableadmin.md)** section.

### Syntax

`ASOF JOIN` is used with the following syntax:
```sql
SELECT columns
FROM table1
ASOF JOIN (SELECT columns from table2)
[ON table1.column1 = table2.column2];
```

> In this case, the timestamps used will be these of table1. If you would like to return a table where ALL timestamps of BOTH tables are returned
>and for each table the `ASOF` value of the other table, please see **`SPLICE JOIN`**.

### Examples
Consider the following tables.
```shell script
ASKS                               |BIDS
=====================================================================
ts,                          bid   | ts,                          ask
---------------------------------------------------------------------
2019-10-17T00:00:00.000000Z, 100   | 2019-10-17T00:00:00.100000Z, 101
2019-10-17T00:00:00.200000Z, 101   | 2019-10-17T00:00:00.300000Z, 102
2019-10-17T00:00:00.400000Z, 102   | 2019-10-17T00:00:00.500000Z, 103
```

Note that there is no `ask` at timestamp `2019-10-17T00:00:00.100000Z`. The `ASOF JOIN` will look for the value in the
`ask` table that has the closest timestamp inferior or equal to the target timestamp.

Therefore the following query:
```sql
SELECT ts timebid, bid, ask 
FROM ASKS 
ASOF JOIN 
    (
    SELECT ts timesask, ask ask 
    FROM ASKS
    );
```

Will return the following results
```shell script
RESULTS                               
=================================================
ts,                          bid        ask
-------------------------------------------------
2019-10-17T00:00:00.000000Z, 100,      101
2019-10-17T00:00:00.200000Z, 101,      101
2019-10-17T00:00:00.400000Z, 102,      102
```

Note that the above query does not use the optional `ON` clause. In case you need additional filtering on the two tables, you can use the `ON` clause as follows:

```sql
bSELECT ts timebid, instrument bidInstrument, bid, ask 
FROM ASKS 
ASOF JOIN 
    (
    SELECT ts timesask, instrument askInstrument, ask ask 
    FROM ASKS
    )
    ON bidInstrument=askInstrument;
```


## SPLICE JOIN

### Overview
`SPLICE JOIN` is a full `ASOF JOIN`. It will return all the timestamps from table1 and table2.
For each timestamp in a given table, it will other fields with either the exact corresponding value in the other table (for exact match), 
or the ASOF value otherwise.

### Syntax
`SPLICE JOIN` follows the same syntax as `ASOF JOIN`.
```sql
SELECT columns
FROM table1
SPLICE JOIN (SELECT columns from table2)
[ON table1.column1 = table2.column2];
```

### Examples
Consider the following tables.
```shell script
ASKS                               |BIDS
=====================================================================
ts,                          bid   | ts,                          ask
---------------------------------------------------------------------
2019-10-17T00:00:00.000000Z, 100   | 2019-10-17T00:00:00.100000Z, 101
2019-10-17T00:00:00.200000Z, 101   | 2019-10-17T00:00:00.300000Z, 102
2019-10-17T00:00:00.400000Z, 102   | 2019-10-17T00:00:00.500000Z, 103
```

`SPLICE JOIN` will first build a list of **all unique timestamps** by comparing the lists of the `ASKS` and `BIDS` tables.
It will then return for each timestamp the exact matching value, or the ASOF value if no match is found.

Therefore the following query:
```sql
SELECT ts timebid, bid, ask 
FROM ASKS 
SPLICE JOIN 
    (
    SELECT ts timesask, ask ask 
    FROM ASKS
    );
```

Will return the following results
```shell script
RESULTS                               
=================================================
ts,                          bid        ask
-------------------------------------------------
2019-10-17T00:00:00.000000Z, 100,      null
2019-10-17T00:00:00.100000Z, 100,      101
2019-10-17T00:00:00.200000Z, 101,      101
2019-10-17T00:00:00.300000Z, 101,      102
2019-10-17T00:00:00.400000Z, 102,      102
2019-10-17T00:00:00.500000Z, 101,      103
```

Note that the above query does not use the optional `ON` clause. In case you need additional filtering on the two tables, you can use the `ON` clause as follows:

```sql
SELECT ts timebid, instrument bidInstrument, bid, ask 
FROM ASKS 
SPLICE JOIN 
    (
    SELECT ts timesask, instrument askInstrument, ask ask 
    FROM ASKS
    )
    ON bidInstrument=askInstrument;
```

## CROSS JOIN

### Overview
`CROSS JOIN` will return the cartesian product of the two tables being joined. It can be used to a table with all possible combinations.

### SYNTAX
```sql
table1 CROSS JOIN table2;
```
> Note that `CROSS JOIN` does not have `ON` clause.

### EXAMPLE
The following will return all possible combinations of starters and deserts
```sql
SELECT * FROM starters CROSS JOIN (SELECT * FROM deserts);
```