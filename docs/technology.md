---
id: technology
title: Technology
---



## Overview
QuestDB is a bottom-up high performance technology stack. Each component challenges convention and is designed to be
faster than any equivalent component out there.

Find more about our **database**, **messaging service** and **trading libraries** below.

### Statistics
- Code Size: 1.5mb
- Write/second/thread: 90m+
- Read/second/thread: 230m+

## Database
### Java & Libraries
QuestDB is programmed in JAVA. However, this is no traditional JAVA. Java is only used for its VM and JIT. 
But none of the java standard libraries are being used. In addition, our code is fully
zero-GC allowing for constant predictable performance.

All the IO, including disk and network, is abstracted away in a thin JNI layer to make the underlying OS functions available to java.
Libraries such as collections, eg lists and maps are rewritten to support primitive types and lend themselves to work cohesively with CPU caches
Conversion routines, such as numeric to string and vice versa are rewritten to perform better than standard libraries algorithmically 
and not create nor require the creation of intermediate objects.

### Timestamp & Dates
QuestDB incorporates a brand new and unique date library that supports all date related arithmetic on both millisecond- and microsecond resolution timestamps. 
Date to string and string to date conversion routines are compiled bytecode. Eg you date format gets compiled into format specific bytecode. 
Net result is that this conversion is 100x faster than widely popular JodaTime.

### Queues
There are are high performance queues unique in their ability to provide back-pressure feedback. 
These queues are used to create tcp servers that have flow control.

### Storage
Storage itself is column based. Each column is a virtualised memory mapped file. In that column is a sequence of large 
memory pages stitched together by an interface that makes it look like one contiguous memory chunk. Storage is optimised 
also optimised for CPU cache efficiency.

### SQL
The SQL system is a sort of functional language where single execution plan is a chain on monads with each having as little 
state as possible. Data is lifted directly from memory pages and passed out with no- or as little copying as possible. 
Sometimes not copying is not possible when you hash or sort a data set.

To reduce ops and steps sql has optimiser that effectively rewrites query to remove unnecessary steps and inefficiencies 
human would make. In particular it rewrites join clauses and where clauses to trim as much data at the start of pipeline as possible. 

### Zero GC & Off heap data structures
All of data structures touched by data from database live outside of java heap. The whole system is without exaduration totally zero GC.

### Heavy usage
QuestDB is able to ingest or send amounts of data limited only by disk space. It has an asymmetrical 
ratio of active users to server threads. It is able to send or receive data to/from client that’s available 
and switch over to from idle to active client instantly. 


## Messaging service

## Trading libraries