---
id: guidePSQL
title: How to connect QuestDB to PSQL (aplha)
sidebar_label: Postgres Wire (alpha)
---

This short guide explains how to connect to QuestDB using `psql`.

> Our implementation of the Postgres wire protocol is still in alpha. 
>Some features such as metadata are not yet supported. 

> This guide assumes you have installed QuestDB and have it running.

## How to Install psql

You can check if you already have psql installed with

```shell script
psql --version
```

Here are installation instructions for the major platforms:

#### Homebrew (MacOS)
```shell script
brew install libpq  
brew link --force libpq  
```

#### Ubuntu
```shell script
sudo apt-get install postgresql-client  
```

#### Fedora
```shell script
sudo dnf install postgresql.x86_64  
```

#### Windows 10
Install using the  <a href="https://www.enterprisedb.com/downloads/postgres-postgresql-downloads" target="_blank">Windows Installer</a>.

## How to connect

The following shows how to connect to QuestDB over the Postgres wire protocol using the default configuration.

### Syntax

```shell script
psql -h [host] -p [port] -U [user] -W -d [database]
```

### Connection parameters
|Parameter | Description |
|---|---|
|database|Default database is `qdb`|
|host|Your IP. If running locally, that's `localhost`|
|password|You will be prompted manually. Default is `quest`|
|port |Default is `8812`|
|user |Default is `admin`|

### Establishing a connection

The following will use the default parameters to connect to a QuestDB instance running locally listening on port 8812.
```shell script
psql -h localhost -p 8812 -U admin -W -d qdb
```

This will prompt you for a password. Enter the default password `quest`. 
A successful connection will return the following

```shell script
psql -h localhost -p 8812 -U admin -W -d qdb
Password: 
psql (12.2, server 11.3)
Type "help" for help.

qdb=> 
```




## Using the command prompt

Now that you are connected to QuestDB, you can use the `psql` prompt to run SQL commands.

### Create tables
Let's create a simple table with three columns (timestamp, location and a temperature reading) with a designated timestamp.
```sql
CREATE TABLE temp(
    ts timestamp, 
    location symbol, 
    tempC double) 
timestamp(ts);
```

> Symbol is a special type which allows us to write strings but store them efficiently as an int which 
>makes writes and scans more efficient and reduces the storage requirements. Find out more [here](symbol.md).


### Insert data

Let's simulate a house with 4 temperature sensors to populate our newly created table with 
test data. 

#### Manual insert
We can insert data points manually as follows
```sql
INSERT INTO temp VALUES(
    systimestamp() , 
    rnd_symbol('kitchen', 'bedroom', 'bathroom', 'garage'),
    round(rnd_int(10,15,0) + rnd_double(),1)
    );
```

#### Procedurally generated data
For the purpose of this guide, it is easier to insert from a file or in this case to generate the data.
We can use QuestDB's [row generation functions](functionsRowGenerator.md) and [random generators](functionsRandomValueGenerators.md) 
to quickly create test data. We use `long_sequence()` which generates rows and returns a synthetic column `x` with monotonically increasing
values. As `x` is of type `long`, we use `cast` to convert it to `int`.

The below will add 1 million readings from a location chosen at random approximatively every 30 seconds.
```sql
INSERT INTO temp 
    SELECT 
        dateadd('s', 30 * cast(x as int), systimestamp()) ts,
        rnd_symbol('kitchen', 'bedroom', 'bathroom', 'garage') location,
        round(rnd_int(10,15,0) + rnd_double(),1) tempC
    FROM long_sequence(1000000);
```

### Query data
Now that we have data, we can run a few queries to start leveraging QuestDB's time-series SQL extensions.

#### Weekly average kitchen temperature over time
```sql
SELECT ts, avg(tempC) 
FROM temp 
WHERE location = 'kitchen' 
SAMPLE BY 7d;
```

|             ts             |        avg |         
|---|---|
| 2020-06-04 00:00:00.000000 | 13.2|
| 2020-06-11 00:00:00.000000 | 12.9|
| 2020-06-18 00:00:00.000000 | 13.1|
| 2020-06-25 00:00:00.000000 | 12.8|
| 2020-07-02 00:00:00.000000 | 13.0|

This query uses [SAMPLE BY](sqlSELECT.md#sample-by) to generate weekly time buckets in just 3 words.

#### Last temperature readings
```sql
SELECT * FROM temp
LATEST BY location;
```

|             ts             | location |       tempC        |
|---|---|---
| 2020-11-29 06:46:08.793172 | kitchen  |  11.9|
| 2020-11-29 06:46:23.793172 | bathroom |   10.8|
| 2020-11-29 06:46:38.793172 | bedroom  | 14.5|
| 2020-11-29 06:46:53.793172 | garage   | 14.4|

#### Last reading of december
```sql
SELECT * FROM temp
LATEST BY location 
WHERE ts='2020-12';
```

This query uses [LATEST BY](crudOperations.md) and our [timestamp search](sqlSELECT.md#interval-timestamp).

|             ts             | location |       tempC       |        
|---|---|---|
| 2020-12-31 23:57:25.500585 | garage   | 13.2              |
| 2020-12-31 23:58:55.500586 | kitchen  | 15.1              |
| 2020-12-31 23:59:25.500586 | bedroom  |               11.9|
| 2020-12-31 23:59:55.500586 | bathroom |               14.9|


## What's next
There is plenty to do with QuestDB. As a next step, you could check out our guide to [CRUD operations](crudOperations.md),
how to join time-series with [ASOF JOIN](joins.md#asof-join) or how to [FILL](sqlSELECT.md#fill) missing intervals within a select statement.

Before we leave, let's remember to cleanup and delete all the data
```sql
DROP TABLE temp;
```

We hope you enjoyed this guide. Feel free to join our Slack to ask questions if you would like to further explore 
a particular topic or ask functionality / syntax questions.

