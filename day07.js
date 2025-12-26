import fs from 'node:fs'

const inputLines = fs.readFileSync('inputs/07.txt', 'utf8').split('\n')

// keep track of the rays by their X positions on the row
let rays = []
let countSplits = 0
rays.push(inputLines[0].indexOf('S'))
// keep track of each ray travelling through the manifold
for (let l = 1; l < inputLines.length - 1; ++l) {
	const line = inputLines[l]
	// check what happens to each ray
	const newRays = []
	for (const r of rays) {
		// find the char at the index the ray is travelling down
		const c = line[r]
		if (c === '.') {
			// . is empty space; continue travelling
			if (newRays.indexOf(r) === -1) newRays.push(r)
		} else if (c === '^') {
			// ^ is a splitter; remove this ray and add two more to the sides
			countSplits++
			if (newRays.indexOf(r - 1) === -1) newRays.push(r - 1)
			if (newRays.indexOf(r + 1) === -1) newRays.push(r + 1)
		}
	}
	rays = newRays
}

console.log(`Total splits: ${countSplits}`)
