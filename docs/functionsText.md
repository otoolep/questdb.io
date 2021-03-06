---
id: functionsText
title: Text Functions
sidebar_label: Text Functions
---

## concat

`concat(str, ...)`  - concatenates a string from one or more input values 

Example
```sql
SELECT firstName, lastName, concat(firstName, ' ', lastName) FROM names;
```

| firstName     | lastName          | concat                |
|---------------|-------------------|-----------------------|
| Tim           | Thompson          | Tim Thompson          |
| Anna          | Thompson          | Anna Thompson         |
| Anna          | Mason             | Anna Mason            |
| Tom           | Johnson           | Tom Johnson           |
| Tim           | Smith             | Tim Smith             | 


As another example, the below can be used to generate `line protocol`
```sql
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
```

```
trades,instrument=CR,side=B price=70867,quantity=9192 1571270400000
trades,instrument=LN,side=S price=37950,quantity=1439 1571270400100
trades,instrument=ZJ,side=S price=82829,quantity=8871 1571270400200
trades,instrument=EW,side=S price=10427,quantity=1945 1571270400300
trades,instrument=MI,side=B price=99348,quantity=8450 1571270400400
```

## length

`length(string)` - reads length of `string` value type (result is `int`)

`length(symbol)` - reads length of `symbol` value type (result is `int`)

`length(blob)` - reads length of `binary` value type (result is `long`)


- a `string`
- a `symbol`
- a `binary` blob

Example:
```sql
SELECT name a, length(name) b FROM names limit 4
```

| a         | b         |
|-----------|-----------|
| AARON     | 5         |
| AMELIE    | 6         |
| TOM       | 3         |
| null      | -1        |


## ~=

`~=(string, regex)` - matches `string` value to regex

`~=(symbol, regex)` - matches `symbol` value to regex

https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html

## !~

`!~(string, regex)` - checks if `string` value does not match regex

`!~(symbol, regex)` - checks if `symbol` value does not match regex

