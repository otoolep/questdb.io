---
id: indexes
title: INDEXES
sidebar_label: Indexes
---

An index stores row locations for each value of the target column in order to provide faster read access.
It allows to bypass full table scans by directly accessing the relevant rows on queries with `WHERE` conditions.

> Indexing is available for `SYMBOL` columns. Index support for other types will be added over time.

There are two ways to create an index:
- At table creation time using  [CREATE TABLE](createTable.md#index).
- Using  [ALTER TABLE](alterTableAlterColumnAddIndex.md) 

## How does Index work

Index works by creating a table that stores row locations of each distinct value for the target symbol. Once the index is created,
inserting data into the table will update the index.

Here is an example of a table and its index table.
```shell script
Table                                       Index
|Row ID | Symbol    | Value |             | Symbol     | Row IDs       |
| 1     | A         | 1     |             | A          | 1, 2, 4       |
| 2     | A         | 0     |             | B          | 3             |
| 3     | B         | 1     |             | C          | 5             |
| 4     | A         | 1     |
| 5     | C         | 0     |
```

`INSERT INTO Table values(B, 1);` would trigger two updates: one for the Table, and one for the Index.
```shell script
Table                                       Index
|Row ID | Symbol    | Value |             | Symbol     | Row IDs       |
| 1     | A         | 1     |             | A          | 1, 2, 4       |
| 2     | A         | 0     |             | B          | 3, 6          |
| 3     | B         | 1     |             | C          | 5             |
| 4     | A         | 1     |
| 5     | C         | 0     |
| 6     | B         | 1     |
```

### Advantages
Index allows to greatly reduce the complexity of queries that span a subset of the indexed column, typically with `WHERE` clauses.

Consider the following query applied to the above table `SELECT sum(Value) FROM Table WHERE Symbol='A';`
- **Without Index**, the query engine would scan the whole Table in order to perform the query. It will need to perform 6 operations
(read each of the 6 rows once).
- **WIth Index**, the query engine will first scan the index table, which is considerably smaller. In our example, it will find A 
in the first row. Then, the Query engine would check the values at the specific locations 1, 2, 4 in the Table to read the 
corresponding values. As a result, it would only scan the relevant rows in Table and leave irrelevant rows untouched. 

### Tradeoffs
There are two tradeoffs with Index. 

**Storage space**: The index will maintain a table with each distinct symbol value and the locations where these symbols can be found. As a result,
there is a small cost of storage associated with indexing a symbol field.

**Ingestion performance**: Each new entry in the table will trigger an entry in the Index table. This means that any
write will now require two write operations, and therefore take twice as long.


