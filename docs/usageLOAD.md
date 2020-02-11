---
id: howtoload
title: Loading data
sidebar_label: Loading data
---

The following methods are available to load data into QuestDB.

## Using the web console

The Web Console is an interactive tool to load and query data in QuestDB. The following methods are supported to import data:

- [Drag & Drop](usageINTERFACE.md#drag-and-drop)
- [Copy & Paste](usageINTERFACE.md#import-from-clipboard)
- [COPY SQL](sqlCOPY.md)
- [INSERT SQL](sqlINSERT.md)
- [CREATE .. AS SELECT](sqlCREATE.md#create-table-as)

## Using JAVA

Using JAVA API assumes that you are running QuestDB as embedded database. This method is by far the fastest and most direct.

- [TableWriter API](usageINTERFACE.md#writing-data-programmatically)
- [SQLCompiler API](usageINTERFACE.md#compiling-sql-in-java)

## Using the REST API

REST API provides programmatic access to the same API as used by Web Console. We have [examples](usageINTERFACE.md#imp-loading-data) of accessing QuestDB
REST API via CURL.

## Using Influx line protocol
Users that wish to do so can load data with Influx Line Protocol. This is available using
**[java](usageINTERFACE.md#java)**, Linux command line, and Telegraf.