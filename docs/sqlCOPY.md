---
id: sqlcopy
title: COPY
sidebar_label: COPY
---

## Overview

`COPY` is used to load data from a `file` into a `table`. The file can be `.txt` or `.csv`. 

> Using `COPY` via the **[web console](intCONSOLE.md)** is an efficient way to get data in as it bypasses the 
> HTTP protocol that would be used by the **[drag & drop](/docs/console#drag-and-drop)** method. This creates a 
> performance gain of approximately 40%.

## Syntax

```sql
COPY TABLE_NAME FROM file_path
```

Where `TABLE_NAME` is the name of the table where the data should be loaded and `file_path` is the path to the 
file containing the data you want to load.

### Examples

```sql
COPY trades20191223 FROM 'C:\archive\trades\20191223.csv';
```

