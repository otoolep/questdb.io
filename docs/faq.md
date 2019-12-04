---
id: faq
title: Frequently Asked Questions
sidebar_label: Frequently Asked
---

### What is QuestDB written in?
We are Java. But by no means traditional Java. Our product is fully zero GC and uses off-heap data structures to
guarantee zero jitter performance.

### Why did you choose JAVA instead of C++?
A lot of people think that Java is slower than C or C++. In reality, for a given algorithm, Java and C++ will run equally fast.
There are, however, differences in approaches that underpin the choice of language.

The difference in favour of C++ is that it gives you access to assembly, allowing for further optimisation if your
algorithm requires it. In most cases, however, access to assembly is not required. 

The difference in favour of Java will be the hotspot. It uses statistics to optimise assembly whereas in C, all optimisation will 
be entirely manual and, in the vast majority of cases, the hotspot will optimise better because it is very aggressive.
                       
Performance aside, Java has better tooling, which leads to a faster development process and better tested code. It also makes 
packaging easy since the same binary can be used across platforms whereas C family languages would require individual packages.
Installation is also simplified: unzip and run.

### What are your technical dependencies?
None apart from Java of course. We use Java only for the JVM and the JIT. However, we do not use any of the standard java libraries.

### What is on the roadmap?
See our [roadmap](faqROADMAP.md)

### Is QuestDB ACID compliant
QuestDB is ACID compliant to write in a single table. We don't support ACID on multi-table transactions yet.
Contrary to other databases, our transaction size is neither limited by the software nor by the available RAM.
Our transaction size is limited by disk size only.

### Do you run on ARM processors, Raspberry Pi etc?
Yes. Tutorial coming soon.
