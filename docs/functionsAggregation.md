---
id: functionsAggregation
title: Aggregation
sidebar_label: Aggregation
---


## sum

#### Description

Adds values ignoring missing data, e.g. `null` values.

#### Syntax
```sql
sum(argument)
```

Where `argument` is any numeric value.

#### Return value

Return value type is the same as the type of the argument.

#### Examples
- Sum all quantities in the transactions table:
```sql
SELECT sum(quantity) FROM transactions;
```
```
| sum   |
|-------|
| 100   |
```

- Sum all quantities in the transactions table, aggregated by item:
```sql
SELECT item, sum(quantity) FROM transactions;
```

```
| item          | count         |
|---------------|---------------|
| apple         | 53            |
| orange        | 47            |
```

#### Overflow
`sum` does not perform overflow check. To avoid overflow, you can cast the argument to wider type.

For example, with column `a` of type INT, you can use:

```sql
SELECT sum(cast(a as long)) from table
```  






## count

#### Description
`count` counts the number of rows, including rows with `null` values. 

#### Syntax
`count` does not require any argument, and the syntax is simply:
```sql
count()
```

The following alternative syntax is provided for convenience and has the same behaviour:
```sql
count(*)
```

#### Return value
Return value type is `long`.

#### Examples

- Count of items in the transactions table (including `null` values).
```sql
SELECT count() FROM transactions;
```

```
| count     |
|-----------|
| 100       |
```

- Count of items in the transactions table aggregated by payment_type. Note `null` values are aggregated.
```sql
SELECT payment_type, count() FROM transactions;
```

```
| cash_or_card  | count         |
|---------------|---------------|
| cash          | 25            |
| card          | 70            |
| null          | 5             |
```





## avg

#### Description
`avg` returns the simple average of a set of numerical values. 
> `null` values are not ignored and will affect calculations. 

#### Syntax
```sql
avg(argument)
```

Where `argument` is any numeric value.

#### Return value

Return value type is `double`.

#### Examples

- Average transaction amount.
```sql
SELECT avg(amount) FROM transactions;
```

```
| avg       |
|-----------|
| 22.4      |
```

- Average transaction amount aggregated by payment_type.
```sql
SELECT payment_type, avg(amount) FROM transactions;
```

```
| cash_or_card  | avg           |
|---------------|---------------|
| cash          | 22.1          |
| card          | 27.4          |
| null          | 18.02         |
```

#### Null behaviour

`avg` does not ignore `null` values in calculations and treats them as normal numeric values. As a result,
using `avg` on data with `null` values may result in skewed results.

Example dataset: 
```
| values        |
|---------------|
| 1             |
| 2             |
| null          |
```

```sql
SELECT avg(values) from TABLE;
```
```
| avg           |
|---------------|
| -715827881.66 |
```

#### Ignoring null values
If your data contains `null` values, we recommend filtering for null with `WHERE`
```sql
SELECT avg(values) FROM TABLE WHERE NOT x=cast('null' AS int);
```
```
| avg           |
|---------------|
| 1.5           |
```

>This method is suboptimal. For optimal performance, we recommend enforcing a NOT NULL insert policy on numeric
>columns where you expect to perform aggregation calculations.

## min

#### Description
`min` returns the lowest value in the target data ignoring `null` values 

#### Syntax
```sql
min(argument)
```
Where `argument` is any numeric value.

#### Return value
Return value type is the same as the type of the argument.

#### Examples

- Lowest amount in the transactions table.
```sql
SELECT min(amount) FROM transactions;
```

```
| min       |
|-----------|
| 12.5      |
```

- Lowest amount in the transactions table, aggregated by payment_type
```sql
SELECT payment_type, min(amount) FROM transactions;
```

```
| cash_or_card  | min           |
|---------------|---------------|
| cash          | 12.5          |
| card          | 15.3          |
| null          | 22.2          |
```





## max
`max` returns the lowest value in the target data ignoring `null` values 

#### Syntax
```sql
max(argument)
```
Where `argument` is any numeric value.

#### Return value
Return value type is the same as the type of the argument.

#### Examples

- Highest amount in the transactions table.
```sql
SELECT max(amount) FROM transactions;
```

```
| min       |
|-----------|
| 55.3      |
```

- Lowest amount in the transactions table, aggregated by payment_type
```sql
SELECT payment_type, max(amount) FROM transactions;
```

```
| cash_or_card  | amount        |
|---------------|---------------|
| cash          | 31.5          |
| card          | 55.3          |
| null          | 29.2          |
```