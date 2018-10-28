# opsdash-server

This is a CLI and wrapper for [opsdash](https://www.opsdash.com/). You can configure and maintain opsdash server 
instances via docker and docker compose.

## Prerequisites 

The following software must be installed

* [node](https://nodejs.org/en/download/)
* [npm](https://nodejs.org/en/download/)
* [docker](https://docs.docker.com/docker-for-mac/install/)
* [docker-compose](https://docs.docker.com/compose/install/) 

## Install 

You can install opsdash-server with the following command

```
npm i -g opsdash-server
```
  
## CLI

You can `configure`, `start` and `stop` as many opsdash server instances as you want. For each of these commands you may provide
an optional `name` parameter, to use a names opsdash server instance. If `name` is omitted then the default profile is used.

With the `list` command you can show all opsdash server profiles and their current status.

```
Usage: opsdash-server [options] [command]

Options:
  -V, --version     output the version number
  -h, --help        output usage information

Commands:
  start [name]      start the opsdash server
  stop [name]       stop the opsdash server
  configure [name]  configures the opsdash server
  list              lists all profiles
  help [cmd]        display help for [cmd]
```

## Related work

* [https://github.com/pdaether/opsdash-docker](https://github.com/pdaether/opsdash-docker)

## License

Copyright (c) 2018, appcom interactive GmbH

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
