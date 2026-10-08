import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const source = await readFile(new URL('index.js', root), 'utf8');
const { default: map } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const svg = await readFile(new URL('india.svg', root), 'utf8');
const names = [
	'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam',
	'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu',
	'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir',
	'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh',
	'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry',
	'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
	'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];
const byId = new Map(map.locations.map(location => [location.id, location]));

test('contains the 28 current states and eight current union territories exactly once', () => {
	assert.equal(map.locations.length, 36);
	assert.deepEqual(map.locations.map(location => location.name).sort(), names);
	assert.equal(byId.size, 36);
	assert.ok(map.locations.every(location => /^[a-z][a-z0-9-]*$/.test(location.id)));
});

test('exposes distinct Jammu and Kashmir and Ladakh, and the merged western UT', () => {
	assert.equal(byId.get('jk').name, 'Jammu and Kashmir');
	assert.equal(byId.get('la').name, 'Ladakh');
	assert.notEqual(byId.get('jk').path, byId.get('la').path);
	assert.equal(byId.get('dn').name, 'Dadra and Nagar Haveli and Daman and Diu');
	assert.equal(byId.has('dd'), false);
	for (const id of ['an', 'ap', 'ar', 'as', 'br', 'ch', 'ct', 'dl', 'ga', 'gj', 'hr',
		'hp', 'jh', 'ka', 'kl', 'ld', 'mp', 'mh', 'mn', 'ml', 'mz', 'nl', 'or', 'py',
		'pb', 'rj', 'sk', 'tn', 'tg', 'tr', 'up', 'ut', 'wb']) assert.ok(byId.has(id), id);
});

test('all converted polygons are closed and lie within the declared viewBox', () => {
	const [x, y, width, height] = map.viewBox.split(/\s+/).map(Number);
	assert.ok([x, y, width, height].every(Number.isFinite));
	assert.ok(width > 0 && height > 0);
	for (const location of map.locations) {
		assert.ok(location.path.length > 0, location.name);
		assert.equal((location.path.match(/M/g) || []).length, (location.path.match(/Z/g) || []).length);
		const coordinates = [...location.path.matchAll(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g)]
			.map(match => [Number(match[1]), Number(match[2])]);
		assert.ok(coordinates.length >= 4, location.name);
		for (const [px, py] of coordinates) {
			assert.ok(Number.isFinite(px) && Number.isFinite(py), location.name);
			assert.ok(px >= x - 0.01 && px <= x + width + 0.01, location.name);
			assert.ok(py >= y - 0.01 && py <= y + height + 0.01, location.name);
		}
	}
});

test('generated JavaScript retains the same labels, IDs and paths as the SVG', () => {
	assert.equal(map.label, 'Map of India');
	assert.ok(svg.includes(`viewBox="${map.viewBox}"`));
	const paths = [...svg.matchAll(/<path\s+id="([^"]+)"\s+aria-label="([^"]+)"\s+d="([^"]+)"\s*\/>/g)]
		.map(match => ({ id: match[1], name: match[2], path: match[3] }));
	assert.deepEqual(paths, map.locations);
});

test('retains the published islands and interior rings without collapsed paths', () => {
	let totalRings = 0;
	for (const location of map.locations) {
		for (const match of location.path.matchAll(/M([^Z]+)Z/g)) {
			const points = [...match[1].matchAll(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g)]
				.map(coordinate => [Number(coordinate[1]), Number(coordinate[2])]);
			assert.ok(points.length >= 4, location.name);
			assert.deepEqual(points[0], points.at(-1), location.name);
			const [x0, y0] = points[0];
			let twiceArea = 0;
			for (let i = 1; i < points.length; i++) {
				const [x, y] = points[i - 1];
				const [nextX, nextY] = points[i];
				twiceArea += (x - x0) * (nextY - y0) - (nextX - x0) * (y - y0);
			}
			assert.ok(Math.abs(twiceArea) > 0, `${location.name}: collapsed ring`);
			totalRings++;
		}
	}
	assert.equal(totalRings, 470);
	assert.equal((byId.get('dn').path.match(/M/g) || []).length, 3);
	assert.ok((byId.get('an').path.match(/M/g) || []).length > 100);
	assert.ok((byId.get('ld').path.match(/M/g) || []).length > 10);
});
