---
id: serverConf
title: Server Configuration Properties
sidebar_label: Configuration Properties
---

QuestDB server configuration can be set in the `server.conf` configuration file.
When a key is absent from the configuration file, the default value is used.

### Customising the configuration

To override a default value with a custom value, add the key in the configuration file. as follows
```shell script
aaa.bbb.ccc.ddd=myValue
```

For example 
```shell script
shared.worker.count=5
```

> A restart of QuestDB is required to pickup the new configuration

### Available keys and default values

|Property|Default value|Description|
|---|---|---|
|shared.worker.count|2|Maximum number of threads used by the HTTP server|
|shared.worker.affinity|||
|shared.worker.haltOnError|false||
|http.enabled|true||

|Property|Default value|Description|
|---|---|---|
|http.connection.pool.initial.capacity|16||
|http.connection.string.pool.capacity|128||
|http.multipart.header.buffer.size|512||
|http.multipart.idle.spin.count|10_000||
|http.receive.buffer.size|1024 * 1024||
|http.request.header.buffer.size|32 * 2014||
|http.response.header.buffer.size|32 * 1024||
|http.worker.count|0||
|http.worker.affinity|httpWorkerCount||
|http.worker.haltOnError|false||
|http.send.buffer.size|2 * 1024 * 1024||
|http.static.index.file.name|index.html||
|http.frozen.clock|false||
|http.allow.deflate.before.send|false||
|http.keep-alive.timeout|5||
|http.keep-alive.max|10_000||
|http.static.pubic.directory|public||


|Property|Default value|Description|
|---|---|---|
|http.net.active.connection.limit|256||
|http.net.event.capacity|1024||
|http.net.io.queue.capacity|1024||
|http.net.idle.connection.timeout|5 * 60 * 1000L||
|http.net.interest.queue.capacity|1024||
|http.net.listen.backlog|256||
|http.net.snd.buf.size|2 * 1024 * 1024||
|http.net.rcv.buf.size|2 * 1024 * 1024||
|http.text.date.adapter.pool.capacity|16||
|http.text.json.cache.limit|16384||
|http.text.json.cache.size|8192||
|http.text.max.required.delimiter.stddev|0.1222d||
|http.text.max.required.line.length.stddev|0.8||
|http.text.metadata.string.pool.capacity|128||
|http.text.roll.buffer.limit|1024 * 4096||
|http.text.roll.buffer.size|1024||
|http.text.analysis.max.lines|1000||
|http.text.lexer.string.pool.capacity|64||
|http.text.timestamp.adapter.pool.capacity|64||
|http.text.utf8.sink.size|4096||
|http.json.query.connection.check.frequency|1_000_000||
|http.json.query.float.scale|10||
|http.bind.to|0.0.0.0:9000||


|Property|Default value|Description|
|---|---|---|
|cairo.root|db||
|cairo.commit.mode|||
|cairo.create.as.select.retry.count|5||
|cairo.default.map.type|fast||
|cairo.default.symbol.cache.flag|false||
|cairo.default.symbol.capacity|256||
|cairo.file.operation.retry.count|30||
|cairo.idle.check.interval|5 * 60 * 1000L||
|cairo.inactive.reader.ttl|-10000||
|cairo.inactive.writer.ttl|-10000||
|cairo.index.value.block.size|256)||
|cairo.max.swap.file.count|30||
|cairo.mkdir.mode|509||
|cairo.parallel.index.threshold|100000||
|cairo.reader.pool.max.segments|5||
|cairo.spin.lock.timeout|1_000_000||
|cairo.cache.rows|16||
|cairo.cache.blocks|4||
|cairo.character.store.capacity|1024||
|cairo.character.store.sequence.pool.capacity|64||
|cairo.column.pool.capacity|4096||
|cairo.compact.map.load.factor|0.7||
|cairo.expression.pool.capacity|8192||
|cairo.fast.map.load.factor|0.5||
|cairo.sql.join.context.pool.capacity|64||
|cairo.lexer.pool.capacity|2048||
|cairo.sql.map.key.capacity|2048 * 1024||
|cairo.sql.map.page.size|4 * 1024 * 1024||
|cairo.model.pool.capacity|1024||
|cairo.sql.sort.key.page.size|4 * 1024 * 1024||
|cairo.sql.sort.light.value.page.size|1048576||
|cairo.sql.hash.join.value.page.size|16777216||
|cairo.sql.latest.by.row.count|1000||
|cairo.sql.hash.join.light.value.page.size|1048576||
|cairo.sql.sort.value.page.size|16777216||
|cairo.work.steal.timeout.nanos|10_000||
|cairo.parallel.indexing.enabled|true||
|cairo.sql.join.metadata.page.size|16384||
|cairo.sql.analytic.column.pool.capacity|64||
|cairo.sql.create.table.model.pool.capacity|16||
|cairo.sql.column.cast.model.pool.capacity|16||
|cairo.sql.rename.table.model.pool.capacity|16||
|cairo.sql.with.clause.model.pool.capacity|128||
|cairo.sql.insert.model.pool.capacity|64||
|cairo.sql.copy.model.pool.capacity|32||
|cairo.sql.copy.buffer.size|2 * 1024 * 1024||
|cairo.sql.copy.formats.file|/text_loader.json|);|
|cairo.date.locale|en||
|cairo.timestamp.locale|en||


|Property|Default value|Description|
|---|---|---|
|cairo.sql.copy.root|null||
|cairo.sql.backup.root|null||
|cairo.sql.backup.dir.datetime.format|null||
|cairo.sql.backup.dir.tmp.name|tmp||
|cairo.sql.backup.mkdir.mode|509||


|Property|Default value|Description|
|---|---|---|
|line.udp.bind.to|0.0.0.0:9009||
|line.udp.join|232.1.2.3||
|line.udp.commit.rate|1_000_000||
|line.udp.msg.buffer.size|2048||
|line.udp.msg.count|10_000||
|line.udp.receive.buffer.size|8 * 1024 * 1024||
|line.udp.enabled|true||
|line.udp.own.thread.affinity|-1||
|line.udp.own.thread|false||
|line.udp.unicast|false||
|line.udp.commit.mode|||
|line.udp.timestamp|n|available values are `n`, `u`, `ms`, `s`, `m`, `h`|