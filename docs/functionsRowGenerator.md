---
id: functionsRowGenerator
title: Row Generator
sidebar_label: Row Generator
---

## long_sequence
- `long_sequence(iterations)` - generates rows.

#### Arguments
-`iterations`: is a `long` representing the number of rows to generate.

#### Description
`long_sequence(iterations)` is used to:
- Generate a number of rows defined by `iterations`.
- Generate a column `x:long` of monotonically increasing long integers starting from 1, which 
can be accessed for queries.

> do not be afraid to generate very large datasets for your testing e.g billions of rows or more if your disk allows.

#### Examples
- Generating multiple rows

```sql
SELECT x, rnd_double() FROM long_sequence(5);
```

```
| x         | rnd_double        |
|-----------|-------------------|
| 1         | 0.3279246687      |
| 2         | 0.8341038236      |
| 3         | 0.1023834675      |
| 4         | 0.9130602021      |
| 5         | 0.718276777       |
```

- Accessing row number via `x` column

```sql
SELECT x, x*x FROM long_sequence(5);
```

```
| x       | x*x     |
|---------|---------|
| 1       | 1       |
| 2       | 4       |
| 3       | 9       |
| 4       | 16      |
| 5       | 25      |
```
