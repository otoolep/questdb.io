---
id: functionsDateAndTime
title: Date and Time
sidebar_label: Date and Time
---

## systimestamp
`systimestamp()` - offset from UTC Epoch in microseconds

#### Arguments
- `systimestamp()` does not require arguments.

#### Description

Calculates `UTC timestamp` using system's real time clock. The value is affected by discontinuous
 jumps in the system time (e.g., if the system administrator manually changes the system time).
 
#### Return value
Return value type is `timestamp`.

#### Examples:
- Insert current system timestamp along with a value:

```sql
INSERT INTO readings VALUES(systimestamp(), 123.5);
```

```
| ts                            | reading       |
|-------------------------------|---------------|
| 2020-01-02T19:28:48.727516Z   | 123.5         |
```

- Perform queries based on current system timestamp, for example last 60 seconds:
```sql
SELECT * FROM readings WHERE date_time > systimestamp() - 60000000L;
```





## sysdate
`sysdate()` - returns the timestamp of the host system as a `date` with `millisecond` precision.

#### Arguments
- `sysdate()` does not require arguments.

#### Description

Calculates `UTC date` with millisecond precision using system's real time clock. The value is affected by discontinuous
jumps in the system time (e.g., if the system administrator manually changes the system time).
 
#### Return value
Return value type is `date`.

#### Examples:
- Insert current system date along with a value:
```sql
INSERT INTO readings VALUES(sysdate(), 123.5);
```

```
| sysdate                       | reading       |
|-------------------------------|---------------|
| 2020-01-02T19:28:48.727516Z   | 123.5         |
```

- Perform queries based on current system date, for example last 60 seconds:
```sql
SELECT * FROM readings WHERE date_time > sysdate() - 60000000L;
```


## to_str
`to_str(value, format)` - converts date or timestamp value to a string in the specified format

#### Arguments
- `value` is any `date` or `timestamp`
- `format` is a timestamp format. 

#### Description
Will convert a date or timestamp value to a string using the format definition passed as a parameter. When
elements in the `format` definition are unrecognized, they will be passed-through as string.

