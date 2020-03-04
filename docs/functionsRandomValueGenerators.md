---
id: functionsRandomValueGenerators
title: Random Value Generators
sidebar_label: Random Value Generators
---

## Overview 
The following functions have been created to help with our test suite. They are also useful for users testing QuestDB on
specific workloads in order to quickly generate large test datasets that mimic the structure of their actual data.

QuestDB supports the following random generation functions:
- rnd_boolean
- rnd_int
- rnd_str
- rnd_double
- rnd_float
- rnd_short
- rnd_date
- rnd_timestamp
- rnd_symbol
- rnd_long
- rnd_byte
- rnd_bin
- rnd_char
- rnd_long256


#### Usage
>Random functions should be used for populating test tables only. They do not hold values in memory and calculations should not be performed at the same time as the
>random numbers are generated. 
>
> For example, running `SELECT round(a,2), a FROM (SELECT rnd_double() a FROM long_sequence(10));` is bad practice
>and will return inconsistent results. 
>
>A better approach would be to populate a table and then run the query. So for example
>- `CREATE TABLE test(val double);` (create)
>- `INSERT INTO test SELECT * FROM (SELECT rnd_double() FROM long_sequence(10));` (populate)
>- `SELECT round(val,2) FROM test;`  (query)

## rnd_int
- **rnd_int()**: returns a random integer.
- **rnd_int(min, max, nanRate)** returns a random integer between `min` and `max` (both included).
NaN values may occur at a frequency defined by `nanRate`.

Parameters:
- `min`: minimum value returned by the random generator.
- `max`: maximum value returned by the random generator. 
- `nanRate` defines the frequency of occurrence of `null` values:
    - `0`: No `NaN` will be returned.                                 
    - `1`: Will only return `NaN`.                                       
    - `N > 1`: On average, one in N generated integer will be NaN.


Example:
```sql
-- Query:
select rnd_int() from long_sequence(5)
SELECT rnd_int(1,4,0) FROM long_sequence(5);
SELECT rnd_int(1,4,1) FROM long_sequence(5);
SELECT rnd_int(1,4,2) FROM long_sequence(5);

-- Result:
1822685476, 1173192835, -2808202361, 78121757821, 44934191
1,4,3,1,2
null,null,null,null,null 
1,null,4,null,2
```

## rnd_short
- **rnd_short**: returns a short integer, i.e between `-3768` and `32767`
- **rnd_short(min, max)**: returns values between `min` and `max` boundaries (both included).

Example:
```sql
-- Query:
SELECT rnd_short() FROM long_sequence(5);
SELECT rnd_short(-1,1) FROM long_sequence(5);

-- Result:
-27434,234,-12977,8843,24
0,1,-1,-1,0
```

## rnd_long
- **rnd_long()**: returns a random long value.
- **rnd_long(min, max, nanRate)**: returns a random long between `min` and `max` (both included) with a proportion
of NaN defined by `nanRate`.

Parameters:
- `min`: minimum value returned by the random generator.
- `max`: maximum value returned by the random generator. 
- `nanRate` defines the frequency of occurrence of `null` values:
    - `0`: No `NaN` will be returned.                                 
    - `1`: Will only return `NaN`.                                       
    - `N > 1`: On average, one in N generated integer will be NaN.

Example:
```sql
-- Query:
SELECT rnd_long() FROM long_sequence(5);
SELECT rnd_long(1,4,0) FROM long_sequence(5);
SELECT rnd_long(1,4,1) FROM long_sequence(5);
SELECT rnd_long(-10000000,10000000,2) FROM long_sequence(5);

-- Result:
1,4,3,1,2
null,null,null,null,null 
-164567594, -323331140, 26846334, -892982893, -351053301
300291810703592700, 2787990010234796000, 4305203476273459700, -8518907563589124000, 8443756723558216000
```

## rnd_boolean
`rnd_boolean` returns a random boolean `true` or `false` with equal probability.

Example:
```sql
-- Query:
SELECT value a, count() b FROM (SELECT rnd_boolean() value FROM long_sequence(100));

-- Result:
| a                    | b              |
|----------------------|----------------|
| true                 | 47             |
| false                | 53             |
```

## rnd_float
- **rnd_float()**: returns a random **positive** floating point number between 0 and 1.
- **rnd_float(nanRate)**: may return NaN (null) at a frequency defined by `nanRate`.

`nanRate` defines the frequency of occurrence of `null` values:
- `0`: No `NaN` will be returned.                                 
- `1`: Will only return `NaN`.                                       
- `N > 1`: On average, one in N generated integer will be NaN.

Example:
```sql
-- Query:
SELECT rnd_float() FROM long_sequence(5);
SELECT rnd_float(2) FROM long_sequence(6);

-- Result:
0.3821478, 0.5162148, 0.22929084, 0.03736937, 0.39675003
0.08108246, 0.7082644, null, 0.6784522, null, 0.5711276
```


