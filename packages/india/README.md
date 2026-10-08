# 🇮🇳 India

[![npm version](https://badgen.net/npm/v/@svg-maps/india)](https://www.npmjs.com/package/@svg-maps/india)
[![License: CC BY 2.5 India](https://img.shields.io/badge/License-CC%20BY%202.5%20India-blue.svg)](https://creativecommons.org/licenses/by/2.5/in/)

Contains all the states and union territories of India:
* Andaman and Nicobar Islands
* Andhra Pradesh
* Arunachal Pradesh
* Assam
* Bihar
* Chandigarh
* Chhattisgarh
* Dadra and Nagar Haveli and Daman and Diu
* Delhi
* Goa
* Gujarat
* Haryana
* Himachal Pradesh
* Jammu and Kashmir
* Jharkhand
* Karnataka
* Kerala
* Ladakh
* Lakshadweep
* Madhya Pradesh
* Maharashtra
* Manipur
* Meghalaya
* Mizoram
* Nagaland
* Odisha
* Puducherry
* Punjab
* Rajasthan
* Sikkim
* Tamil Nadu
* Telangana
* Tripura
* Uttar Pradesh
* Uttarakhand
* West Bengal

## Installation

### npm

`npm install --save @svg-maps/india`

## Credits

India boundaries by **DataMeet Community Maps Project**, made available under
[Creative Commons Attribution 2.5 India](https://creativecommons.org/licenses/by/2.5/in/).

The geometry is the [geoBoundaries gbOpen India ADM1 simplified dataset](https://github.com/wmgeolab/geoBoundaries/blob/9469f09/releaseData/gbOpen/IND/ADM1/geoBoundaries-IND-ADM1_simplified.geojson),
pinned to commit `9469f09`, which derives from DataMeet's state boundaries.
Both the [geoBoundaries metadata](https://www.geoboundaries.org/api/current/gbOpen/IND/ADM1/)
and [DataMeet's state dataset documentation](https://projects.datameet.org/maps/states/)
specify CC BY 2.5 India; this package retains that dataset-specific licence.
Credit also goes to the William & Mary geoLab / geoBoundaries team for processing
the source into consistent shared boundaries.

DataMeet [updated Jammu and Kashmir and Ladakh](https://github.com/datameet/maps/pull/70)
to the Survey of India map and subsequently removed a duplicate Ladakh feature.
This source contains 28 states and 8 union territories. It is a fixed modern map,
not a map of historical administrative boundaries.

### Changes

* Convert the WGS84 polygons to an equirectangular SVG with a standard parallel
  at 23 degrees north, and fit the `viewBox` to the geographic extent.
* Simplify shared boundaries together with topology-preserving coverage
  simplification (tolerance 0.2 SVG units), retaining all 452 polygon parts and
  18 holes in the published source. This tolerance is an algorithm parameter,
  not a maximum distance: measured boundary displacement is at most 1.34 SVG units.
* Preserve seven decimal places and validate the complete serialized geometry
  and shared-edge coverage.
* Add separate Jammu and Kashmir (`jk`) and Ladakh (`la`) paths.
* Represent the merged Dadra and Nagar Haveli and Daman and Diu territory as one
  multipart path, retaining `dn` and removing the former `dd` path.
* Preserve other existing location IDs and sort paths alphabetically by name.
* Regenerate `index.js` from `india.svg` with the repository's CLI.

### Migration

The `jk` path now represents Jammu and Kashmir without Ladakh. Consumers of
the former `dd` path should use `dn`, which now represents the merged territory.
The geometry source, projection, `viewBox`, and licence have changed. Applications
must not assume the previous path coordinates or use current territories for
historical data without handling boundary changes.

### Validation

From the repository root, run `node --test packages/india/test/india.test.mjs`.
The tests verify current territory coverage, stable IDs, separate Ladakh geometry,
finite coordinates inside the `viewBox`, and agreement between the SVG and JS map.
