---
id: technology
title: Technology
---



## Overview
Questdb is a high performance, low latency database, which is optimised for time series. It is essentially a stack of components that can be assembled into products to fulfill a wide array of use cases. Each component challenges convention and is designed to be faster.

Find more about our **database**, **messaging service** and **trading libraries** below.

### Statistics
- Code Size: 1.5mb
- Write/second/thread: 90m+
- Read/second/thread: 230m+

## Database
### Java & Libraries
QuestDB is programmed in Java. However, this is no traditional Java, as none of its standard libraries are being used (Java is only used for its VM and JIT). In addition, our code is fully zero Garbage Collection (‘GC’), which results in constant and predictable performance.

All the IO, including disk and network, is abstracted away in a thin JNI layer to make the underlying OS functions available to Java. 
Libraries such as collections, lists and maps are rewritten to support primitive types. Libraries working cohesively with CPU caches conversion routines, such as numeric to string (and vice versa), have been rewritten to perform better than standard libraries algorithmically. As such, the creation of intermediate objects is not required.

### Timestamp & Dates
QuestDB incorporates a brand new and unique date library that supports all date related arithmetic for both millisecond and microsecond resolution timestamps. Date to string and string to date conversion routines are compiled bytecode. Date format is compiled into format specific bytecode. 
This conversion is 100x faster than widely popular JodaTime.

### Queues
QuestDB includes high performance queues, which can provide back-pressure feedback. These queues are used to create tcp servers that have flow control.

### Storage
Storage is column based. Each column is a virtualized memory mapped file. Inside each column we find a sequence of large memory pages stitched together via an interface that makes it look like one contiguous memory chunk. Storage is also optimised for CPU cache efficiency.

### SQL
The SQL system is a functional language in which a single execution plan is a chain on monads, each having as little state as possible. The data is lifted directly from memory pages and passed out with no or as little copying as possible. Avoiding copying the data may not be possible when data sets are hashed or sorted. 

SQL includes an optimiser, which effectively rewrites queries to remove unnecessary steps and inefficiencies human would make otherwise. In particular, join and clauses, which are rewritten to trim as much data as possible from the start of the pipeline. 
This allows to lift and manipulate the least possible amount of data to ensure maximum query performance and minimum resource usage.

### Zero GC & Off heap data structures
We can access native memory instead of heap memory (memory that is managed by the JVM to represent Java objects), and as such manage memory ourselves instead of letting Java’s JVM manage the process. Moreover QuestDB uses does not allocate any memory along execution paths.

In other words, all the data structures ‘touched’ by the data from the database live outside Java’s heap. The whole system is without exaduration and thus totally zero GC.


### Heavy usage
QuestDB is able to ingest or send large amounts of data, which is only limited by disk’s space. It has an asymmetrical ratio of active users to server threads. It is able to send or receive data to/from a client that is available and switch over to from an idle to active client instantly.
