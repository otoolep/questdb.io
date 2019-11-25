---
id: get_started
title: Get started
sidebar_label: Get started
---

QuestDB is relational and time series database. It is wire compatible with PostgresSQL and InfluxDB;  
accessible via SQL over network and embedded; accessible programmatically from Java for ultimate performance.

There is a variety of installation methods and access methods for your convenience.

## Installation using Docker image

Docker is a convenient method to have QuestDB running very quickly via simple command. You will of course need Docker
to be installed on your system. QuestDB has images for Windows, Linux and ARM64 Linux as well as manifest to automatically
download correct image for your target architecture.

todo: link docker installation page

Disadvantage of Docker is that QuestDB will be running in a virtualized environment with up to 20% performance penalty.

## Manual installation

QuestDB can be installed manually via downloading ZIP archive, exracting and running binary. Target system will require Java 8
to be present and QuestDB will have to know directory where Java is installed.

## Via Homebrew

We have not yet updated this method, but its coming right up.

## Via Maven dependency

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

- text files via REST
- text files via Web Console
- text files via PostgresSQL COPY command
- Influx line protocol over UDP
- Programmatic via Java
- INSERT via Java
- INSERT via PostgresSQL wire (tools and drivers)

## Output methods

- SQL via WebConsole
- SQL via REST
- SQL via PostgresSQL wire (tools and drivers)
- SQL via Java
- Embedded Java API
