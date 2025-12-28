import fs from 'node:fs'

const inputLines = fs.readFileSync('inputs/07.txt', 'utf8').split('\n')

const newRayArray = function() {
	let obj = {}
	for (let i = 0 ; i < inputLines[0].length; ++i) {
		obj[i] = 0
	}
	return obj
}

// keep track of the rays by their X positions on the row
let rays = newRayArray()
let countSplits = 0
let rayCount = 0
rays[inputLines[0].indexOf('S')] = 1
// keep track of each ray travelling through the manifold
for (let l = 1; l < inputLines.length - 1; ++l) {
	const line = inputLines[l]
	// check what happens to each ray
	const newRays = newRayArray()
	for (const col in rays) {
		const raysInCol = rays[col]
		// don't work on columns without rays
		if (raysInCol === 0) { continue }

		// find the char at the index the ray is travelling down
		const c = line[col]
		if (c === '.') {
			// . is empty space; continue travelling
			newRays[col] += raysInCol
		} else if (c === '^') {
			// ^ is a splitter; remove this ray and add two more to the sides
			countSplits++
			newRays[parseInt(col) - 1] += raysInCol
			newRays[parseInt(col) + 1] += raysInCol
		}
	}
	rays = newRays
}

console.log(`P1 Splits: ${countSplits}`)
rayCount += Object.values(rays).reduce((acc, cur) => acc + cur, 0)
console.log(`Ray count: ${rayCount}`)
