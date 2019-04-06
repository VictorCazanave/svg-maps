# Contributing

If you want to contribute to this project, here's a quick guide:
1. Fork the repository
1. Develop your code changes
1. Commit your changes
1. Push to your fork
1. Submit a pull request

## Adding a new map

### Map file
* Create a new folder `/[country]/` (if necessary) and a new file `/[country]/[country].svg` in kebab-case. For example: `/new-zealand/new-zealand.svg`
* Use an appropriate title as `aria-label`. For example: `Map of [Country]`
* Adjust the `viewBox` to have no empty space on each side (top, bottom, left, right)
* Use English `name`s by default in `[country].svg`
* Create a specific `[country].[lang].svg` file to use another language. For example: `taiwan.zh.svg`, `france.fr.svg`...
* Use semantic `id`s (shortnames or full names in kebab-case). For example: `ny` for New York, `taipei-city` for Taipei City...
* Import and export the map in `/index.js`

### Documentation
* Create or update the `README.md` in the `/[country]/` folder to list all the locations (states, counties...) alphabetically sorted, write the credits (source, license...) and your modifications.

## Reporting a bug
[Open an issue](https://github.com/VictorCazanave/svg-maps/issues/new).
