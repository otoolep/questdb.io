---
id: faq
title: Frequently Asked Questions
sidebar_label: Frequently Asked
---

### What is QuestDB?
QuestDB is a relational database optimised for time-series.

### What is QuestDB written in?
We are JAVA. But by no means traditional JAVA. Our product is fully zero GC and uses off-heap data structures to
guarantee zero jitter performance.

### Why did you choose JAVA instead of C++?
A lot of people think that JAVA is slower than C or C++. In reality, for a given algorithm, JAVA and C++ will run equally fast.
There are, however, differences in approaches that underpin the choice of language.

The difference in favour of C++ is that it gives you access to Assembly, allowing for further optimisation if your
algorithm requires it. In most cases, however, access to assembly is not required. 

The difference in favour of JAVA will be the hotspot. It uses stats to optimise assembly whereas in C, all optimisation will 
be entirely manual and. In the vast majority of cases, the hotspot will optimise better because it is very aggressive.
                       
Performance aside, java has better tooling, which leads to faster dev process and better tested code. It also makes 
packaging easy since the same binary can be used across platforms whereas C languages would require individual packages.
Installation is also simplified: unzip and run.

### What are your technical dependencies?
None apart from JAVA of course. We use JAVA only for the JVM and the JIT. However, we do not use any of the standard java libraries.

### What is on the roadmap?
While we are extremely fast in raw read/write, further optimisation is possible, for example for aggregation. We will
implement stats() to leverage aggregations on partitioned data which will enable significant performance gains in aggregations.

Also on the roadmap are high-availability features. Now that we achieved near-maximum single-thread performance, we will also start 
 work on multithreading & parallelisation.

### Is QuestDB ACID compliant
QuestDB is ACID compliant to write in a single table. We don't support ACID on multi-table transactions yet.
Contrary to other databases, our transaction size is neither limited by the software nor by the available RAM.
Our transaction size is limited by disk size only.

### Do you run on ARM processors, Raspberry Pi etc?
Yes. Tutorial coming soon.