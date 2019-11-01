---
id: documentation
title: Overview
sidebar_label: Overview
---

## Introduction
QuestDB is a relational column-oriented database particularly optimised for time-series that uses SQL. 
We are free from third-party dependencies and built for performance and scalability. 
QuestDB will automatically use your hardware to its maximum and run fast on high-end servers and minimal portable edge devices alike.

## Why did we build QuestDB
There are many innovative databases out there. However, most of the innovations have been 
geared towards the hardware rather than the software itself. While tremendous progress has been made on parallelisation, 
software core efficiency has been left aside.

Our dev team consists of low-latency developers who
worked in HFT, and our approach is different: rather than immediately focusing on scaling out and parallelising tasks, 
we put over 5 years on R&D on single-thread performance. We achieve maximum efficiency for a given unit of hardware, 
with performance on a single thread multiples times faster than multi-threaded databases.

## Who can use QuestDB
QuestDB can cover most of database needs, however it is mostly suited for users that
- store large datasets, particularly time-series, looking to reduce disk space
- undertake heavy data processing and looking to reduce computation bills
- want to use hardware to the maximum rather than upgrade or purchase more

## Explore
 Get Started:
- Learn about our **[storage model](storagemodel.md)** 
- Download & **[Install](install.md)** QuestDB
- Open the web **[console](console.md)** in your browser
- Use your own data or get download **[test data](gettestdata.md)**
- **[drag'n'drop](console.md)** your data files into browser windows
- Explore data via **[SQL queries](console.md)**
















