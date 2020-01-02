---
id: functions
title: Functions
sidebar_label: Functions
---

This section gives an overview of the functions available in QuestDB's web console.

## Aggregation

#### Example table

All examples in this section refer to an hypothetical `transactions` table. This table looks like this:
      
```shell script
| ID         |  symbol     | quantity    | price    |
|------------|-------------|-------------|----------|
| 1          |  AAPL       | 203         | 103.2    |
| 2          |  AMZN       | 122         | 253.3    |
| 3          |  GOOG       | 23          | 1024.3   |
| 4          |  AMZN       | 41          | 253.5    |
| 5          |  AMZN       | 144         | 254.9    |
| 6          |  AAPL       | 512         | 103.4    |
```

### sum()
`sum` is used to add values together.

Example:
```sql
-- this will return the 
SELECT item, sum(quantity) FROM transactions;
```

> Note that in the above example, GROUP BY is not necessary and therefore is omitted

### count()
`count` is used to return the number of rows in a given column or subsection of it.

Example:
```sql
-- this will return the total number of items in the transactions table
SELECT count() FROM transactions;

-- this will return the list of items in the transactions table and the number of transactions for each symbol
SELECT symbol, count() FROM transactions;
```

> Note that in the above example, GROUP BY is not necessary and therefore is omitted

### avg()
`avg` returns the average value for the target column within the data selected.

Example:
```sql
-- this will return the average transaction quantity per instrument
SELECT symbol, avg(quantity) FROM transactions;
```

> Note that in the above example, GROUP BY is not necessary and therefore is omitted

## Scalar functions

### min()
`min` returns the lowest value for the target column within the data selected.

Example:
```sql
-- this will return the lowest traded price for each instrument
SELECT symbol, min(price) FROM transactions;
```

> Note that in the above example, GROUP BY is not necessary and therefore is omitted

### max()
`max` returns the highest value for the target column within the data selected.

Example:
```sql
-- this will return the highest traded price for each instrument
SELECT symbol, max(price) FROM transactions;
```

> Note that in the above example, GROUP BY is not necessary and therefore is omitted

### round()
`round` returns the **closest** value with the specified precision.

Syntax:

`round(column_name, precision)`

where:
- `column_name` is the name of the column where you would like to round values
- `precision` is the number of digits of precision after the floating point. 

Example:
```sql
-- Query
SELECT
    value val, 
    round(value,0) round_0,
    round(value,1) round_1,
    round(value,2) round_2,
FROM values;

-- Results (example)
| val            | round_0  | round_1   | round_2    |
|----------------|----------|-----------|------------|
| 0.8077250783   | 1        | 0.8       | 0.81       |
| 0.2612088981   | 0        | 0.3       | 0.26       |
| 0.2394428859   | 0        | 0.2       | 0.24       |      
```

### abs()
`abs` return the absolute value 

Example:
```sql
-- Query:
SELECT x - 2 a, abs(x -2) FROM long_sequence(3);

-- Result:
| a         | abs      |
|-----------|----------|
| -1        | 1        |
| 0         | 0        |
| 1         | 1        |
```

## Type transformation

### to_str()
Converts a `date` or `timestamp` into a string.

Syntax: 

`to_str(inputValue, outputFormat)`

where:
- `inputValue` is either a `date` or `timestamp`
- `outputFormat` is the desired output string format e.g  `yyyy-mm-dd`

Example:
```sql
-- Query
SELECT to_str(rnd_date(), 'yyyy-MM') FROM long_sequence(1);

-- Results (example)
'1970-01'
```

### to_timestamp(), to_date()
Convert a `string` into a `timestamp` or a `date` respectively

Syntax:

`to_tiestamp(inputText, inputFormat)`
`to_date(inputText, inputFormat)`

