---
id: case
title: CASE
sidebar_label: CASE
---

### Syntax
![case syntax](assets/case-def.svg)

### Description
`CASE` goes through a set of conditions and returns a value corresponding to the first condition met.
Each new condition follows the `WHEN condition THEN value` syntax.
The user can define a return value when no condition is met using `ELSE`.
If `ELSE` is not defined and no conditions are met, then case returns `null`.

### Examples
Assume the following data

| Name | Age |
|---|---|
| Tom | 4 |
| Jerry | 19 |
| Anna | 25 |
| Jack | 8 |

#### CASE with ELSE

```sql
select 
Name, 
case
    when age > 18 then 'major'
    else 'minor'
end 
from table
```

| Name | case |
|---|---|
| Tom | minor |
| Jerry | major |
| Anna | major |
| Jack | minor |


#### CASE WITHOUT ELSE

```sql
select 
Name, 
case
    when age > 18 then 'major'
end 
from table
```

| Name | case |
|---|---|
| Tom | null |
| Jerry | major |
| Anna | major |
| Jack | null |