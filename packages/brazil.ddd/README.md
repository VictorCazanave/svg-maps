# 🇧🇷 Brazil Telephone Area Codes

[![npm version](https://badgen.net/npm/v/@svg-maps/brazil)](https://www.npmjs.com/package/@svg-maps/brazil)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-blue.svg)](https://creativecommons.org/licenses/by/4.0/)

Map of the 67 Brazilian DDD (telephone area code) regions in the `svg-maps` format. 
Each location uses its two-digit DDD code as the `id` and `DDD <code>` as the `aria-label`.

Further information about this map could be found at [Wikipedia](https://pt.wikipedia.org/wiki/Discagem_direta_a_dist%C3%A2ncia)


## Installation

### npm

`npm install --save @svg-maps/brazil.ddd`

## Credits

- Original DDD map by [João Vitor Bachini](https://commons.wikimedia.org/wiki/File:Mapa_do_Brasil_por_c%C3%B3digo_DDD.svg) (CC BY-SA 4.0)
- Community repository from [@pedrokkrause](https://github.com/pedrokkrause/Mapa-de-DDDs-do-Brasil/tree/main)


### Changes

* Remove unnecessary attributes
* Replace title by name attributes
* Add viewBox
* Rename ids
* Sort `<path/>` alphabetically