import fs from 'node:fs'

// read input
const input = fs.readFileSync('inputs/02.txt', 'utf8')
const inputRanges = input.split(',')

let sumOfInvalidIds = 0
let sumPart2 = 0

const isInvalid = (id) => {
	const l = id.length / 2
	// get first and second halves, compare
	const partA = id.substring(0, l)
	const partB = id.substring(l)
	// if they match, this id is invalid
	if (partA == partB) {
		sumOfInvalidIds += parseInt(id)
	}
}

const isInvalid2 = (id) => {
	const l = id.length

	// check every possible split of t
	for (let div = 2; div <= l; ++div) {
		// if length of t not divisible by div, then not a valid check
		if (l % div != 0) {
			continue
		}

		// split t into div parts of length l/div
		const partCount = div
		const partLength = l / div
		const parts = []
		for (let p = 0; p < partCount; ++p) {
			parts.push(
				id.substring(p * partLength, (p + 1) * partLength)
			)
		}

		// check all parts match or not
		let match = true
		for (let p = 1; p < partCount; ++p) {
			if (parts[0] != parts[p]) {
				match = false
				break
			}
		}

		if (match) return true
	}

	return false
}

// process each range of IDs
for (let range of inputRanges) {
	// get the beginning and end of the range out
	// trim the string to avoid the newline at the end
	const [begin, end] = range.trim().split('-')
	//console.log(`range: ${range.trim()}   begin: ${begin}   end: ${end}`)

	// check each id from the start to the end of the range
	for (let test = parseInt(begin); test <= parseInt(end); ++test) {
		const t = test.toString()
		if (isInvalid(t)) sumOfInvalidIds += test
		if (isInvalid2(t)) sumPart2 += test
	}
}

console.log(`Sum of invalid product IDs: ${sumOfInvalidIds}`)
console.log(`Sum for Part 2: ${sumPart2}`)