For more information about recognized timestamp formats, 
see the **[date and timestamp format section](#date-and-timestamp-format)**.

#### Return value
Return value type is `string`

#### Examples
- Basic example
```sql
SELECT to_str(systimestamp(), 'yyyy-MM-dd') FROM long_sequence(1);
```

```
| to_str                    |
|---------------------------|
| 2020-03-04                |
```

- With unrecognized timestamp definition
```sql
SELECT to_str(systimestamp(), 'yyyy-MM-dd gooD DAY 123') FROM long_sequence(1);
```

```
| to_str                    |
|---------------------------|
| 2020-03-04 gooD DAY 123   |
```



## to_timestamp
`to_timestamp(string, format)` - converts string to `timestamp` by using the supplied `format` to extract the value.

#### Arguments
- `string` is any string that represents a date and/or time.
- `format` is a string that describes the `timestamp format` in which `string` is expressed.

#### Description
Will convert a `string` to `timestamp` using the format definition passed as a parameter. When the `format` definition 
does not match the `string` input, the result will be `null`.

For more information about recognized timestamp formats, 
see the **[date and timestamp format section](#date-and-timestamp-format)**.

#### Return Value
Return value type is `timestamp`

#### Examples
- `string` and `format` match:
```sql
SELECT to_timestamp('2020-03-01:15:43:21', 'yyyy-MM-dd:HH:mm:ss') FROM long_sequence(1);
```
```
| to_timestamp                  |
|-------------------------------|
| 2020-03-01T15:43:21.000000Z   |
```

- `string` and `format` do NOT match:
```sql
SELECT to_timestamp('2020-03-01:15:43:21', 'yyyy') FROM long_sequence(1);
```
```
| to_timestamp                  |
|-------------------------------|
| null                          |
```

- using with `INSERT`
```sql
INSERT INTO measurements values(to_timestamp('2019-12-12T12:15', 'yyyy-MM-ddTHH:mm'), 123.5);
```

```
| timestamp                        | value    |
|----------------------------------|----------|
| 2019-12-12T12:15:00.000000Z      | 123.5    |
```



## to_date
`to_date(string, format)` - converts string to `date` by using the supplied `format` to extract the value.

#### Arguments
- `string` is any string that represents a date and/or time.
- `format` is a string that describes the `date format` in which `string` is expressed.

#### Description
Will convert a `string` to `date` using the format definition passed as a parameter. When the `format` definition 
does not match the `string` input, the result will be `null`.

For more information about recognized timestamp formats, 
see the **[date and timestamp format section](#date-and-timestamp-format)**.

#### Return Value
Return value type is `date`

#### Examples
- `string` and `format` match:
```sql
SELECT to_date('2020-03-01:15:43:21', 'yyyy-MM-dd:HH:mm:ss') FROM long_sequence(1);
```
```
| to_date                       |
|-------------------------------|
| 2020-03-01T15:43:21.000Z      |
```

- `string` and `format` do NOT match:
```sql
SELECT to_date('2020-03-01:15:43:21', 'yyyy') FROM long_sequence(1);
```
```
| to_date                       |
|-------------------------------|
| null                          |
```

- using with `INSERT`
```sql
INSERT INTO measurements values(to_date('2019-12-12T12:15', 'yyyy-MM-ddTHH:mm'), 123.5);
```

```
| date                             | value    |
|----------------------------------|----------|
| 2019-12-12T12:15:00.000Z         | 123.5    |
```



## hour
`hour(value)` - hour of timestamp or date, on 0-23 scale

#### Parameters
- `value` is any `timestamp` or `date`

#### Description
`hour(value)` returns the `hour` of a given date or timestamp from 0 to 23

#### Return Value
Return value type is `int`

#### Examples
- Extracting hour from a timestamp
```sql
SELECT hour(to_timestamp('2020-03-01:15:43:21', 'yyyy-MM-dd:HH:mm:ss')) FROM long_sequence(1);
```

```
| hour        |
|-------------|
| 12          |
```

- Using as part of an aggregation
```sql
select hour(ts), count() from transactions;
```

```
| hour        | count    |
|-------------|----------|
| 0           | 2323     |
| 1           | 6548     |
| ...         | ...      |
| 22          | 9876     |
| 23          | 2567     |
```

## Date and Timestamp format
Format is a combination of letters from table below combined with arbitrary text. 
Format letters are case-sensitive and are used as is (e.g. without any prefix)

|Letter	|Date or Time Component     |Presentation	    |Examples   |
|-------|---------------------------|-------------------|-----------|
|G	    |Era designator	            |Text	            |AD         |
|y	    |Year	                    |Year            	|1996; 96   |
|Y	    |Week year  	            |Year	            |2009; 09   |
|M    	|Month in year	            |Month	            |July; Jul; 07|
|w	    |Week in year	            |Number	            |27         |
|W    	|Week in month	            |Number	            |2          |
|D    	|Day in year	            |Number         	|189         |
|d    	|Day in month	            |Number         	|10|
|F    	|Day of week in month	    |Number         	|2|
|E    	|Day name in week	        |Text           	|Tuesday; Tue|
|u	    |Day number of week (1 = Monday, ..., 7 = Sunday)	|Number	|1|
|a	    |Am/pm marker	            |Text	            |PM|
|H	    |Hour in day (0-23)	        |Number         	|0|
|k	    |Hour in day (1-24)	        |Number         	|24|
|K	    |Hour in am/pm (0-11)	    |Number	            |0|
|h	    |Hour in am/pm (1-12)	    |Number           	|12|
|m    	|Minute in hour	            |Number     	    |30|
|s	    |Second in minute	        |Number         	|55|
|S	    |Millisecond	            |Number         	|978|
|z    	|Time zone	                |General time zone	|Pacific Standard Time; PST; GMT-08:00|
|Z	    |Time zone	                |RFC 822 time zone	|-0800|
|X	    |Time zone	                |ISO 8601 time zone	|-08; -0800; -08:00|
|U      |Microsecond                |Number             |698|

#### See also
- **[to_timestamp](#to_timestamp)**
- **[to_date](#to_date)**
- **[to_str](#to_str)**

