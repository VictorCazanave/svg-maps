# Contributing

If you want to contribute to this project, here is a quick guide:
1. Fork the repository
2. Develop your code changes
3. Commit your changes
4. Push to your fork
5. Submit a pull request

## Adding a new map

### SVG file
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

### Package file
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

### JS file
* Generate the JS file running the `npm run build` command
* The `/packages/[new-map]/index.js` file should be generated. Otherwise it means the SVG file is not valid

### Documentation
* Add a `/packages/[new-map]/LICENSE.md` file with the license of the map ([Creative Commons Markdown](https://github.com/idleberg/Creative-Commons-Markdown))

* Create a new `/packages/[new-map]/README.md` file to:
  * indicate the license of the map with a [badge](https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba)
  * list all the locations (states, counties...) alphabetically sorted and using the same names as in the SVG file
  * indicate the credits (source, license of the original map...)
  * describe your modifications

* Add the new map in the main `README.md` file:
  * using alphabetical order
  * linking to the package folder `/packages/[new-map]`

## Reporting a bug
[Open an issue](https://github.com/VictorCazanave/svg-maps/issues/new).
