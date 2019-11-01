---
id: sql
title: SQL Language
sidebar_label: SQL Language
---

## Introduction
QuestDB Implements ANSI SQL. Besides standard SQL implementation, we offer enhanced SQL which allows to 
- simplify your queries by not requiring keywords where they are obvious or explicit
- run functions within your queries to enhance your querying capability

## Simplifications

Where a query returns all columns of a table, 'SELECT . . FROM' can be omitted.

```sql
SELECT * FROM ratings;
//is equivalent to simplified query//
ratings;
```

In the same fashion, for `GROUP BY` statements, the `GROUP BY column` element can be omitted when implicitly defined 
by the query

```sql
SELECT userId, avg(rating) FROM ratings GROUP BY userId;
// is equivalent to simplified query//
SELECT userId, avg(rating) FROM ratings;
```

## Enhancements and functions
