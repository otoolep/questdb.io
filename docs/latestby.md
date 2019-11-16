---
id: crud
title: CRUD Functions
sidebar_label: CRUD Functions
---

## Overview
`LASTEST BY` allows QuestDB developers implement CRUD operations over immutable data store. In this document we will describe each of CRUD operations and how to implement it using `LATEST BY`.

### (C)reate

Create operation in QuestDB appends record to bottom of table. If table is partitioned timestamp value determines partition the record is appended to. Only last partition can be appended to and attempt to add timestamp in middle of
table will result in error. When table is not partitioned, records can be added in any timestamp order and table will have only one partition.

Lets create table that holds bank balances for customers.

```sql
create table balances (
	cust_id int, 
	balance_ccy symbol, 
	balance double, 
	status byte, 
	timestamp timestamp
);
```

```text
curl -G "http://localhost:13005/exec" --data-urlencode "query=
create table balances (
    cust_id int,
    balance_ccy symbol,
    balance double,
    status byte,
    timestamp timestamp
)"
```

Here:
 - `cust_id` is the customer identifier. It unuquely identifies customer.
 - `balance_ccy` balance currency. We use `SYMBOL` here to avoid storing text against each record to save space and increase database performance
 - `balance` is the current balance for customer and currency tuple 
 - `timestamp` timestamp in microseconds of the record

Lets insert records:

```sql
insert into balances (cust_id, balance_ccy, balance, timestamp)
	values (1, 'USD', 1500.00, to_timestamp(6000000001));

insert into balances (cust_id, balance_ccy, balance, timestamp)
	values (1, 'EUR', 650.50, to_timestamp(6000000001));

insert into balances (cust_id, balance_ccy, balance, timestamp)
	values (2, 'USD', 900.75, to_timestamp(6000000001));

insert into balances (cust_id, balance_ccy, balance, timestamp)
	values (2, 'EUR', 880.20, to_timestamp(6000000001));
```

 To select these records we can use basic `SELECT`:

```sql
select * from balances;
```

### (U)pdate

Lets update balance of customer `1` in the `balances` table:

```sql
insert into balances (cust_id, balance_ccy, balance, timestamp)
	values (1, 'USD', 660.50, to_timestamp(6000000005));
```

You expected `UPDATE` statement, right? Why `INSERT`? Do we now have duplicate records? That is right. What we have is change history. Our `SELECT` statement will have to change to select only last row for `(1,USD)` tuple:

```sql
select * from balances latest by cust_id, balance_ccy
```

To view balances of selected customers you can run this query:                                                                       

```sql
select * from balances latest by cust_id, balance_ccy where cust_id = 1
```

In above example QuestDB will execute `where` clause *before* `latest by`. To execute `where` _after_ `latest by` we have to rely on sub-queries. This is an example of how to select customers with balances over 800:

```sql
(select * from balances latest by cust_id, balance_ccy) where balance > 800

```

> `latest by` performance note: QuestDB will search time sereies from newest values to oldest. For single `SYMBOL` column in `latest by` clause QuestDB will know all distinct values upront. Time series scan will end as soon as
> all values are matched. For all other field types, or multiple fields QuestDB will scan entire time series. Although scan is very fast you should be aware that performance wil degrade on hundreds of millions of records. 