import fs from 'node:fs'

const fdata = fs.readFileSync('inputs/01.txt', 'utf8')
const inputLines = fdata.split('\n')

let dialPosition = 50
let zeroesCount = 0

for (let line of inputLines) {
	if (!line) continue
	let dir = line[0]
	let amount = parseInt(line.substring(1))

	if (dir === 'R') {
		dialPosition += amount
		while (dialPosition > 99) {
			dialPosition -= 100
		}
	} else {
		dialPosition -= amount
		while (dialPosition < 0) {
			dialPosition += 100
		}
	}

	if (dialPosition === 0) {
		zeroesCount++
	}
	// console.log(`line: ${line} dialPosition after: ${dialPosition}`)
}

console.log(`Times dial landed on zero: ${zeroesCount}`)
