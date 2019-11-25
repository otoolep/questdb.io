---
id: installrun
title: Install & run
sidebar_label: Install & run
---

You can use QuestDB:
- With Docker
- With the binaries
- As a dependency 


## Docker

QuestDB is available to run via **Docker**. You can find our 
docker repository **[here](https://hub.docker.com/r/questdb/questdb)**.

### Supported platforms

We support the following platforms as Docker containers:
- Linux
- Linux ARM64
- Windows

### Pulling the image
The following will pull the latest image from the Docker repository
```shell script
docker pull questdb/questdb
```

If you prefer, you can pull a specific tag. For example
```shell script
docker pull questdb/questdb:4.0.1
```

### Using the image
You can use the Docker image in two ways:
- Create a container and then start it.
- Run as an interactive sandbox.

The interactive sandbox will create a container on the fly and start it. Once stopped, the container will be 
removed and the data deleted. 

#### Ports & security

QuestDB will open two ports through the following arguments.
If you do not want to open either of these ports, simply remove the 
argument. However doing so may limit your interaction with QuestDB.

- `-p 9000:9000` opens port 9000 for the HTTP API and the web console. The web console is available on localhost:9000.
- `-p 8892:8892` opens port 8892 for the PostgreSQL wire protocol.

#### Running as a container

#### Create a container

```shell script
docker create --name questdb -p9000:9000 -p 8892:8892 questdb/questdb
```

> You can set any name you like for the container name. This name will be used when you start/stop the container.

If you would like to use a specific release tag, you can specify as follows when creating the container:

```shell script
docker create --name questdb -p9000:9000 -p 8892:8892 questdb/questdb:4.0.0
```

Available options:

<table class="alt">
<thead>

<th>Option</th>
<th>Comments</th>

</thead>
<tbody>
<tr>
<td><code>--name</code></td>
<td>Name of your container. e.g <code>--name questdb</code></td>
</tr>
<tr>
<td><code>-p</code> (optional)</td>
<td>Allows Docker to expose a port. e.g <code>`-p 9000:9000`</code> will expose port 9000.
Though the parameter is optional, not opening the ports will limit interactions with the database.</td>
</tr>
<tr>
<td><code>-v</code> (optional)</td>
<td>Specify a path where QuestDB will save your data directly on the host machine. e.g <code>-v /local/dir:/root/.questdb/db</code></td>
</tr>
</tbody>
</table>

#### Start the container
```shell script
docker start questdb
```

#### Stop the container
```shell script
docker stop questdb
```

#### Display logs
```shell script
docker logs questdb
```

#### Remove a container
```shell script
docker rm questdb
```

#### Run as an interactive sandbox

You can run the container as an interactive sandbox. You do not need to create the
container beforehand: it will be created on the fly. Logs will be displayed 
in the shell window.

Simply run:
```shell script
docker run --rm -it -p 9000:9000 -p 8892:8892 questdb/questdb
```

As the process will be running in shell, you can `CTRL + C` to stop it.

> When running as an interactive sandbox, the Container and all the data will be removed when
>the container stops. 

#### Log into the container

You can log into the container and interact using `cmd` (if your container is windows-based) or `bash` 
(if your container is linux-based). If you are using a MacOS or linux machine, this will be `bash`. If you
are using a Windows machine, it could be either `cmd` or `bash` depending on what type of container you
are running.

**On Linux containers**
```shell script
docker exec -i questdb bash
```

**On Windows containers**
```shell script
docker exec -i questdb cmd
```

Once logged in, you can run commands into the container's VM.

#### Volumes

QuestDB supports the following volumes:

**On Linux containers**
`/root/.questdb/db` 
 
**On Windows containers**
`c:\questdb\db` 

> You can mount host directories using -v option, e.g.
>`-v /local/dir:/root/.questdb/db`



## Installing binaries

### Supported Platforms
We support the following platforms:

* Mac OS X 64-bit
* Windows 64-bit
* Linux 64-bit

We support 64-bit JAVA 8 SDK and JRE

We recommend to have Java installed and `JAVA_HOME` environment variable setup. 
Both Windows and Linux wrappers for QuestDB will require `JAVA_HOME`. OSX wrapper 
will figure out Java location automatically.

### Downloading JAVA
> QuestDB requires JAVA You can download it **[here](https://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html)**
>. If you are installing on ARM, download the ARM versions **[here](https://www.oracle.com/technetwork/java/javase/downloads/java-archive-javase8u211-later-5573849.html)**

### Downloading QuestDB

> You can download QuestDB binaries and launch scripts **[here](https://github.com/questdb/questdb/releases/download/4.0.1/questdb-4.0.1-bin.tar.gz)**

### Installing
Simply extract the files in a directory of your choice. Then to run:
- On Windows, launch `questdb.exe`
- On Linux & MacOS, launch `questdb.sh`

## Running on Windows
QuestDB can either be run as a program or as a service. You can start it out of the box with default
configuration, or customise parameters as you start.

### Start

Launch a new `cmd.exe` windowa and navigate to where to where you extracted tar.gz :

```shell script
C:\cd questdb-1.0.2

C:\questdb-1.0.2>dir
Volume in drive C has no label.
Volume Serial Number is 9CD8-DB1D

Directory of C:\questdb-1.0.2

26/10/2016  19:33    &lt;DIR&gt;          .
26/10/2016  19:33    &lt;DIR&gt;          ..
02/08/2016  22:04            35,179 LICENSE.txt
26/10/2016  19:33    &lt;DIR&gt;          qdbroot
26/10/2016  13:32            75,322 questdb.exe
26/10/2016  16:10         3,107,733 questdb.jar
19/10/2016  20:44             5,206 questdb.sh
              4 File(s)      3,223,440 bytes
              3 Dir(s)  796,188,151,808 bytes free
</pre>

Then run the launcher as follows
<pre class="term">
C:\questdb-1.0.2&gt;questdb.exe
```


Response:
```shell script
<pre class="term">
QuestDB HTTP Server 1.0.2
Listening on 0.0.0.0:9000 [HTTP plain]
```



### Start (as a service)
Simply run `questdb.exe` as Administrator.
>When QuestDB is run as a service, the default home directory is `C:\Windows\System32\questdb`


### Stop


Simply press <kbd>Ctrl</kbd>+<kbd>C</kbd> in `cmd` window.

When run from console QuestDB server home is `qdbroot` in current directory.

## Running on MacOS

### Start

```shell script
mbp:~ user$ questdb start
```
>

Response:
```shell script
QuestDB HTTP Server 1.0
Listening on 0.0.0.0:9000 [HTTP plain]
```


### Stop
```shell script
mpb:~ user$ questdb stop
```

Response:
```shell script
Stopped 82395
```



### Start with a different home directory:
```shell script
mbp:~ user$ questdb start -d $HOME/.questdb
```

Response:
```shell script
QuestDB HTTP Server 1.0
Listening on 0.0.0.0:9000 [HTTP plain]
```



## Running on Linux
> Make sure JAVA_HOME environment variable is exported and points at a valid Java8 directory

> When running on Linux, QuestDB will run in the background and continue running even if you close the session.

By default QuestDB home directory will be $HOME/.questdb. You can change this location with `-d` command line switch.

### Start
The launch script is `questdb.sh`. The questdb.exe is a part of multi-platform package, you can ignore or delete it.
Start QuestDB as follows:

```shell script
user@ubuntu:~$ cd questdb-1.0.2/
user@ubuntu:~/questdb-1.0.2$ ./questdb.sh start
```

Response:
```shell script
Listening on 0.0.0.0:9000 [HTTP plain]
```


### Stop
Response:
```shell script
user@ubuntu:~/questdb-1.0.2$ ./questdb.sh stop
```

Response:
```shell script
Stopped 4631
```


### Launch Options

Windows launches supports the following commands and options:


```shell script
<em>Usage: C:\questdb-1.0.2\questdb.exe 
[start|stop|status|install|remove] [-d dir] [-f] [-j JAVA_HOME] [-t tag]</em>
```



<table class="alt">
<thead>

<th>Command</th>
<th>Comments</th>

</thead>
<tbody>
<tr>
<td><code>start</code></td>
<td>Starts windows service. Default service name is <code>QuestDB</code></td>
</tr>
<tr>
<td><code>stop</code></td>
<td>Stops windows service</td>
</tr>
<tr>
<td><code>status</code></td>
<td>Shows service status. This command is useful for troubleshooting service problems. It prints RUNNING or
INACTIVE if service is started or stopped respectively.</td>
</tr>
<tr>
<td><code>install</code></td>
<td>Installs windows service. Default name is <code>QuestDB</code>. Windows service names have to be unique. If
you would like to run multiple instances of QuestDB you have to use <code>-t</code> option.</td>
</tr>
<tr>
<td><code>remove</code></td>
<td>Removes windows service</td>
</tr>
</tbody>
</table>


<table class="alt">
<thead>

<th>Option</th>
<th>Comments</th>

</thead>
<tbody>
<tr>
<td><code>-j</code></td>
<td>Path to Java SDK directory. By default QuestDB uses value of JAVA_HOME environment variable.</td>
</tr>
<tr>
<td><code>-d</code></td>
<td>Path to QuestDB home directory</td>
</tr>
<tr>
<td><code>-t</code></td>
<td>Service name suffix tag. <code>-t X</code> will create <code>QuestDB:X</code> service name. This option
can be used with all commands.</td>
</tr>
</tbody>
</table>


## Use as a dependency

To use QuestDB as embedded database with your JVM based language simply add the following dependency:

<!--DOCUSAURUS_CODE_TABS-->
<!--gradle-->
```shell script
    implementation 'org.questdb:core:4.0.1'
```
<!--maven-->
```xml
    <dependency>
        <groupId>org.questdb</groupId>
        <artifactId>core</artifactId>
        <version>4.0.1</version>
    </dependency>
```
<!--END_DOCUSAURUS_CODE_TABS-->