# Contributing

If you want to contribute to this project, here is a quick guide:
1. Fork the repository
1. Develop your code changes
1. Commit your changes
1. Push to your fork
1. Submit a pull request

## Adding a new map

### SVG file
* Create a new folder `/packages/[new-map]/` and a new file `/packages/[new-map]/[new-map].svg` in kebab-case. For example: `/packages/new-zealand/new-zealand.svg`
* Use an appropriate title as `aria-label`. For example: `Map of New Zealand`
* Adjust the `viewBox` to have no empty space on each side (top, bottom, left, right)
* Use English `name`s
* Use semantic `id`s (shortnames or full names) in kebab-case. For example: `ny` for New York or `taipei-city` for Taipei City
* Use only `<svg>` and `<path>` tags (no doctype, external stylesheet, comment...). Other tags will be ignored

### JS file
* Generate the JS file with the `npm run build` command
* The `/packages/[new-map]/index.js` file should be generated. Otherwise it means the SVG file is not valid

### Documentation
* Create a new `/packages/[new-map]/README.md` file to:
  * list all the locations (states, counties...) alphabetically sorted
  * indicate the credits (source, license...)
  * describe your modifications
* Add the new map in the main `README.md` file:
  * using alphabetical order
  * linking to the package folder `/packages/[new-map]`

## Reporting a bug
[Open an issue](https://github.com/VictorCazanave/svg-maps/issues/new).
