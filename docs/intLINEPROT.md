---
id: lineprot
title: Influx Line Protocol
sidebar_label: Influx Line Protocol
---

## Overview
QuestDB supports **Influx Line Protocol** as an **input method**

### Supported methods

- Java
- Telegraf via UDP
- Linux command line

> Line protocol via **TCP** and **HTTP** is not yet supported. This will be added in further releases.

### Syntax
Influx Line Protocol follows this syntax
```shell script
table_name,tagset, valueset, timestamp
```

where:
| Element               | Definition                                                                                 |
|-----------------------|--------------------------------------------------------------------------------------------|
| table_name            | Name of the table where QuestDB will write data.                                           |
| tagset                | Array of string key-value pairs  separated by commas that represent the reading's associated metadata|
| values                | Array of key-value pairs separated by commas that represent the readings. The keys are string, values can be numeric or boolean|
| timestamp             | UNIX timestamp. By default in microseconds. Can be changed in the configuration (see below) |

> When `table_name` does not correspond to an existing table, QuestDB will create the table on the fly using the name
>provided. Types will be assigned based on automatic recognition of the values sent via Influx line protocol.

### Examples
Let's assume the following data:
|timestamp             | city            | temperature           | humidity              | make              |
|----------------------|-----------------|-----------------------|-----------------------|-------------------|
|1465839830100400000   | London          | 23.5                  | 0.343                 | Omron             |
|1465839830100600000   | Bristol         | 23.2                  | 0.443                 | Honeywell         |
|1465839830100700000   | London          | 23.6                  | 0.358                 | Omron             |


Line protocol to insert this data in the `readings` table would look like this:
```shell script
readings,city=London,make=Omron temperature=23.5,humidity=0.343 1465839830100400000
readings,city=Bristol,make=Honeywell temperature=23.2,humidity=0.443 1465839830100600000
readings,city=London,make=Omron temperature=23.6,humidity=0.348 1465839830100700000
```

> Note there are only 2 spaces in each line. First betwwen the `tagset` and `values`. Second between
> `values` and `timestamp`.

### Dealing with Irregularly-structured Data
>QuestDB can support on-the-fly data structure changes with minimal overhead. Should users decide to send
>more / fewer readings or metadata tags, QuestDB will adapt on the fly.

Influx line protocol makes it possible to send data under different shapes. Each new entry may contain certain 
metadata tags and others not. Similarly, entries may contain certain value fields and others not. Whilst the example just above
shows very structured data, it is common for Influx line protocol users to send data as follows.
```shell script
readings,city=London temperature=23.2 1465839830100400000
readings,city=London temperature=23.6 1465839830100700000
readings,make=Honeywell temperature=23.2,humidity=0.443 1465839830100800000
```

Note that on the third line, 
- a new `tag` is added: "make"
- a new `field` is added: "humidity"

After writing two entries, the data would look like this:
|timestamp             | city            | temperature           |
|----------------------|-----------------|-----------------------|
|1465839830100400000   | London          | 23.5                  |
|1465839830100700000   | London          | 23.6                  | 

The third entry would result in the following table:
|timestamp             | city            | temperature           | humidity              | make              |
|----------------------|-----------------|-----------------------|-----------------------|-------------------|
|1465839830100400000   | London          | 23.5                  | NULL                  | NULL              |
|1465839830100700000   | London          | 23.6                  | NULL                  | NULL              |
|1465839830100800000   | NULL            | 23.2                  | 0.358                 | Honeywell         |

>Adding columns on the fly is no issue for QuestDB. New columns will be created in the affected partitions, and only
>populated if they contain values. Whilst we offer this function for flexibility, we recommend that users try to minimise 
>structural changes to maintain operational simplicity. 

## Configuration
The following configuration parameters can be added to the configuration file to customise the interaction using 
Influx line protocol. The configuration file is found under `/questdb/conf/questdb.conf`

"line.udp.bind.to", "0.0.0.0:9009", (a, p) -> {
    this.lineUdpBindIPV4Address = a;
    this.lineUdpPort = p;
});

| Property                       | Type           | Default value  | Description                                         |
|--------------------------------|----------------|----------------|-----------------------------------------------------|
|**line.udp.join**               | `string`       |*"232.1.2.3"*   |                                                     |
|**line.udp.commit.rate**        | `long`         |*10_000*        | Server will commit every N messages                 |
|**line.udp.msg.buffer.size**    | `long`         |*1,048,576*     |                                                     |
|**line.udp.msg.count**          | `long`         |*10_000*        |                                                     |
|**line.udp.receive.buffer.size**| `long`         |*2048*          |                                                     |
|**line.udp.enabled**            | `boolean`      |*true*          |                                                     |
|**line.udp.own.thread**         | `boolean`      |*false*         |                                                     |
|**line.udp.unicast**            | `boolean`      |*false*         | When true, UDP will me unicast. Otherwise multicast |


## Java

Java users can use `LineProtoSender` to send line protocol to QuestDB.

### Using LineProtoSender
**Step 1:** Create an instance of `LineProtoSender`.

| Arguments                    | Description                                                                          |
|------------------------------|--------------------------------------------------------------------------------------|
|NetworkFacade                 |                                                                                      |
|interfaceIPv4Address          |                                                                                      |
|sendToIPv4Address             |                                                                                      |
|capacity                      |                                                                                      |
|ttl                           |                                                                                      |

Example:
```java
    LineProtoSender sender = new LineProtoSender(NetworkFacadeImpl.INSTANCE, 0, Net.parseIPv4("232.1.2.3"), 9009, 110, 2);
```

**Step 2:** Create `entries` by building each entry's tagset and fieldset.
Syntax
```java
sender.metric("table_name").tag("key","value").field("key", value).$(timestamp);
```

where:
| Element               | Description                                                                   | Can be repeated     |
|-----------------------|-------------------------------------------------------------------------------|---------------------|
|metric(tableName)      | Specify which table the data is to be written into                            | no                  |
|tag("key","value")     | Use to add a new key-value entry as metadata                                  | yes                 |
|field("key","value")   | Use to add a new key-value entry as reading                                   | yes                 |
|$(timestamp)           | Specify the timestamp for the reading                                         | no                  |

> When an element can be repeated, you can concatenate them several times to add more.
> Example tag("a","x").tag("b","y").tag("c","z") etc

Example:
```java
    sender.metric("readings").tag("city", "London").tag("by", "quest").field("temp", 3400).field("humid", 0.434).$(Os.currentTimeNanos());
```

**Step 3:** Push the metrics to QuestDB using `flush()`
```java
    sender.flush();
```

### Example
```java
    LineProtoSender sender = new LineProtoSender(NetworkFacadeImpl.INSTANCE, 0, Net.parseIPv4("232.1.2.3"), 9009, 110, 2);
    sender.metric("readings").tag("city", "London").tag("by", "quest").field("temp", 3400).$(Os.currentTimeNanos());
    sender.metric("readings").tag("city", "London").tag("by", "quest").field("temp", 3400).$(Os.currentTimeMicros());
    sender.metric("readings").tag("city", "London").tag("by", "quest").field("temp", 3400).$(Os.currentTimeMicros());
    sender.flush();
```