## rnd_double
- **rnd_double()**: returns a random number between 0 and 1.
- **rnd_double(nanRate)**: may return NaN (null) at a frequency defined by `nanRate`.

`nanRate` defines the frequency of occurrence of `null` values:
- `0`: No `NaN` will be returned.                                 
- `1`: Will only return `NaN`.                                       
- `N > 1`: On average, one in N generated integer will be NaN.

Example:
```sql
-- Query:
SELECT rnd_double() FROM long_sequence(5);
SELECT rnd_double(2) FROM long_sequence(5);

-- Result:
0.99115364871, 0.31011470271, 0.10776479191, 0.53938281731, 0.89820403511
0.99115364871, null, null, 0.53938281731, 0.89820403511
```

## rnd_char
`rnd_char()` returns a random uppercase character from the 26-letter A to Z alphabet.

Example:
```sql
-- Query:
SELECT rnd_char() FROM long_sequence(5);

-- Result:
G, P, E, W, K
```

## rnd_symbol, rnd_string
`rnd_symbol` and `rnd_string` return a random symbol and string respectively. There are two variants

- **Static list**: returns symbols or strings within a specific list defined by the user.
- **Random list**: returns random symbols within the parameters defined by the user.

Syntax:
- Static list

`rnd_symbol('symbol1', 'symbol2', ...'symbolN')` 

`rnd_string('string1', 'string2', ...'stringN')` 

- Random list

`rnd_symbol(count, minLength, maxLength, nanRate)`

`rnd_string(count, minLength, maxLength, nanRate)`

Where:
- `count` is the number of different symbols/strings that will be generated
- `minLength` is the minimum number of characters for each symbol/string
- `maxLength` is the maximum number of characters for each symbol/string
- `nanRate` defines the frequency of occurrence of `null` values:
    - `0`: No `NaN` will be returned.                                 
    - `1`: Will only return `NaN`.                                       
    - `N > 1`: On average, one in N generated integer will be NaN.

Example:
```sql
-- STATIC LIST
---------------------------------------------------------------------
-- Query:
SELECT rnd_symbol('ABC','def', '123') FROM long_sequence(5);
SELECT rnd_string('ABC','def', '123') FROM long_sequence(5);

-- Result:
'ABC', '123', 'def', '123', 'ABC'
---------------------------------------------------------------------

-- RANDOM LIST
---------------------------------------------------------------------
-- Query:
SELECT rnd_symbol(2, 3, 4, 0) FROM long_sequence(5);
SELECT rnd_string(3, 2, 2, 4) FROM long_sequence(8);

-- Result:
'ABC', 'DEFG', 'ABC', 'DEFG', 'DEFG'
'AB', 'CD', null, 'EF', 'CD', 'EF', null, 'AB'
------------------------------------------------------------------------
```

## rnd_timestamp(), rnd_date()
`rnd_timestamp` and `rnd_date` return a timestamp and a date chosen at random between two specified boundaries.

Syntax:

`rnd_timestamp(start, end, nanRate)`

Where:
- `start` is a the lowest possible generated timestamp/date
- `end` is the highest possible generated timestamp/date
- `nanRate` defines the frequency of occurrence of `null` values:
    - `0`: No `NaN` will be returned.                                 
    - `1`: Will only return `NaN`.                                       
    - `N > 1`: On average, one in N generated integer will be NaN.
    
Examples:
```sql
-- Query:
SELECT rnd_timestamp(to_timestamp('2015', 'yyyy'), to_timestamp('2016', 'yyyy'), 0) FROM long_sequence(5);
SELECT rnd_date(to_date('2015', 'yyyy'), to_date('2016', 'yyyy'), 0) FROM long_sequence(5);

-- Result:
2015-01-29T18:00:17.402762Z, 2015-11-15T20:22:14.112744Z, 
2015-12-08T09:26:04.483039Z, 2015-05-28T02:22:47.022680Z, 
2015-10-13T19:16:37.034203Z

-- Query:
SELECT rnd_timestamp() from long_sequence(5);
SELECT rnd_date() from long_sequence(5);

-- Result:
1970-01-01T02:02:25.319Z, 1970-01-01T00:17:15.585Z,
1970-01-01T01:05:07.643Z, 1970-01-01T01:53:05.468Z, 
1970-01-01T01:27:40.712Z
```

> The timestamps generated above are in random order. If the table where you are generating has a designated timestamp
> (see **[CREATE section](sqlCREATE.md)**) then you need the timestamps to be in ascending order. For this, we suggest 
>you use `timestamp_sequence()`.


## timestamp_sequence

`timestamp_sequence` is used to generate a set of increasing timestamps. 

Syntax:
 
`timestamp_sequence(start, increment)`
 
 Where:
 - `start` is the first `timestamp`. Use `to_timestamp` to cast from string.
 - `increment` is a `long` number representing the increment of time between two timestamps expressed in `microseconds`.
 
 > Increment can be made random by leveraging the rnd functions.

> When generating timestamps, the number of timestamps will be defined by `long_sequence()`
