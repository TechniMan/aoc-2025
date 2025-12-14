import fs from 'node:fs'

// read input
const input = fs.readFileSync('inputs/02.txt', 'utf8')
const inputRanges = input.split(',')

let sumOfInvalidIds = 0

// process each range of IDs
for (let range of inputRanges) {
	// get the beginning and end of the range out
	// trim the string to avoid the newline at the end
	const [begin, end] = range.trim().split('-')
	//console.log(`range: ${range.trim()}   begin: ${begin}   end: ${end}`)

	// check each id from the start to the end of the range
	for (let test = parseInt(begin); test <= parseInt(end); ++test) {
		test = test.toString()
		const l = test.length
		// if test is an odd length, it can't be made of two matching patterns
		if (l % 2 != 0) {
			// so skip it
			continue
		}

		// get first and second halves, compare
		const partA = test.substring(0, l / 2)
		const partB = test.substring(l / 2)
		//console.log(`test: ${test}   partA: ${partA}   partB: ${partB}`)
		// if they match, this id is invalid
		if (partA == partB) {
			sumOfInvalidIds += parseInt(test)
		}
	}
}

console.log(`Sum of invalid product IDs: ${sumOfInvalidIds}`)
