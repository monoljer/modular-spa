# Modular SPA with typescript and esbuild

## Introducion

Example typescript implementation of modular SPA. All modules are independent and can be build separately and deployed to static serving web server (e.g. nginx). For quick preview express is used and live watch Live Server.

## Usage

Install dependencies
> `pnpm install`

Build for staging
> `pnpm run build-all`

Run express serving from .stage folder (Also used as nginx static)
> `pnpm run stage`

Run live server with watching
> `pnpm run live`

## Dependecies

* Typescript
* ESBuild
* Express
* Live Server


## Licence

Whatever you want it to be.




