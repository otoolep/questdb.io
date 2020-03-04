---
id: functionsDateAndTime
title: Date and Time
sidebar_label: Date and Time
---

## systimestamp

systimestamp() - offset from UTC Epoch in microseconds

#### Description

Calculates UTC `timestamp` using system's real time clock. The value is affected by discontinuous
 jumps in the system time (e.g., if the system administrator manually changes the system time) 

Example:
```sql
INSERT INTO readings values(systimestamp(), 123.5);
```

Result might be
```
| ts                            | reading       |
|-------------------------------|---------------|
| 2020-01-02T19:28:48.727516Z   | 123.5         |
```

## sysdate

Returns the timestamp of the host system as a `date` with `millisecond` precision.

```sql
INSERT INTO readings values(systimestmap(), 123.5);
```
Result might be
```
-- Result:
| ts                         | reading       |
|----------------------------|---------------|
| 2020-01-02T19:28:48.727Z   | 123.5         |
```

## to_str

to_str(value, format) - converts date or timestamp value to string

#### Description

describe argument types, return value and format values. Also describe what happens when format is invalid

## to_timestamp

to_timestamp(string, format) - converts string to `timestamp` given format string

#### Description

describe argument types, return value and format values. Also describe what happens if string does not match format

## to_date

to_date(string, format) - converts string to `date` given format string

#### Description

describe argument types, return value and format values. Also describe what happens if string does not match format

## hour

hour(timestamp) - hour of timestamp, on 0-23 scale

#### Description

todo

## Date and Timestamp format

Format is a combination of letters from table below combined with arbitrary text. Format letters are case-sensitive and are used as is (e.g. without any prefix)

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

#### Example

Let us assume you receive a timestamp as text and want to insert it into a timestamp field.
 
```sql
INSERT INTO measurements values(to_timestamp('2019-12-12T12:15', 'yyyy-MM-ddTHH:mm'), 123.5);
INSERT INTO measurements values(to_timestamp('12/12/2019 12:15:03 PM', 'MM/dd/yyyy HH:mm:ss a'), 124.5);
```

Result would be

```
| timestamp                        | value    |
|----------------------------------|----------|
| 2019-12-12T12:15:00.000000Z      | 123.5    |
| 2019-12-12T12:15:03.000000Z      | 124.5    |
```
