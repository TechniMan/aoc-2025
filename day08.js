import fs from 'node:fs'

class JunctionBox {
	constructor(x, y, z) {
		this.x = x
		this.y = y
		this.z = z
	}

	distanceTo(other) {
		return Math.sqrt(
			Math.pow(this.x - other.x, 2) +
			Math.pow(this.y - other.y, 2) +
			Math.pow(this.z - other.z, 2)
		)
	}
}

const inputLines = fs.readFileSync('inputs/08.txt', 'utf8').split('\n')
const boxes = []
let circuits = []

// read in all the positions and set up the boxes
for (const line of inputLines) {
	// skip empty line at the end
	if (line.length === 0) continue

	const [x, y, z] = line.split(',')
	boxes.push(new JunctionBox(parseInt(x), parseInt(y), parseInt(z)))
}

const boxCount = boxes.length
// calculate distances for all boxes
let distances = []
for (let aIdx = 0; aIdx < boxCount - 1; ++aIdx) {
	// find distance to each box after this one, to avoid duplicate distances
	// since a-to-b and b-to-a are the same
	for (let bIdx = aIdx + 1; bIdx < boxCount; ++bIdx) {
		distances.push({
			aIdx,
			bIdx,
			distance: boxes[aIdx].distanceTo(boxes[bIdx])
		})
	}
}

// link up the closest 10/1000 distances
// first, sort by distance ascending
distances.sort((a, b) => a.distance - b.distance)
let lastDistance = null
function linkClosestBoxes() {
	// check if either are already in any circuits
	const distance = distances[0]
	lastDistance = distance
	const aCircuitIdx = circuits.findIndex(c => c.indices.includes(distance.aIdx))
	const bCircuitIdx = circuits.findIndex(c => c.indices.includes(distance.bIdx))
	// if neither are in a circuit already, start a new one
	if (aCircuitIdx === -1 && bCircuitIdx === -1) {
		const newCircuit = {
			indices: [
				distance.aIdx,
				distance.bIdx
			],
			count: 2
		}
		circuits.push(newCircuit)
	}
	// if a is already in one but not b, then add b to a's circuit
	else if (aCircuitIdx !== -1 && bCircuitIdx === -1) {
		circuits[aCircuitIdx].indices.push(distance.bIdx)
		circuits[aCircuitIdx].count++
	}
	// likewise if b is and a isn't, then add a to b's circuit
	else if (aCircuitIdx === -1 && bCircuitIdx !== -1) {
		circuits[bCircuitIdx].indices.push(distance.aIdx)
		circuits[bCircuitIdx].count++
	}
	// else if and b are in the same circuit, then do nothing
	else if (aCircuitIdx === bCircuitIdx) {
		// pass
	}
	// finally, if a and b are in different circuits, merge them
	else { // (aCircuitIdx !== bCircuitIdx)
		const aCircuit = circuits[aCircuitIdx]
		const bCircuit = circuits[bCircuitIdx]
		const newCircuit = {
			indices: aCircuit.indices.concat(bCircuit.indices),
			count: aCircuit.count + bCircuit.count
		}
		// filter out the old a and b by index
		circuits = circuits.filter((el, idx) => idx !== aCircuitIdx && idx != bCircuitIdx)
		circuits.push(newCircuit)
	}
}

const links = 1000
for (let d = 0; d < links; ++d) {
	linkClosestBoxes()
	distances = distances.slice(1)
}

// sort circuits array so longest is first
circuits.sort((a, b) => b.count - a.count)
// multiply sizes of 3 largest circuits
const answerPart1 = circuits[0].count * circuits[1].count * circuits[2].count
console.log(answerPart1)

while (circuits.length > 1 || circuits[0].count < boxes.length) {
	linkClosestBoxes()
	distances = distances.slice(1)
}

const answerPart2 = boxes[lastDistance.aIdx].x * boxes[lastDistance.bIdx].x
console.log(answerPart2)
