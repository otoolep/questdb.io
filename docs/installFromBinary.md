---
id: installFromBinary
title: Install from Binary
---

This section describes how to [setup](#setup) and [use](#using-questdb) QuestDB using the binaries.

## Requirements

- 64-bit MacOS, Windows or Linux.
- Oracle Java JRE or JDK 8 and above, or OpenJDK equivalent.
> OpenJDK may incur a performance penalty of up to 20% as it contains fewer intrinsics than the Oracle counterpart.

## Setup

#### Step 1 - Download & install JAVA
If you already have a suitable version JAVA installed, you can skip this step.
- Find the package corresponding to your architecture on the [Download page](https://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html).
- If you are installing on ARM, download the [ARM JDK](https://www.oracle.com/technetwork/java/javase/downloads/java-archive-javase8u211-later-5573849.html).

#### Step 2 - Download QuestDB

The QuestDB binaries and launch scripts can be found [here](https://github.com/questdb/questdb/releases/download/4.2.0/questdb-4.2.0-bin.tar.gz).
Simply extract the files in a directory of your choice. 


## Using QuestDB

QuestDB comes with an executable `questdb.exe` for Windows, and script `questdb.sh` for MacOS and Linux which can 
be used to control QuestDB. On Windows, the executable can be also used to start [QuestDB as a service](#use-as-a-service-windows).

### Start
Navigate to the directory containing `questdb.sh` (Linux, MacOS) or `questdb.exe` (Windows).

<!--DOCUSAURUS_CODE_TABS-->
<!--MacOS & Linux-->
```sql
./questdb.sh start
```
<!--Windows-->
```sql
questdb.exe start
```
<!--END_DOCUSAURUS_CODE_TABS-->

#### Behaviour

When running on Linux and MacOS, QuestDB will run in the background and continue running even if you close the session. 
On Windows, QuestDB will stop when you close the terminal window unless you [run as a service](#use-as-a-service-windows).

#### Default directories
By default, QuestDB root will be in the below directory
<!--DOCUSAURUS_CODE_TABS-->
<!--MacOS -->
```shell script
/usr/local/var/questdb/
```
<!--Linux -->
```shell script
$HOME/.questdb
```
<!--Windows-->

On windows, the default directory will be where `questdb.exe` is located.

<!--END_DOCUSAURUS_CODE_TABS-->


#### Start options
- `-d` - specify QuestDB's root directory. 
- `-f` - force reload the web console. The web console is cached otherwise and the HTML page will not be reloaded automatically in case it has been changed.
- `-j` - path to the Java SDK directory. By default QuestDB uses the value of the `JAVA_HOME` environment variable.

#### Examples

<!--DOCUSAURUS_CODE_TABS-->
<!-- -d MacOS & Linux-->
```sql
./questdb.sh start -d '/home/user/folder'
```
<!-- -d Windows-->
```sql
questdb.exe start -d 'C:\Users\user\folder'
```
<!-- -f -->
```sql
./questdb.sh start -f
```
<!-- -j -->
```sql
./questdb.sh start -j '/usr/java/jdk1.8.0_141'
```
<!-- -d -j -f -->
```sql
./questdb.sh start -d '/home/user/folder' -j '/usr/java/jdk1.8.0_141' -f
```
<!--END_DOCUSAURUS_CODE_TABS-->



### Stop
<!--DOCUSAURUS_CODE_TABS-->
<!--MacOS & Linux-->
```sql
./questdb.sh stop
```
<!--Windows-->

Simply press <kbd>Ctrl</kbd>+<kbd>C</kbd> in the `Shell` window or close it.

<!--END_DOCUSAURUS_CODE_TABS-->


### Use as a service (Windows)

You can start QuestDB as a service by either running `questdb.exe` as an Administrator or [using questdb.exe](#commands).

#### Default directory
When QuestDB is run as a service, the default home directory is `C:\Windows\System32\questdb`.


#### commands

|Command | Description |
|-----|------|
|`start`| Starts Windows service. Default service name is `QuestDB`  |
|`stop` | Stops Windows service |
| `status` | Shows service status. This command is useful for troubleshooting problems with the service. It prints `RUNNING` or `INACTIVE` if the service is start or stopped respectively |
| `install` | Install the Windows service |
| `remove` | Remove the Windows service |

#### Service start options
The options are the same as when [starting QuestDB normally](#start-options).

#### Using different service instances
If you want to run several instances of the service, you can control them individually using `-t`
- `-t` - service name suffix tag. This can be used with all [commands](#commands) and all [options](#start-options)

##### Examples

<!--DOCUSAURUS_CODE_TABS-->
<!--Start a service with a tag-->
```sql
questdb.exe start -t 'mytag' -d 'C:\Users\user\folder'
```
<!--Request status for a specific service tag-->
```sql
questdb.exe status -t 'mytag' 
```
<!--Stop a specific service tag-->
```sql
questdb.exe stop -t 'mytag' 
```
<!--END_DOCUSAURUS_CODE_TABS-->