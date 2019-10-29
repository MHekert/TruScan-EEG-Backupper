# TruScan-EEG-Backupper

## What is it?

It is a script to automatically backup EEG examination results created by TruScan software.

## How it works?

It copies only newer examination files than in destination directory and only ones that weren't modiefied for more that 1 minute. Naming style is preserved and `id` is automaticly incremented so it won't colide with archival data. `R{id}.PESEL`.

Script takes two arguments source path and destination path. If omitted then `.env` file is checked for paths, if path is not specified in either location then path to current directory is used.

### Start commend

`node pathToProject [sourcePath [destinationPath]]`

### .env configuration

```
SOURCEPATH=/path/to/source
DESTINATIONPATH=/path/to/destination
```

### paths

In Windows paths need to be written using double backslashes `\\`

## Prerequisites

-   [installed node.js](https://nodejs.org/en/download/)
-   clone or download repository
-   install dependencies
    `npm install`
-   create `.env` file in project directory if necessary
