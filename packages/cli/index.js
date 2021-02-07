#!/usr/bin/env node

'use strict'

const program = require('commander')
const { runGenerator, convertSvgToJs } = require('./lib')

// Used to get version number from package.json
require('pkginfo')(module, 'version')

program
	.name("svg-maps")
	.version(module.exports.version, '-v, --version')

// TODO: Allow to type name of map directly ('add [map]') to skip first prompting?
program.command('add')
	.description('Create a new map package with the same format as svg-maps')
	.action(runGenerator)

program.command('generate <file.svg> [file.js]')
	.description('Generate JS file from SVG file')
	.action(convertSvgToJs)

program.parse(process.argv)
