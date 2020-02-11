---
id: copy
title: COPY
sidebar_label: COPY
---
 
 ### Syntax
 
![alt-text](assets/copy.svg)

### Description

Copies data from a delimited text file into a table. Column delimiter detection is automatic.

When target table exists data is appended if file structure matches the table. 

When target table does not exist it is created using metadata derived from the file data.  

File can either be on local disk to the server or a remote disk, on a remote file system. In either case QuestDB will treat the
file name as relative to the value of ``cairo.sql.copy.root`` configuration property. This is a security feature to disallow random file access via QuestDB.

### Example

```sql
COPY trades20191223 FROM 'C:\archive\trades\20191223.csv';
```

