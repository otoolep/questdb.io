---
id: datatypes
title: Data Types
sidebar_label: Data Types
---


Field types that can be specified in `schema` are combinations of physical data type and text format.
 
<table class="alt tall">
<thead>
<th>Imported Type</th>
<th>Data Type</th>
<th>Format</th>
</thead>
<tbody>

<tr>

<td><code>BOOLEAN</code></td>
<td><code>BOOLEAN</code></td>
<td>case-insensitive match with `true`</td>

</tr>

<tr>

<td><code>BYTE</code></td>
<td><code>BYTE</code></td>
<td>-127 to 127 int</td>

</tr>

<tr>

<td><code>DOUBLE</code></td>
<td><code>DOUBLE</code></td>
<td>floating point value</td>

</tr>

<tr>

<td><code>FLOAT</code></td>
<td><code>FLOAT</code></td>
<td>floating point value</td>

</tr>

<tr>

<td><code>INT</code></td>
<td><code>INT</code></td>
<td></td>

</tr>

<tr>

<td><code>LONG</code></td>
<td><code>LONG</code></td>
<td></td>

</tr>

<tr>

<td><code>SHORT</code></td>
<td><code>SHORT</code></td>
<td></td>

</tr>

<tr>

<td><code>STRING</code></td>
<td><code>STRING</code></td>
<td></td>

</tr>

<tr>

<td><code>SYMBOL</code></td>
<td><code>SYMBOL</code></td>
<td></td>

</tr>

<tr>

<td><code>DATE_ISO</code></td>
<td><code>DATE</code></td>
<td><code>2016-05-10T14:55:11.123Z</code></td>

</tr>

<tr>

<td><code>DATE_1</code></td>
<td><code>DATE</code></td>
<td><code>2016-05-10 14:55:11</code></td>

</tr>


<tr>

<td><code>DATE_2</code></td>
<td><code>DATE</code></td>
<td><code>MM/DD/YYYY</code></td>

</tr>


<tr>

<td><code>DATE_3</code></td>
<td><code>DATE</code></td>
<td><code>DD/MM/YYYY</code></td>

</tr>

</tbody>
</table>

> Any date or integer column can be designated as **timestamp** using the `timestamp()` function. This makes it possible to use
>time-based `PARTITIONS` along with time joins such as `ASOF JOIN` and `SPLICE JOIN`. Find more information in the **[CREATE TABLE](tableadmin.md)** section.