'use strict'

const path = require('path')
const fs = require('fs')
const yeoman = require('yeoman-environment');
const svgson = require('svgson')
const GeneratorMap = require('../generator-map')

module.exports = {
	/**
	 * Run Yeoman generator to create a new map package
	 * 
	 * @returns {undefined}
	 */
	runGenerator() {
		const env = yeoman.createEnv();

		env.registerStub(GeneratorMap, 'map');
		env.run('map');
	},

	/**
	 * Convert SVG file to JS file
	 *
	 * @param {string} svgFile - Path of SVG file
	 * @param {string} [jsFile] - Path of JS file
	 * @returns {undefined}
	 */
	convertSvgToJs(svgFile, jsFile) {
		if (!jsFile) {
			const basename = path.basename(svgFile, path.extname(svgFile))
			jsFile = jsFile || path.join(process.cwd(), `${basename}.js`)
		}

		if (fs.existsSync(jsFile)) {
			console.error(`File ${jsFile} already exists`)
			return
		}

		fs.readFile(svgFile, 'utf8', (err, data) => {
			if (err) {
				console.error(`Unable to read file ${svgFile}`, err)
				return
			}

			console.log(`Parsing file ${svgFile}`)
			svgson.parse(data)
				.then(json => {
					const obj = {
						label: json.attributes['aria-label'],
						viewBox: json.attributes.viewBox,
						locations: json.children
							.filter(child => {
								if (child.name !== 'path') {
									console.warn(`<${child.name}> tag will be ignored`)
									return false
								}

								return true
							})
							.map(child => ({
								name: child.attributes.name,
								id: child.attributes.id,
								path: child.attributes.d,
							}))
					}
					const js = `export default ${JSON.stringify(obj)}`

					console.log(`Writing file ${jsFile}`)
					fs.writeFile(jsFile, js, 'utf8', err => {
						if (err) {
							console.error(`Unable to write file ${jsFile}`, err)
							return
						}
					})
				}).catch(err => {
					console.error(`Unable ton parse file ${svgFile}`, err)
				})
		})
	}
}
