# opsdash-server

Dies ist ein CLI und ein Wrapper für [OpsDash](https://www.opsdash.com/). Hiermit können OpsDash Server mittels Docker
und Docker Compose konfiguriert, gestartet und gestoppt werden.

## Voraussetzungen 

Folgende Software muss installiert sein

* [node](https://nodejs.org/en/download/)
* [npm](https://nodejs.org/en/download/)
* [Docker](https://docs.docker.com/docker-for-mac/install/)
* [Docker-Komposition](https://docs.docker.com/compose/install/) 

## Installieren 

opsdash-server kann mit folgendem Befehl installiert werden

    npm i -g opsdash-server
  
## CLI

Es können beliebig viele OpsDash Serverinstanzen konfiguriert, gestartet und gestoppt werden. Für jeden dieser Befehle 
kann ein optionaler Parameter `name` angegeben werden, um einen Namen für einen OpsDash Server anzugeben. Wenn `name` 
weggelassen wird, wird ein Standardname verwendet.

Mit dem Befehl `list` können alle OpsDash Serverinstanzen und deren aktuellen Status anzeigen.

    Verwendung: opsdash-server [options] [command]
    
    Optionen:
      -V, --version Ausgabe der Versionsnummer
      -h, --help, Nutzungsinformationen ausgeben
    
    Befehle:
      start [name]      startet den OpsDash server
      stop [name]       stoppt den OpsDash server
      configure [name]  konfiguriert den OpsDash server.
      list              listet alle Profile auf
      help [cmd]        Anzeige der Hilfe für[cmd]

## Verwandte Arbeiten

* [https://github.com/pdaether/opsdash-docker](https://github.com/pdaether/opsdash-docker)

## Lizenz

    ISC License

    Copyright (c) 2018, appcom interactive
    
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
