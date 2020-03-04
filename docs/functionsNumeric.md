---
id: functionsNumeric
title: Numeric
sidebar_label: Numeric
---

## round
`round` returns the **closest** value with the specified `scale`. 

Syntax:

`round(column_name, scale)`

where:
- `column_name` is the name of the column where you would like to round values
- `scale` is 
    - when `positive`: the number of decimals **after** the floating point. 
    - when `negative` then number of rounded digits **before** the floating point. 

Example:
```sql
-- Query
SELECT d, round(d, -2), round(d, -1), round(d,0), round(d,1), round(d,2) FROM dbl;

-- Results (example)

| d	             | round-2	| round-1	| round0	| round1	| round2     |
|----------------|----------|-----------|-----------|-----------|------------|
| -0.811905406   | 0	    | 0	        | -1	    | -0.8	    | -0.81      |
| -5.002768547   | 0	    | -10	    | -5	    | -5	    | -5         |
| -64.75487334   | -100	    | -60	    | -65	    | -64.8	    | -64.75     |
| -926.531695    | -900	    | -930	    | -927	    | -926.5	| -926.53    |
| 0.069361448    | 0	    | 0	        | 0	        | 0.1	    | 0.07       |
| 4.003627053    | 0	    | 0	        | 4	        | 4	        | 4          |
| 86.91359825    | 100	    | 90	    | 87	    | 86.9	    | 86.91      |
| 376.3807766    | 400	    | 380	    | 376	    | 376.4	    | 376.38     |

```

## round_down
`round_down` behaves like `round` but instead of rounding to the closest value of the required scale, 
will systematically round values down.

## round_up
`round_up` behaves like `round` but instead of rounding to the closest value of the required scale, 
will systematically round values up.

## round_half_even

todo

## abs
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
