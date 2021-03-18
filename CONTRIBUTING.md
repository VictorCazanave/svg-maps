# Contributing

_First thank you for willing to contribute to this project!_

- [Contributing](#contributing)
	- [Adding a map to this repository](#adding-a-map-to-this-repository)
		- [Quick guide](#quick-guide)
		- [With CLI tool](#with-cli-tool)
		- [Manually](#manually)
			- [SVG file](#svg-file)
			- [Package file](#package-file)
			- [JS file](#js-file)
			- [Documentation](#documentation)
	- [Adding a map from an external respository](#adding-a-map-from-an-external-respository)
		- [Quick guide](#quick-guide-1)
		- [Creation](#creation)
		- [Linking](#linking)
	- [Tips to choose a map](#tips-to-choose-a-map)
	- [Reporting a bug](#reporting-a-bug)


## Adding a map to this repository

### Quick guide

1. Fork this repository
2. Create a new package for your map
3. Commit your changes
4. Push to your fork
5. Submit a pull request

### With CLI tool

* Install the CLI tool: `npm run install`
* Run the command to create a new map: `npm run add`
* Answer the questions to configure your map
* Complete the generated files with the data of your map 

### Manually

#### SVG file

* Create a new folder `/packages/[new-map]/` and a new file `/packages/[new-map]/[new-map].svg` in kebab-case. _For example: `/packages/new-zealand/new-zealand.svg`_
* Use tab indentation
* Use only `<svg>` and `<path>` tags (no doctype, external stylesheet, comment...). __Other tags will be ignored__
* On the `<svg>` tag:
  * Set the `xmlns="http://www.w3.org/2000/svg"` namespace declaration
  * Adjust the `viewBox` attribute to remove any empty space on each side of the map (top, bottom, left, right)
  * Set an appropriate `aria-label` attribute `Map of [New Map]`. _For example: `Map of New Zealand`_
  * Do __NOT__ use any other attribute than `xmlns`, `viewBox` and `aria-label`
* On the `<path>` tags:
  * Set semantic `id` attributes (short or full names) in kebab-case. _For example: `ny` for New York or `taipei-city` for Taipei City_
  * Set English `name` attributes
  * Do __NOT__ use any other attribute than `id`, `name` and `d`

Here is a simplified example of `new-zealand.svg`:
```html
<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 703 989"
	aria-label="Map of New Zealand"
> 
	<path
		id="auk"
		name="Auckland"
		d="..."
	/>
	...
	<path
		id="wtc"
		name="West Coast"
		d="..."
	/>
</svg>
```

#### Package file

* Create a new `/packages/[new-map]/package.json` file to describe the npm package to publish:
```json
{
	"name": "@svg-maps/[new-map]",
	"version": "1.0.0",
	"description": "Map of [New Map]",
	"main": "index.js",
	"repository": {
		"type": "git",
		"url": "https://github.com/VictorCazanave/svg-maps/tree/master/packages/[new-map]"
	},
	"keywords": [
		"svg",
		"map",
		"[new-map]"
	],
	"author": "[Your Name] <[your email]>",
	"publishConfig": {
		"access": "public"
	},
	"license": "[License of the map]"
}
```

#### JS file

* Install the CLI tool: `npm run install`
* Generate the JS file: `npm run generate [new-map.svg] index.js`
* The `/packages/[new-map]/index.js` file should be generated. Otherwise it means the SVG file is not valid

#### Documentation

* Add a `/packages/[new-map]/LICENSE.md` file with the license of the map ([Creative Commons Markdown](https://github.com/idleberg/Creative-Commons-Markdown))

* Create a new `/packages/[new-map]/README.md` file to:
  * indicate the license of the map with a [badge](https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba)
  * list all the locations (states, counties...) alphabetically sorted and using the same names as in the SVG file
  * indicate the credits (source, license of the original map...)
  * describe your modifications

* Add the new map in the main `README.md` file:
  * using alphabetical order
  * linking to the package folder `/packages/[new-map]`

## Adding a map from an external respository

### Quick guide

1. Create a map in your repository
2. Publish the map to [npm](https://www.npmjs.com)
3. Fork this repository
4. Add a link to your map in the documentation
6. Push to your fork
7. Submit a pull request

### Creation

You're free to create the map as you want, but using the [CLI tool](https://www.npmjs.com/package/@svg-maps/cli) is recommended.

### Linking

Update the [`README`](README.md) to add a link to the npm package of your map with an _external_ tag: `[YourMap (external)](https://www.npmjs.com/package/your-map)`)

## Tips to choose a map

* Find a simple map with compatible SVG code
* Pay attention to the license
* Give credits and information about the original map

## Reporting a bug

If you see any incorrect or incomplete data, please [open an issue](https://github.com/VictorCazanave/svg-maps/issues/new).
