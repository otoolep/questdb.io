---
id: sql
title: Query Language
sidebar_label: Query Language
---

## Introduction
QuestDB attempts to implement standard ANSI SQL. We also attempt to be PostgreSQL compatible, although some of it is work in progress. QuestDB implements the following clauses in this execution order:

1. FROM
2. ON
3. JOIN
4. WHERE
5. GROUP BY (implicit)
6. WITH
7. HAVING (implicit)
8. SELECT
9. DISTINCT
10. ORDER BY
11. LIMIT

We also implemted sub-queries. They can be used anywhere table name is used. Our sub-query implementation adds virtually zero to SQL execution cost and we encourage their use to add flavour of functional language to old-school SQL. 

## Important differences from standard SQL

### `SELECT * FROM` Optionality

In QuestDB `select * from` is optional.

```sql
select * from tab
```

and

```sql
tab
```

achive the same effect.

While `select * from` makes SQL look more complete on a single time, there are examples where its optionality makes things a lot easier to read. See examples in `GROUP BY` section.

### Lack of `GROUP BY ... HAVING`

We do not support explicit `GROUP BY` clause. Instead QuestDB optimiser derives group-by implementation from `SELECT` clause. For example:

```sql
select a, b, c, d, sum(e) from tab group by a, b, c, d
```

We find enumerating subset of `SELECT` columns in `GROUP BY` clause redundant and thereofre unnecessary. The same SQL in QuestDB SQL-dialect will look like:

```sql
select a, b, c, d, sum(e) from tab
```

Lets see how we replace
```sql
select a, b, c, d, sum(e) 
from tab 
group by a, b, c, d 
having sum(e) > 100
```
Here `select * from` optionality and featherweight sub-queries come to the rescue:

```sql
(select a, b, c, d, sum(e) sum from tab) where sum > 100
```

Here we avoided repetitive aggregation expressions without extra furniture syntax.

## SQL extensions

We have extended SQL language to support our data storage model and simplify semantics of timeseries queries.

- `LATEST BY`
- `SAMPLE BY`

Please follow the links for detailed description of these clauses.