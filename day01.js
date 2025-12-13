import fs from 'node:fs'

// read input
const fdata = fs.readFileSync('inputs/01.txt', 'utf8')
const inputLines = fdata.split('\n')

// init - dial starts at 50
let dialPosition = 50
let endOnZeroesCount = 0
let duringZeroesCount = 0

for (let line of inputLines) {
	// avoid the empty line at the end of the file
	if (!line) continue

	// extract the info we need
	let dir = line[0]
	let rotateAmount = parseInt(line.substring(1))

	// turn the dial one click at a time
	function rotateLeft(amount) {
		while (amount > 0) {
			amount--
			dialPosition--
			// check if we click zero
			if (dialPosition === 0) {
				duringZeroesCount++
			} else if (dialPosition === -1) {
				dialPosition = 99
			}
		}
	}
	function rotateRight(amount) {
		while (amount > 0) {
			amount--
			dialPosition++
			// check if we click zero
			if (dialPosition === 100) {
				duringZeroesCount++
				dialPosition = 0
			}
		}
	}

	// begin rotating the dial
	if (dir === 'R') rotateRight(rotateAmount)
	else rotateLeft(rotateAmount)

	// check if we landed on zero
	if (dialPosition === 0) endOnZeroesCount++
}

// answers!
console.log(`Times dial ended on zero: ${endOnZeroesCount}`)
console.log(`Times dial passed zero: ${duringZeroesCount}`)
