---
id: programmatic
title: Programmatic Interfaces
sidebar_label: Programmatic Interfaces
---

## Overview
QuestDB exposes the following interfaces:
- **[Postgres wire protocol](intPROGRAM.md#postgres-wire-protocol)**
- **[Influx line protocol](intPROGRAM.md#influx-line-protocol)**
- **[Java](intPROGRAM.md#java)**
- **[HTTP REST](intPROGRAM.md#http-rest)**


## Postgres Wire Protocol

> This section is work in progress. 

### Overview

QuestDB implements the Postgres wire protocol. Users can connect to QuestDB the same way they would connect to Postgress with:
- Any language that already has a Postgres adapter (R, Python, etc.).
- Any tool in the Postgres ecosystem.
- QuestDB's time-series and performance capabilities.
- Await-free multi-user experience thanks to QuestDB's smart thread management.

## Influx Line Protocol

### Overview
QuestDB is able to ingest data over **Influx Line Protocol**. Existing systems already publishing line protocol
need not change at all. Although QuestDB uses relational model, line protocol parser will automatically create
tables and add missing columns.

For the time being QuestDB can listen for UDP packets, either multicast or unicast. TCP and HTTP support for line
protocol is on our road map.

> QuestDB listens for multicast on `232.1.2.3:9009`. The address change or switch to unicast can be done via configuration. If you run QuestDB via Docker
> start container as `run --rm -it -p 9000:9000 -p 8812:8812 -p 9009:9009 --net=host questdb/questdb`  and publish
> multicast packets with TTL of at least 2.

### Syntax
Influx Line Protocol follows this syntax

```shell script
table_name,tagset valueset  timestamp
```

where:
| Element               | Definition                                                                                 |
|-----------------------|--------------------------------------------------------------------------------------------|
| table_name            | Name of the table where QuestDB will write data.                                           |
| tagset                | Array of string key-value pairs  separated by commas that represent the reading's associated metadata|
| values                | Array of key-value pairs separated by commas that represent the readings. The keys are string, values can be numeric or boolean|
| timestamp             | UNIX timestamp. By default in microseconds. Can be changed in the configuration (see below) |

> When `table_name` does not correspond to an existing table, QuestDB will create the table on the fly using the name
>provided. Column types will be automatically recognized and assigned based on the data.
>
#### Examples
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

> Note there are only 2 spaces in each line. First between the `tagset` and `values`. Second between
> `values` and `timestamp`.

### Dealing with irregularly-structured data
>QuestDB can support on-the-fly data structure changes with minimal overhead. Should users decide to send
>varying quantities of readings or metadata tags for different entries, QuestDB will adapt on the fly.

Influx line protocol makes it possible to send data under different shapes. Each new entry may contain certain 
metadata tags or readings, and others not. Whilst the example just above
highlights structured data, it is possible for Influx line protocol users to send data as follows.

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

### Configuration
The following configuration parameters can be added to the configuration file to customise the interaction using 
Influx line protocol. The configuration file is found under `/questdb/conf/questdb.conf`

| Property                       | Type           | Default value  | Description                                         |
|--------------------------------|----------------|----------------|-----------------------------------------------------|
|**line.udp.join**               | `string`       |*"232.1.2.3"*   | Multicast address receiver joins. This values is ignored when receiver is in "unicast" mode   |
|**line.udp.bind.to**            | `string`       |*"0.0.0.0:9009"* | IP address of the network interface to bind listener to and port. By default UDP receiver listens on all network interfaces|
|**line.udp.commit.rate**        | `long`         |*1000000*        | For packet bursts the number of continuously received messages after which receiver will force commit. Receiver will commit irrespective of this parameter when there are no messages.                 |
|**line.udp.msg.buffer.size**    | `long`         |*2048*          | Buffer used to receive single message. This value should be roughly equal to your MTU size.                |
|**line.udp.msg.count**          | `long`         |*10000*        | Only for Linux. On Linix QuestDB will use recvmmsg(). This is the max number of messages to receive at once.                                                    |
|**line.udp.receive.buffer.size**| `long`         |*8388608*       | UDP socket buffer size. Larger size of the buffer will help reduce message loss during bursts.                                                    |
|**line.udp.enabled**            | `boolean`      |*true*          | Flag to enable or disable UDP receiver                                                    |
|**line.udp.own.thread**         | `boolean`      |*false*         | When "true" UDP receiver will use its own thread and busy spin that for performance reasons. "false" makes receiver use worker threads that do everything else in QuestDB.                                                    |
|**line.udp.own.thread.affinity**         | `int`      |*-1*    |  -1 does not set thread affinity. OS will schedule thread and it will be liable to run on random cores and jump between the. 0 or higher pins thread to give core. This propertly is only valid when UDP receiver uses own thread. |
|**line.udp.unicast**            | `boolean`      |*false*         | When true, UDP will me unicast. Otherwise multicast |
|**line.udp.timestamp**          | `string` | "n" | Input timestamp resolution. Possible values are "n", "u", "ms", "s" and "h". |
|**line.udp.commit.mode**        | `string` | "nosync" | Commit durability. Available values are "nosync", "sync" and "async"   |


### Sending messages from Java

QuestDB library provides fast and efficient way of sending line protocol messages. Sender implementation entry point is
`io.questdb.cutlass.line.udp.LineProtoSender`, it is fully zero-GC and is latency in a region of 200ns per message.


#### Get started
**Step 1:** Create an instance of `LineProtoSender`.

| Arguments                    | Description                                                                          |
|------------------------------|--------------------------------------------------------------------------------------|
|interfaceIPv4Address          |  Network interface to use to send messages.                                                                                    |
|sendToIPv4Address             |  Destination IP address                                                                                    |
|bufferCapacity                |  Send buffer capacity to batch messages. Do not configure this buffer over the MTU size                                                                                    |
|ttl                           |  UDP packet TTL. Set this number appropriate to how many VLANs your messages have to traverse before reaching the destination                                                                                    |

Example:
```java

LineProtoSender sender = new LineProtoSender(0, Net.parseIPv4("232.1.2.3"), 9009, 110, 2);
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


Sender will send message as soon as send buffer is full. To send messages before buffer fills up you can use `sender.flush()`

#### Example
```java

LineProtoSender sender = new LineProtoSender(0, Net.parseIPv4("232.1.2.3"), 9009, 1024, 2);
sender.metric("readings").tag("city", "London").tag("by", "quest").field("temp", 3400).$(Os.currentTimeNanos());
sender.metric("readings").tag("city", "London").tag("by", "quest").field("temp", 3400).$(Os.currentTimeNanos());
sender.metric("readings").tag("city", "London").tag("by", "quest").field("temp", 3400).$(Os.currentTimeNanos());
sender.flush();
```

### Sending messages from Unix shell

It is very easy to send metrics from shell. `bash` has specific syntax to send udp packets, for example:
```shell script

echo "readings,city=London,make=Omron temperature=23.5,humidity=0.343 1465839830100400000" > /dev/udp/127.0.0.1/9009
```

You could also use net cat method, which works from all shells:

```shell script

echo "readings,city=London,make=Omron temperature=23.5,humidity=0.343 1465839830100400000" | nc -u 127.0.0.1 9009
```

## Java

### Compiling SQL in Java

#### Overview
JAVA users can use the `SqlCompiler` to run SQL queries like they would do in the web console for example.

> Note this can be used for any SQL query. This means you can use this with any supported SQL statement. For example 
> [INSERT](sqlINSERT.md) or [COPY](sqlCOPY.md) to write data, [CREATE TABLE](sqlCREATE.md) or [ALTER TABLE](sqlALTER.md)
>to administer tables, and [SELECT](sqlSELECT.md) to query data.

#### Syntax
```java
CairoConfiguration configuration = new DefaultCairoConfiguration("/tmp/my_database");
BindVariableService bindVariableService = new BindVariableService();
try (CairoEngine engine = new CairoEngine(configuration)) {
try (SqlCompiler compiler = new SqlCompiler(engine, configuration)) {
    compiler.compile(
        "YOUR_SQL_HERE"
    );
}
}
```

`configuration` holds various settings that can be overridden via a subclass. 
Most importantly configuration is bound to the database root - directory where table sub-directories will be created.

`engine` is a concurrent pool of table readers and writers.

`compiler` is the entry point for QuestDB's SQL engine.

#### Example
The following will create a new table abc with the specifications set below.

```java
CairoConfiguration configuration = new DefaultCairoConfiguration("/tmp/my_database");
BindVariableService bindVariableService = new BindVariableService();
try (CairoEngine engine = new CairoEngine(configuration)) {
try (SqlCompiler compiler = new SqlCompiler(engine, configuration)) {
    compiler.compile(
            "create table abc (" +
                    "a INT, " +
                    "b BYTE, " +
                    "c SHORT, " +
                    "d LONG, " +
                    "e FLOAT, " +
                    "f DOUBLE, " +
                    "g DATE, " +
                    "h BINARY, " +
                    "t TIMESTAMP, " +
                    "x SYMBOL, " +
                    "z STRING, " +
                    "y BOOLEAN" +
                    ") timestamp(t) partition by MONTH", 
    );
}
}
```

### Reading query results

#### Overview
Querying data is a three-step process:

1 - Compile the SQL text to an instance of `RecordCursorFactory`, an instance that encapsulates execution plan. You can 
run custom SQL queries by instantiating `RecordCursorFactory` to `compiler.compile("YOUR_SQL_HERE")`

2 - Create a `RecordCursor` instance using a factory from step 1.

3 - Iterate on `RecordCursor` to read the data.

#### Example
~~~ java
final CairoEngine engine = new Engine(new DefaultCairoConfiguration(""));
final SqlCompiler compiler = new SqlCompiler(engine);
final RecordCursorFactory factory = compiler.compile("select * from table");
final RecordCursor cursor = factory.getCursor();
final Record record = cursor.getRecord();

while(cursor.hasNext()) {
record.getInt(0);
...
}
~~~

#### Component life cycle
1 - **Engine**

This is a thread-safe, concurrent and non-blocking pool of TableReader and TableWriter instances. 
Ideally, there should be only one per database location.

2 - **SqlCompiler**

This is a totally single-threaded, factory-style instance

3 - **RecordCursorFactory**

Execution plan of respective SQL, also single-threaded. 
The instance is reusable as far as the creation of RecordCursor is concerned and should be 
retained until data access is no longer needed. It can be closed explicitly via close() method.

4 - **RecordCursor**

This is a data iterator. The cursor has a fixed record instance, which is a moving window on the data set. `next()`
calls push this "window" down one record at a time.


<aside class="important">
<p> The `RecordCursor` must be explicitly released when no longer required in order to free up the system's resources.
</p>
</aside>

### Writing data programmatically

#### Overview
The `TableWriter` facilitates table writes. To successfully create an instance of `TableWriter`, the table must:
- already exist
- have no other open writers against it as the `TableWriter` constructor will attempt to obtain an exclusive 
cross-process lock on the table.

#### Example

~~~ java
AllowAllSecurityContextFactory securityContextFactor = new AllowAllSecurityContextFactory();
CairoSecurityContext cairoSecurityContext = securityContextFactor.getInstance("admin");
try (TableWriter writer = engine.getWriter(cairoSecurityContext, "abc")) {
for (int i = 0; i < 10; i++) {
    TableWriter.Row row = writer.newRow(Os.currentTimeMicros());
    row.putInt(0, 123);
    row.putByte(1, (byte) 1111);
    row.putShort(2, (short) 222);
    row.putLong(3, 333);
    row.putFloat(4, 4.44f);
    row.putDouble(5, 5.55);
    row.putDate(6, System.currentTimeMillis());
    // skip 7 - see separate function to write blobs
    // skip 8 - timestamp is already set via newRow() call
    row.putSym(9, "xyz");
    row.putStr(10, "abc");
    row.putBool(11, true);
    row.append();
}
writer.commit();
}
~~~

#### Detailed Steps
Detailed steps are:

1 - Create an instance of TableWriter. In this case, we use engine but we can also use TableWriter constructor directly.
~~~ java
AllowAllSecurityContextFactory securityContextFactor = new AllowAllSecurityContextFactory();
CairoSecurityContext cairoSecurityContext = securityContextFactor.getInstance("admin");
try (TableWriter writer = engine.getWriter(cairoSecurityContext, "abc")) {
~~~
The `writer` instance must be eventually released to release resources. 
In this case, it will be released back to the engine for re-use. 
Constructing a new writer is a resource-intensive operation and it will allocate memory on JVM heap. 
Writers lifecycle should be carefully considered for your particular use case.

2 - Create a new row
~~~ java
TableWriter.Row row = writer.newRow(Os.currentTimeMicros());
~~~
Although this operation semantically looks like a new object creation, the row instance is actually being re-used under 
the hood. A Timestamp is necessary to determine a partition for the new row. Its value has to be 
either increment or stay the same as the last row. When the table is not partitioned and does not have a 
designated timestamp column, timestamp value can be 0, e.g.
~~~ java
TableWriter.Row row = writer.newRow(0);
~~~

3 - Populate row columns
There are put* methods for every supported data type. Columns are updated by an index for performance reasons:
~~~ java 
row.putLong(3, 333);
~~~ 

Column update order is not important and update can be sparse. All unset columns will default to NULL values.

4 - Append row
It is a trivial and lightweight method call:

~~~ java
row.append();
~~~
Appended rows are not visible to readers until they are committed. An unneeded row can also be canceled if required.
~~~ java
row.cancel();
~~~

A pending row is automatically cancelled when `writer.newRow()` is called.

5 - Commit changes
`writer.commit` commits changes, which makes them visible to readers. 
This method call is atomic and has a complexity of O(1).


## HTTP Rest


### Overview
QuestDB REST API is based around standard HTTP features and is understood by off-the-shelf HTTP clients.
It provides a simple way to interact with QuestDB as is compatible with most programming languages.
API functions are keyed on full URL and they use query parameters as their arguments. Responses are function specific, for example you can download
query results as CSV files, directly from the API. You can also get JSON responses. 

Available function are `/imp`, `/exec`, `/exp` and `/chk`.


>REST API can be accessed interactively using Web Console that is a part of QuestDB distribution.
To access Web Console visit **[http://localhost:9000](http://localhost:9000)**

Other machines on your network can access the console or connect to the DB programmatically
by navigating `http://IP_OF_THE_HOST_MACHINE:9000`

### /imp - Loading data
#### Overview
The function `/imp` streams tabular text data directly into a table.
It supports CSV, TAB and Pipe (`|`) delimited inputs and optional headers. There are no restrictions on
data size. Data type and structure is detected automatically and usually without additional configuration.
However in some cases additional configuration can be provided to augment automatic detection results.


>The structure detection algorithm analyses chunk at beginning and relies on relative uniformity of data.
> When first chunk is non-representative of rest of data automatic import can yield errors.


`/imp` column names from header row as table columns. The following characters are removed from column names:

~~~ java
 [space] _  ?  .  ,  \  \  \\  /  \0  :  )  (  +  -  *  %  ~
~~~

When header row is missing column names are generated automatically.

#### Syntax
`/imp` request is HTTP POST, multi-part. It accepts a mixture of form and query arguments:

<table class="alt tall">
<thead>
<th>Argument</th>
<th>Remarks</th>
</thead>
<tbody>
<tr>
<td class="param"><code>schema</code> (optional, form)</td>
<td>

URL-encoded string of type hints<p><img src="assets/schema.svg"></p>
<code>schema</code> parameter must always precede <code>data</code>. 

</td>
</tr>
<tr>
<td class="param"><code>data</code> (required, form)</td>
<td>Data to stream. If target table name is not explicitly specified, file
name will be used. Request will fail if file name is also missing.
</td>
</tr>

<tr>
<td class="param"><code>name</code> (optional, query)</td>
<td>
Name of target table. This parameter takes precedence over file name.
</td>
</tr>

<tr>
<td class="param"><code>overwrite</code> (optional, query)</td>
<td>
Boolean flag. Default value is <code>false</code>. Set it to <code>true</code> to have existing table
deleted before appending data.
</td>
</tr>

<tr>
<td class="param"><code>fmt</code> (optional, query)</td>
<td>
Acceptable value is <code>json</code> to have JSON response. Human readable text response otherwise.
</td>
</tr>

<tr>
<td class="param"><code>durable</code> (optional, query, boolean)</td>
<td>
When request is <durable>durable</durable> QuestDB will flush relevant disk cache before responding. Default value is <code>false</code>
</td>
</tr>

<tr>
<td class="param"><code>atomicity</code> (optional, query)</td>
<td>
Available values are <code>strict</code> and <code>relaxed</code>. Default value is <code>relaxed</code>. When atomicity is <code>relaxed</code>
data rows that cannot be appended to table are discarded, thus allowing partial uploads. In <code>strict</code> mode upload fails as soon as any
data error is encountered and all previously appended rows are rolled back. There is additional server parameter <code>http.abort.broken.uploads</code>
that governs if server will continue to receive all of the data to completion or close socket right away

<p>
When server is configured to obey HTTP protocol and receive incoming data even though it knows data is useless, it will be doing so with
reduced amount of data processing. It will be parsing multipart data because it has to, but delimited file will not be parsed,
speeding up the process.
</p>

<p>When <code>http.abort.broken.uploads</code> is set to <code>true</code> server will close socket as soon as it detects data error. This
usually forces clients to stop sending data, saves waiting time and frees up server resources immediately. The downside is that some HTTP
clients will not receive diagnostic message, even though server does send it in all cases.
</p>

</td>
</tr>

</tbody>
</table>

#### ACID
`/imp` is fully ACID compliant, although Atomicity and Durability can be relaxed to meet convenience
and performance demands.

**Atomicity** is fully insured against any connection problems. If server detects closed socket the entire
request is rolled back instantly and transparently for any existing readers. The only time data can be partially
imported is when atomicity is in <code>relaxed</code> mode and data cannot be converted to column type. 
In this scenario "defective" row of data is discarded and <code>/imp</code> continues to stream request data into table.

**Consistency** is guaranteed by consistency of append transactions against QuestDB storage engine.

**Isolation** Data is committed to QuestDB storage engine at end of request. Uncommitted transactions are not
visible to readers.

**Durability** `/imp` streams data from network socket buffer directly into memory mapped files. At this point
data is handed over to the OS and is resilient against QuestDB internal errors and unlikely but hypothetically possible
crashes. This is default method of appending data and it is chosen for its performance characteristics. In cases where
transaction has to be resilient against OS errors or power losses physical durability can be enforced. At a cost of
append performance QuestDB storage engine will also guarantee that each memory block is flushed to physical device.

#### Examples
The following examples upload ratings.csv, which can be found [here](https://grouplens.org/datasets/movielens/)
Response shows table name, columns, types, error count in each column and total rows.
When column types are correct error count must be zero. 

#### Basic import
```shell script
mpb:ml-latest user$ <em>curl -i -F data=@ratings.csv http://localhost:9000/imp
```

Response:
```shell script
HTTP/1.1 200 OK
Server: questDB/1.0
Date: Fri, 28 Oct 2016 17:58:31 GMT
Transfer-Encoding: chunked
Content-Type: text/plain; charset=utf-8

+-----------------------------------------------------------------------------------+
|      Location:  |               /Users/info/dev/data/db/ratings.csv  |    Errors  |
|   Partition by  |                                              NONE  |            |
+-----------------------------------------------------------------------------------+
|   Rows handled  |                                          22884377  |            |
|  Rows imported  |                                          22884377  |            |
+-----------------------------------------------------------------------------------+
|              0  |                                     userId INT(4)  |         0  |
|              1  |                                    movieId INT(4)  |         0  |
|              2  |                                  rating DOUBLE(8)  |         0  |
|              3  |                                  timestamp INT(4)  |         0  |
+-----------------------------------------------------------------------------------+
```

JSON response for the same request would be:

~~~ json
{
"status": "OK",
"location": "ratings.csv",
"rowsRejected": 0,
"rowsImported": 22884377,
"columns": [
    {
        "name": "userId",
        "type": "INT",
        "size": 4,
        "errors": 0
    },
    {
        "name": "movieId",
        "type": "INT",
        "size": 4,
        "errors": 0
    },
    {
        "name": "rating",
        "type": "DOUBLE",
        "size": 8,
        "errors": 0
    },
    {
        "name": "timestamp",
        "type": "INT",
        "size": 4,
        "errors": 0
    }
]
}
~~~


#### Import with schema
This example overrides types of `userId` and `movieId` by including `schema` parameter:

```shell script 
:ml-latest user$ curl -i -F 'schema=userId=STRING&movieId=STRING' -F data=@ratings.csv http://localhost:9000/imp
```


Response:
```shell script
HTTP/1.1 200 OK
Server: questDB/1.0
Date: Sun, 30 Oct 2016 1:20:7 GMT
Transfer-Encoding: chunked
Content-Type: text/plain; charset=utf-8

+-----------------------------------------------------------------------------------+
|      Location:  |               /Users/info/dev/data/db/ratings.csv  |    Errors  |
|   Partition by  |                                              NONE  |            |
+-----------------------------------------------------------------------------------+
|   Rows handled  |                                          22884377  |            |
|  Rows imported  |                                          22884377  |            |
+-----------------------------------------------------------------------------------+
|              0  |                                 userId <em>STRING(16)</em>  |         0  |
|              1  |                                movieId <em>STRING(16)</em>  |         0  |
|              2  |                                  rating DOUBLE(8)  |         0  |
|              3  |                                  timestamp INT(4)  |         0  |
+-----------------------------------------------------------------------------------+
```

>If the table already exists its structure will take precedence over all but DATE schema fields.

#### Import with several parameters
This example shows the concatenation of several import parameters
```shell script
curl -i -F data=@ratings.csv 'http://localhost:9000/imp?forceHeaders=true&overwrite=true'
```

### /imp Append Data

#### Overview
`/imp` can be used to append data over HTTP. This is done through an HTTP multipart request.

#### Procedure
1 - Prepare an `imp` command URL

Example: 
```shell script
http://localhost:9000/imp?fmt=json&overwrite=true
```

2 - Open a `POST` connection request. You will post on the `URL` you have defined above.

#### Request header
3 - Set your `Request Header` as a `multipart/form-data`

Example: 
```shell script
"Content-Type", "multipart/form-data; boundary=----YOUR_DELIMITER"
```

#### Request body
4 - Post your request and insert your data in the body:

```shell script
------YOUR_DELIMITER
Content-Disposition: form-data; name="data"; filename="YOUR_DATABASE_NAME"
Content-Type: text/xml

mid,timestamp
100.25,1495875612
100.33,1495875621


------YOUR_DELIMITER--
```

### /exec Query Data

#### Overview
`/exec` compiles and executes the SQL query supplied as an argument and returns a JSON object with
either data or an error. The **error object** contains message and position in query text. Position is a number of 
characters from beginning of query where error occurred.

The result of a successful execution is a **JSON object** containing an array of data rows. Each data row is array of column values. 
The dataset metadata is returned in `columns` field - list of column names and their types.

Query execution terminates automatically when the socket connection is closed.

#### Syntax
`/exec` is HTTP GET request with following query arguments:

<table class="alt tall">
<thead>
<th>Argument</th>
<th>Remarks</th>
</thead>
<tbody>
<tr>
<td class="param"><code>query</code> (required)</td>
<td>
URL-encoded query text. It can be multi-line, but query separator, such as <code>;</code> must not be included.
</td>
</tr>

<tr>
<td class="param"><code>limit</code> (optional)</td>
<td>
This argument is used for paging. Limit can be either in format of <code>X,Y</code> where <code>X</code> is the lower 
limit and <code>Y</code> is the upper, or just <code>Y</code>. For example, <code>limit=10,20</code> will return row numbers 10 thru to 20 inclusive.
and <code>limit=20</code> will return first 20 rows, which is equivalent to <code>limit=0,20</code>
</td>
</tr>

<tr>
<td class="param"><code>count</code> (optional, boolean)</td>
<td>
Instructs <code>/exec</code> to count rows and return this value in message header. Default value is <code>false</code>. There
is slight performance hit for requesting row count.
</td>
</tr>

<tr>
<td class="param"><code>nm</code> (optional, boolean)</td>
<td>
Skips metadata section of the response when <code>true</code>. When metadata is known and client is paging this flag
should typically be set to <code>true</code> to reduce response size. Default value is <code>false</code> and metadata is
included in the response.
</td>
</tr>

</tbody>
</table>

#### Examples
The following will use `curl` to send a query over http. The result will be sent back over HTTP.
Note that the `query` is url-encoded.

```shell script
C:\Users\info>curl -v -G http://localhost:9000/exp --data-urlencode "query=select * from mydb;" -d limit=5
*   Trying ::1...
* TCP_NODELAY set
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 9000 (#0)
> GET /exp?query=select%20%2A%20from%20mydb%3B&limit=5 HTTP/1.1
> Host: localhost:9000
> User-Agent: curl/7.55.1
> Accept: */*
>
< HTTP/1.1 200 OK
< Server: questDB/1.0
< Date: Mon, 25 Nov 2019 12:33:01 GMT
< Transfer-Encoding: chunked
< Content-Type: text/csv; charset=utf-8
< Content-Disposition: attachment; filename="questdb-query-1574685181623.csv"
< Keep-Alive: timeout=5, max=10000
<
"userId","movieId","rating","timestamp"
1,307,3.5000000000,1256677221
1,481,3.5000000000,1256677456
1,1091,1.5000000000,1256677471
1,1257,4.5000000000,1256677460
1,1449,4.5000000000,1256677264
* Connection #0 to host localhost left intact
```


This is an example of successful query execution response. HTTP status code `200`.

~~~ json
{
"query": "select AccidentIndex, Date, Time from 'Accidents0514.csv' limit 2",
"columns": [
    {
        "name": "AccidentIndex",
        "type": "STRING"
    },
    {
        "name": "Date",
        "type": "DATE"
    },
    {
        "name": "Time",
        "type": "STRING"
    }
],
"dataset": [
    [
        "200501BS00001",
        "2005-01-04T00:00:00.000Z",
        "17:42"
    ],
    [
        "200501BS00002",
        "2005-01-05T00:00:00.000Z",
        "17:36"
    ],
   
],
"count": 2
}
~~~


#### Error response
Example of error response. HTTP status code `400` is used for query errors and `500` for internal server
errors, which should not normally occur.

~~~ json
{
"query": "\nselect AccidentIndex, Date, Time2 from 'Accidents0514.csv' limit 10",
"error": "Invalid column: Time2",
"position": 29
}
~~~


### /exp Export Data
#### Overview
QuestDB allows exporting results of query execution. Function `/exp` does exactly that. The exported data is saved in a CSV
(comma delimited) file with Unix line ends `\n`. Once the file is generated, it will be available for download as opposed to being displayed in the browser.

Server responds with HTTP `200` when query execution is successful and `400` when there is error and returns error text. 

#### Syntax
`/exp` is HTTP GET request with following query arguments:

<table class="alt tall">
<thead>
<th>Argument</th>
<th>Remarks</th>
</thead>
<tbody>
<tr>
<td class="param"><code>query</code> (required)</td>
<td>
URL-encoded query text. It can be multi-line, but query separator, such as <code>;</code> must not be included.
</td>
</tr>

<tr>
<td class="param"><code>limit</code> (optional)</td>
<td>
This argument is used for paging. Limit can be either in format of <code>X,Y</code> where <code>X</code> is the lower 
limit and <code>Y</code> is the upper, or just <code>Y</code>. For example, <code>limit=10,20</code> will return row numbers 10 thru to 20 inclusive.
and <code>limit=20</code> will return first 20 rows, which is equivalent to <code>limit=0,20</code>
</td>
</tr>

</tbody>
</table>


#### Success response
Below is example of exporting data from command line using `curl`

```shell script
mbp:~ user$ curl -v -G http://localhost:9000/exp \
             --data-urlencode "query=select AccidentIndex2, Date, Time from 'Accidents0514.csv'" \
             -d limit=5
```
  
Response:
```shell script      
*   Trying ::1...
* connect to ::1 port 9000 failed: Connection refused
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 9000 (#0)
> GET /exp?query=select%20AccidentIndex%2C%20Date%2C%20Time%20from%20%27Accidents0514.csv%27&limit=5 HTTP/1.1
> Host: localhost:9000
> User-Agent: curl/7.49.1
> Accept: */*
> 
< HTTP/1.1 200 OK
< Server: questDB/1.0
< Date: Wed, 9 Nov 2016 17:58:54 GMT
< Transfer-Encoding: chunked
< Content-Type: text/csv; charset=utf-8
< Content-Disposition: attachment; filename="questdb-query-1478714334308.csv"
< 
"AccidentIndex","Date","Time"
200501BS00001,"2005-01-04T00:00:00.000Z",17:42
200501BS00002,"2005-01-05T00:00:00.000Z",17:36
200501BS00003,"2005-01-06T00:00:00.000Z",00:15
200501BS00004,"2005-01-07T00:00:00.000Z",10:35
200501BS00005,"2005-01-10T00:00:00.000Z",21:13
* Connection #0 to host localhost left intact
```

#### Error response
When query contains syntax errors `/exp` attempts to return as much diagnostic information as possible.
Example erroneous request:

```shell script
mbp:ui user$ curl -v -G http://localhost:9000/exp \
>                  --data-urlencode "query=select AccidentIndex2, Date, Time from 'Accidents0514.csv'" \
>                  -d limit=5
```
Response:
```shell script
*   Trying ::1...
* connect to ::1 port 9000 failed: Connection refused
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 9000 (#0)
> GET /exp?query=select%20AccidentIndex2%2C%20Date%2C%20Time%20from%20%27Accidents0514.csv%27&limit=5 HTTP/1.1
> Host: localhost:9000
> User-Agent: curl/7.49.1
> Accept: */*
> 
< HTTP/1.1 400 Bad request
< Server: questDB/1.0
< Date: Wed, 9 Nov 2016 18:3:55 GMT
< Transfer-Encoding: chunked
< Content-Type: text/csv; charset=utf-8
< Content-Disposition: attachment; filename="questdb-query-1478714635400.csv"
< 
<em>Error at(7): Invalid column: AccidentIndex2</em>
* Connection #0 to host localhost left intact
```