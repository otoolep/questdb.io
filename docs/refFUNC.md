---
id: functions
title: Functions
sidebar_label: Functions
---

This section gives an overview of the functions available in QuestDB's web console.


## Text

### concat()

`concat` generates a string from one or inputs. 

Example
```sql
-- Query:
SELECT firstName, lastName, concat(firstName, ' ', lastName) FROM names;

-- Result:
| firstName     | lastName          | concat                |
|---------------|-------------------|-----------------------|
| Tim           | Thompson          | Tim Thompson          |
| Anna          | Thompson          | Anna Thompson         |
| Anna          | Mason             | Anna Mason            |
| Tom           | Johnson           | Tom Johnson           |
| Tim           | Smith             | Tim Smith             | 
```

As another example, the below can be used to generate `line protocol`
```sql
-- Query:
SELECT
concat(
    'trades,instrument=', rnd_str(2,2,0), 
    ',side=', rnd_str('B', 'S'),
    ' price=', abs(cast(rnd_double(0)*100000 as int)),
    ',quantity=', abs(cast(rnd_double(0)*10000 as int)),
    ' ',
    1571270400000 + (x-1) * 100
)
FROM long_sequence(5) x;

-- Result:
trades,instrument=CR,side=B price=70867,quantity=9192 1571270400000
trades,instrument=LN,side=S price=37950,quantity=1439 1571270400100
trades,instrument=ZJ,side=S price=82829,quantity=8871 1571270400200
trades,instrument=EW,side=S price=10427,quantity=1945 1571270400300
trades,instrument=MI,side=B price=99348,quantity=8450 1571270400400
```

### length()

`length(input)` is used to return the number of characters where `input` is either
- a `string`
- a `symbol`
- a `binary` blob

Example:
```sql
-- Query:
SELECT name a, length(name) b FROM names limit 4

-- Result:
| a         | b         |
|-----------|-----------|
| AARON     | 5         |
| AMELIE    | 6         |
| TOM       | 3         |
| null      | -1        |
```

## Miscellaneous