where
- `inputText` is the input date formatted as text.
- `inputFormat` is the description of the input structure (e.g 'yyyy-MM'ddTHH:mm:ss')

Example: let's assume you receive a timestamp as text and want to insert it into a timestamp field. 
```sql
-- Query:
INSERT INTO measurements values(to_timestamp('2019-12-12T12:15', 'yyyy-MM-ddTHH:mm'), 123.5);

-- Result:
timestamp                       value 
2019-12-12T12:15:00.000000Z     123.5
```

> The above example works with `date` type by replacing `to_timestamp` with `to_date`.

## Random functions

### Overview 
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

### rnd_int()
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

### rnd_short()
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

### rnd_long()
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

### rnd_boolean()
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

### rnd_float()
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


### rnd_double()
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

### rnd_char()
`rnd_char()` returns a random uppercase character from the 26-letter A to Z alphabet.

Example:
```sql
-- Query:
SELECT rnd_char() FROM long_sequence(5);

-- Result:
G, P, E, W, K
```

### rnd_symbol(), rnd_string()
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

### rnd_timestamp(), rnd_date()
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


## Sequences

Sequences are used to generate test datasets with incrementing values. For example a set of increasing timestamps
or long integers. The growth can either be monotonic or randomizes by leveraging the suite of `rnd` functions.

### long_sequence()

`long_sequence` is used to:
- generate column x:long of monotonically increasing long integers starting from 0
- set a number of rows when generating a test dataset

> do not be afraid to generate very large datasets for your testing e.g 1bln rows or more if your disk allows.

Syntax:

`long_sequence(iterations)` 

Where:
- `iterations` is the number of values to generate.

```sql
-- Query:
long_sequence(10);

-- Result:
1, 2, 3, 4, 5, 6, 7, 8, 9, 10
```

#### Accessing numbers

> numbers generated by long_sequence can be accessed using column `x`

```sql
-- Query:
SELECT x, x*x FROM long_sequence(5);

-- Result:
| x       | x*x     |
|---------|---------|
| 1       | 1       |
| 2       | 4       |
| 3       | 9       |
| 4       | 16      |
| 5       | 25      |
```

#### Generating rows

> generating a 5-row dataset

```sql
-- Query:
SELECT x, rnd_double() FROM long_sequence(5);

-- Result:
| x         | rnd_double        |
|-----------|-------------------|
| 1         | 0.3279246687      |
| 2         | 0.8341038236      |
| 3         | 0.1023834675      |
| 4         | 0.9130602021      |
| 5         | 0.718276777       |
```

### timestamp_sequence()

`timestamp_sequence` is used to generate a set of increasing timestamps. 

Syntax:
 
`timestamp_sequence(start, increment)`
 
 Where:
 - `start` is the first `timestamp`. Use `to_timestamp` to cast from string.
 - `increment` is a `long` number representing the increment of time between two timestamps expressed in `microseconds`.
 
 > Increment can be made random by leveraging the rnd functions.

> When generating timestamps, the number of timestamps will be defined by `long_sequence()`

#### Monotonic increase
```sql
-- Query:
SELECT x, timestamp_sequence
            (
            to_timestamp('2019-10-17T00:00:00', 'yyyy-MM-ddTHH:mm:ss'), 
            100000L
            ) 
FROM long_sequence(5);

-- Result:
| x         | timestamp_sequence                |
|-----------|-----------------------------------|
| 1         | 2019-10-17T00:00:00.000000Z       |
| 2         | 2019-10-17T00:00:00.100000Z       |
| 3         | 2019-10-17T00:00:00.200000Z       |
| 4         | 2019-10-17T00:00:00.300000Z       |
| 5         | 2019-10-17T00:00:00.400000Z       |
```
 
#### Random increase:
```sql
-- Query:
SELECT x, timestamp_sequence
            (
            to_timestamp('2019-10-17T00:00:00', 'yyyy-MM-ddTHH:mm:ss'), 
            rnd_short(1,5) * 100000L
            ) 
FROM long_sequence(5);

-- Result:
| x         | timestamp_sequence                |
|-----------|-----------------------------------|
| 1         | 2019-10-17T00:00:00.000000Z       |
| 2         | 2019-10-17T00:00:00.100000Z       |
| 3         | 2019-10-17T00:00:00.600000Z       |
| 4         | 2019-10-17T00:00:00.900000Z       |
| 5         | 2019-10-17T00:00:01.300000Z       |
```

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
    ' price=', abs(to_int(rnd_double(0)*100000)),
    ',quantity=', abs(to_int(rnd_double(0)*10000)),
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

### systimestamp()

Returns the timestamp of the host system with `microsecond` precision.

Example:
```sql
-- Query:
INSERT INTO readings values(systimestmap(), 123.5);

-- Result:
| ts                            | reading       |
|-------------------------------|---------------|
| 2020-01-02T19:28:48.727516Z   | 123.5         |
```

### sysdate()

Returns the timestamp of the host system as a `date` with `millisecond` precision.

```sql
-- Query:
INSERT INTO readings values(systimestmap(), 123.5);

-- Result:
| ts                         | reading       |
|----------------------------|---------------|
| 2020-01-02T19:28:48.727Z   | 123.5         |
```