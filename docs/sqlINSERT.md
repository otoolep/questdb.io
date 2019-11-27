---
id: insert
title: INSERT 
sidebar_label: INSERT
---

## Overview
The `INSERT` statement is used by the SQL compiler to insert data into a QuestDB table.

## Syntax
`INSERT` syntax is as follows:
```sql
INSERT INTO TABLE_NAME VALUES;
```

Where `TABLE_NAME` is the name of the table where you would like to insert the data and `VALUES` are the values you want to insert. 

`VALUES` can be passed in two forms:

### Directly
```sql
values(value1, value2, value3, ...);
```

### As a Query
```sql
INSERT INTO TABLE1 QUERY;
```

Where `QUERY` is a normal SQL query expressed as a **[select statement](sqlSELECT.md)**.

## Examples

### Inserting values
```sql
INSERT INTO trades values(to_timestamp('2019-10-17T00:00:00', 'yyyy-MM-ddTHH:mm:ss'),'AAPL',255,123.33,'B');
```

### Inserting query results
```sql
INSERT INTO confirmed_trades 
    SELECT timestamp, instrument, quantity, price, side
    FROM unconfirmed_trades
    WHERE trade_id = '47219345234'
;
```

> Note that using this method, you may insert one or several results at once depending on the output of your query.