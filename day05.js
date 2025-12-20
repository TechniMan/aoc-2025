import fs from 'node:fs'

const input = fs.readFileSync('inputs/05.txt', 'utf8')
const inputLines = input.split('\n')

const ranges = []
const stockIds = []

// process input
for (let l = 0; l < inputLines.length; ++l) {
	// skip the empty eof line
	if (inputLines[l].length === 0) {
		continue
	}
	// treat as a range
	if (inputLines[l].indexOf('-') !== -1) {
		const [ begin, end ] = inputLines[l].split('-')
		ranges.push({ begin, end })
	}
	// treat as a stock id
	else {
		stockIds.push(parseInt(inputLines[l]))
	}
}

// check whether each id is within a range
let sumFresh = 0
for (let id of stockIds) {
	let fresh = false
	for (let range of ranges) {
		if (range.begin <= id && id <= range.end) {
			fresh = true
			break
		}
	}
	sumFresh += fresh
}

console.log(`Fresh stock: ${sumFresh}`)
