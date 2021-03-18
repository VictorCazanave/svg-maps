const path = require('path')
const fs = require('fs');
const Generator = require('yeoman-generator');

const LICENSE_DATA = {
	Unlicense: {
		licenseBadge: 'https://img.shields.io/badge/license-Unlicense-blue.svg',
		licenseLink: 'http://unlicense.org/'
	},
	'CC BY 4.0': {
		licenseBadge: 'https://img.shields.io/badge/License-CC%20BY%204.0-blue.svg',
		licenseLink: 'https://creativecommons.org/licenses/by/4.0/)'
	},
	'CC BY-SA 4.0': {
		licenseBadge: 'https://img.shields.io/badge/License-CC%20BY--SA%204.0-blue.svg',
		licenseLink: 'https://creativecommons.org/licenses/by-sa/4.0/'
	},
	'CC BY-NC 4.0': {
		licenseBadge: 'https://img.shields.io/badge/License-CC%20BY--NC%204.0-blue.svg',
		licenseLink: 'https://creativecommons.org/licenses/by-nc/4.0/'
	},
}

module.exports = class extends Generator {
	async prompting() {
		this.answers = await this.prompt([
			{
				type: 'input',
				name: 'map',
				message: `Entre the map's name (e.g. 'USA', 'New Zealand', 'Taiwan, Main',...):`
			},
			{
				type: 'input',
				name: 'package',
				message: `Enter the package's name (e.g. usa, new-zealand, taiwan.main...):`,
				default: (answers) => {
					return answers.map.toLowerCase()
						.split(', ')
						.join('.')
						.split(' ')
						.join('-')
				}
			},
			{
				type: 'input',
				name: 'author',
				message: `Enter the author's name and email (e.g. James Bond <james.bond@sis.gov.uk>):`,
				default: () => {
					return `${this.user.git.name()} <${this.user.git.email()}>`
				}
			},
			{
				type: 'list',
				name: 'license',
				message: 'Choose the license:',
				choices: [...Object.keys(LICENSE_DATA), 'Other (to add manually)'],
			},
		]);
	}

	writing() {
		const packagePath = this.destinationPath(this.answers.package)
		const licenseData = LICENSE_DATA[this.answers.license] // Listed license
			|| { licenseBadge: 'LICENSE_SVG_BADGE', licenseLink: 'LICENSE_LINK' } // Other license

		// Create package folder
		fs.mkdirSync(packagePath)

		// Use absolute path of templates folder 
		// because default is ./templates/ and depends on working directory
		this.sourceRoot(path.join(__dirname, 'templates'))

		// Change destination root to copy templates in created package folder
		this.destinationRoot(packagePath)

		// Generate package.json
		this.fs.copyTpl(
			this.templatePath('package.json'),
			this.destinationPath('package.json'),
			{ ...this.answers },
		);

		// Generate SVG
		this.fs.copyTpl(
			this.templatePath('map.svg'),
			this.destinationPath('map.svg'),
			{ ...this.answers },
		);

		// Generate documentation
		this.fs.copyTpl(
			this.templatePath('README.md'),
			this.destinationPath('README.md'),
			{ ...this.answers, ...licenseData },
		);

		// Copy license if not Other
		if (LICENSE_DATA[this.answers.license]) {
			this.fs.copy(
				this.templatePath(`licenses/${this.answers.license}.md`),
				this.destinationPath('LICENSE.md'),
			);
		}
	}
};
