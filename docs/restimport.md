---
id: restimport
title: IMPORT
sidebar_label: IMPORT
---

### Overview
Import function `/imp` streams tabular text data directly into a table.
It supports CSV, TAB and Pipe (`|`) delimited inputs and optional headers. There are no restrictions on
data size. Data type and structure is detected automatically and usually without additional configuration.
However in some cases additional configuration can be provided to augment automatic detection results.

<aside class="important">
<p>
Structure detection algorithm analyses chunk at beginnig and relies on relative uniformity of data.
When first chunk is non-respresentative of rest of data automatic import can yeild errors.
</p>
</aside>

`/imp` column names from header row as table columns. The following characters are removed from column names:

~~~ java
     [space] _  ?  .  ,  \  \  \\  /  \0  :  )  (  +  -  *  %  ~
~~~

When header row is missing column names are generated automatically.

### Syntax


### Options