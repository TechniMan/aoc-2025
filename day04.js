import fs from 'node:fs'

const input = fs.readFileSync('inputs/04.txt', 'utf8')
const rows = input.split('\n')
rows.pop() // remove the final line, as it's empty
const colLength = rows.length
const rowLength = rows[0].length
const grid = rows.map(r => r.split(''))

function adjacentRollsAt(x, y) {
	let count = 0
	// check col to the left
	if (x !== 0) {
		// row above
		if (y !== 0) {
			count += grid[y - 1][x - 1] === '@'
		}
		// this row
		count += grid[y][x - 1] === '@'
		// row below
		if (y !== colLength - 1) {
			count += grid[y + 1][x - 1] === '@'
		}
	}

	// check this col
	// row above
	if (y !== 0) {
		count += grid[y - 1][x] === '@'
	}
	// row below
	if (y !== colLength - 1) {
		count += grid[y + 1][x] === '@'
	}

	// check col to the right
	if (x !== rowLength - 1) {
		// check row above
		if (y !== 0) {
			count += grid[y - 1][x + 1] === '@'
		}
		// check this row
		count += grid[y][x + 1] === '@'
		// check row below
		if (y !== colLength - 1) {
			count += grid[y + 1][x + 1] === '@'
		}
	}

	return count
}

let part1 = 0
for (let y = 0; y < colLength; ++y) {
let logLine = ''
for (let x = 0; x < rowLength; ++x) {
	// skip empty spaces
	if (grid[y][x] === '.') {
		logLine += '.'
		continue
	}

	const adjacentRolls = adjacentRollsAt(x, y)
	if (adjacentRolls < 4) {
		logLine += 'x'
		part1++
	} else {
		logLine += '@'
	}
}
//console.log(logLine)
}

console.log(`Part 1: ${part1}`)
