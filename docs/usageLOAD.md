---
id: howtoload
title: Loading data
sidebar_label: Loading data
---

The following methods are available to load data into QuestDB.

## Using the web console
The web console can be used to insert data into QuestDB. You can use either of the following methods.

### Drag and drop
Simply drag and drop your file into the console. Detailed steps **[here](usageINTERFACE.md#drag-and-drop)**.

### Copy & paste
Copy and paste data from a file to QuestDB through the clipboard. Detailed steps **[here](usageINTERFACE.md#import-from-clipboard)**.

### COPY statement
Copy data using the SQL statement `COPY`. More on this command **[here](sqlCOPY.md)**.

### INSERT statement
Use the `INSERT` statement with the web console SQL to insert data. More on this command **[here](sqlINSERT.md)**.

### CREATE TABLE AS statement
`CREATE TABLE AS` is used to create a table by copying part of all of the contents from another table.
Find more about this command **[here](sqlCREATE.md#create-table-as)**.

## Using JAVA

### Compiling SQL in JAVA
Users can use the `SqlCompiler` in java and pass it SQL statements to execute. This can be used to write data using
[COPY](sqlCOPY.md) or [INSERT](sqlINSERT.md) or any other statement. Detailed steps can be found **[here](usageINTERFACE.md#compiling-sql-in-java)**.


### Writing programmatically in JAVA
Users can use the `TableWriter` in java to write data directly to a table without using the `SqlCompiler`. This is the
most efficient approach as it bypasses the `SqlCompiler`. Detailed steps can be found **[here](usageINTERFACE.md#writing-data-programatically)**.

## Using the REST API

### Loading from file
The `/imp` command is used to import data from a file. Detailed steps can be found **[here](usageINTERFACE.md#imp-loading-data)**.

### Inserting data
The `/imp` command can be used to import data. The data will be passed over HTTP as a multipart request. 
Detailed steps can be found **[here](usageINTERFACE.md#imp-append-data)**.

## Using Influx line protocol
Users that wish to do so can load data with Influx Line Protocol. This is available using
**[java](usageINTERFACE.md#java)**, Linux command line, and Telegraf.