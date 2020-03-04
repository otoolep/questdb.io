---
id: functionsAggregation
title: Aggregation
sidebar_label: Aggregation
---

## sum
`sum(value)` - adds values together 

#### Description

Argument type is any numeric value.

Adds values ignoring missing data, e.g. `null` values. 

Example:
```sql
SELECT item, sum(quantity) FROM transactions;
```

`sum` does not perform overflow check. To avoid overflow cast argument to wider type:

Example:

For INT `a` column, use

```sql
SELECT sum(cast(a as long)) from table
```  

#### Return value

Return value type is the same as the type of the argument.

## count
`count` counts rows in dataset. This is equivalent to `count(*)`. 

Example:
```sql
-- this will return the total number of items in the transactions table
SELECT count() FROM transactions;

-- this will return the list of items in the transactions table and the number of transactions for each symbol
SELECT symbol, count() FROM transactions;
```

## avg
`avg` returns the average value for the target column. `null` values are ignored.

Example:
```sql
-- this will return the average transaction quantity per instrument
SELECT symbol, avg(quantity) FROM transactions;
```
## min
`min` returns the lowest value for the target column within the data selected.

Example:
```sql
-- this will return the lowest traded price for each instrument
SELECT symbol, min(price) FROM transactions;
```

## max
`max` returns the highest value for the target column within the data selected.

Example:
```sql
-- this will return the highest traded price for each instrument
SELECT symbol, max(price) FROM transactions;
```
