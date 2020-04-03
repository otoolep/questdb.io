---
title: QuestDB 4.2: introducing SIMD aggregations
author: Tancrede Collard
---

Today we release QuestDB 4.2 which brings another set of dramatic performance improvements. The main piece is 
the introduction of aggregations leveraging SIMD instructions and improving performance by about 100x!

### Introducing SIMD instructions
**[SIMD instructions](https://en.wikipedia.org/wiki/SIMD)** are a specific CPU instructions set for arithmetic calculations that uses synthetic  
parallelisation. The parallelisation is synthetic because instead of spreading the work across CPU cores, 
SIMD unlocks vector operations on multiple items using a **single** instruction. 
In practice, if you want to sum 8 numbers, SIMD allows you to do this with one CPU operation instead of 8. 
We get compounded improvements by combining this with actual parallelisation and spreading the aggregation calculation across CPUs.

As of now, this new feature is available on aggregation queries such as
```select sum(value) from table```. In a further release, we will extend these to keyed aggregations, for example
```select key, sum(value) from table``` (note the voluntary omission of `GROUP BY`). This will also make ultrafast 
aggregation available to time-bucketed queries using `SAMPLE BY`.

### Tickling kdb+
To get an idea of how fast it actually is, we ran a benchmark against kdb+, which has been known for being a 
high-performance time-series database for over 20 years. Coincidentally, their **[version 4.0 released a few days ago](https://kx.com/blog/kdb-version-4-0-faster-more-secure/)**
introduces performance improvements through further parallelism. This brand new version is what we compared against.

On non-null doubles, questDB sums 1 billion values in roughly the same time as kdb (ok slightly slower):
![alt-text](assets/sum-not-null.png)

However, if the data includes null numbers, then kdb's performance deteriorates and it takes twice as much time. 
On the other hand, QuestDB's performance remains unchanged when introducing null values:
![alt-text](assets/sum-null.png)

With max on non-null longs, QuestDB also outperforms kdb+ by about 2x:
![alt-text](assets/max-not-null.png)

### We are really happy to share this with you
- These new techniques improved our aggregation performance by a factor of 100x
- Combined with all the performance innovations we have been building into QuestDB over the years, the end result 
matches kdb+ and even beats it by a factor of 2x on most queries! 
- Everything we use to achieve this result is **[open-source](https://github.com/questdb/questdb)**!


### About the release

#### Summary
We have implemented SIMD-based vector execution of queries, such as `select sum(value) from table`.
This is around 100x faster than non-vector based execution. This is just the beginning. We are bringing vectors to more operations.
Try our first implementation in this release and stay tuned for more features in the upcoming releases!

#### Important
Metadata file format has been changed to include a new flag for columns of type symbol. 
It is necessary to convert existing tables to new format. Running the following sql: `repair table myTable`, will update the table metadata.

#### What is new?
- Java: vectorized sum(), avg(), min(), max() for DOUBLE, LONG, INT
- Java: select distinct symbol optimisation
- FreeBSD support
- Automatically restore data consistency and recover from partial data loss.

#### What we fixed
- SQL: NPE when parsing SQL text with malformed table name expression , for example ')', or ', blah'
- SQL: parsing 'fill' clause in sub-query context was causing unexpected syntax error (#115)
- SQL: possible internal error when ordering result of group-by or sample-by
- Data Import: Ignore byte order marks (BOM) in table names created from an imported CSV (#114)
- SQL: 'timestamp' propagation thru group-by code had issues. sum() was tripping over null values. Added last() aggregate function. (#113)
- LOG: make service log names consistent on windows (#106)
- SQL: deal with the following syntax 'select * from select ( select a from ....)'
- SQL: allow the following syntax 'case cast(x as int) when 1 then ...'
- fix(griffin): syntax check for "case"-')' overlap, e.g. "a + (case when .. ) end"