---
id: getstarted
title: Get started
sidebar_label: Get started
---

QuestDB is relational and time series database. It is wire compatible with PostgresSQL and InfluxDB;  
accessible via SQL over network and embedded; accessible programmatically from Java for ultimate performance.

## Installation
There is a variety of installation methods and access methods for your convenience.

### Installation using Docker image

Docker is a convenient method to have QuestDB running very quickly via simple command. You will of course need Docker
to be installed on your system. QuestDB has images for Windows, Linux and ARM64 Linux as well as manifest to automatically
download correct image for your target architecture.

To install and use Docker, please refer to our **[Docker instructions](docker.md)**.

Disadvantage of Docker is that QuestDB will be running in a virtualized environment with up to 20% performance penalty.

### Manual installation

QuestDB can be installed manually via downloading ZIP archive, extracting and running binary. Target system will require Java 8
to be present and QuestDB will have to know directory where Java is installed. To install manually, please refer to
our **[Binaries guide](binaries.md)**

### Via Homebrew

We have not yet updated this method, but its coming right up.

### Via Maven dependency

To use QuestDB as embedded database with your JVM based language simply add the following dependency:

```
    implementation 'org.questdb:core:4.0.1'
```

or

```xml
    <dependency>
        <groupId>org.questdb</groupId>
        <artifactId>core</artifactId>
        <version>4.0.1</version>
    </dependency>
```

## Input methods

### Import via REST
You can import a file using `curl` as follows to import .csv or .txt files.
```shell script
curl -i -F data=@ratings.csv http://localhost:9000/imp
```

By default, QuestDB will analyse the data and determine if headers are present. It will also decide on the 
appropriate schema. Users that want more control can use an array of options to flag if the data as headers, to pass a custom schema,
to decide on durability and atomicity settings. For more information on this command, see our **[rest API guide](rest.md)**.

### Import via Web Console
You can get .txt or .csv files into QuestDB using the web console. There are several methods.

- Copy & Paste the data from the clipboard:
![alt-text](assets/copypaste.gif)

- Drag & Drop the file:








### PostgresSQL COPY command
__this is unfinished functionality, example of using psql with text file__
- Influx line protocol over UDP
__example of doing this from Linux command line and java__

### Import programmatically via Java
__we have example of inserting data from java via TableWriter, insert here__


- INSERT via Java
__example of executing insert statement with parameters from java__
- INSERT via PostgresSQL wire (tools and drivers)
__example using JDBC to execute insert statement from java and possibly from Go for a good measure__

## Output methods

- SQL via WebConsole
__animated gif of web console__
- SQL via REST
__example of running query via curl, we have something like this in crud page__
- SQL via PostgresSQL wire (tools and drivers)
__example of query execution and dataset consumption from JDBC and Go__
- SQL via Java
__example of using sql compiler to execute queries and consuming query output__
- Embedded Java API
__example of reading a table and also example of live data consumption: one thread is writing and another is consuming in real time__
