import fs from 'node:fs'

Array.prototype.any = Array.prototype.some

const input = fs.readFileSync('inputs/05.txt', 'utf8')
const inputLines = input.split('\n')

const allRanges = []
const stockIds = []

function rangeToString(range) {
	return `{ ${range?.begin || 'x'}, ${range?.end || 'x'} }`
}

// process input
for (let l = 0; l < inputLines.length; ++l) {
	// skip the empty eof line
	if (inputLines[l].length === 0) {
		continue
	}
	// treat as a range
	if (inputLines[l].indexOf('-') !== -1) {
		const [ begin, end ] = inputLines[l].split('-')
		allRanges.push({ begin: BigInt(begin), end: BigInt(end) })
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
	for (let range of allRanges) {
		if (range.begin <= id && id <= range.end) {
			fresh = true
			break
		}
	}
	sumFresh += fresh
}
console.log(`Fresh stock: ${sumFresh}`)

function combineOverlappingRanges(ranges) {
	//console.log(`Combining ${ranges.length} ranges...`)
	const combinedRanges = []
	for (let range of ranges) {
		const beginInsideRangeIdx = combinedRanges.findIndex(cr => cr.begin <= range.begin && range.begin <= cr.end)
		const beginInsideRange = combinedRanges[beginInsideRangeIdx]
		const endInsideRangeIdx = combinedRanges.findIndex(cr => cr.begin <= range.end && range.end <= cr.end)
		const endInsideRange = combinedRanges[endInsideRangeIdx]
		//console.log(`begIdx: ${beginInsideRangeIdx} begRange: {${beginInsideRange?.begin},${beginInsideRange?.end}} endIdx: ${endInsideRangeIdx} endRange: {${endInsideRange?.begin},${endInsideRange?.end}}`)

		if (beginInsideRangeIdx > -1 && beginInsideRangeIdx === endInsideRangeIdx) {
			// new range falls entirely in one existing range
			// so just skip
			//console.log(`range ${rangeToString(range)} entirely inside range ${rangeToString(beginInsideRange)}`)
		} else if (beginInsideRange) {
			// new range beginning falls in an existing range
			// so extend the end of the range to meet this one
			combinedRanges[beginInsideRangeIdx] = { begin: beginInsideRange.begin, end: range.end }
			//console.log(`range ${rangeToString(range)} starts in range ${rangeToString(beginInsideRange)}`)
		} else if (endInsideRange) {
			// new range ending falls in an existing range
			// so extend the begin of the range to meet this one
			combinedRanges[endInsideRangeIdx] = { begin: range.begin, end: endInsideRange.end }
			//console.log(`range ${rangeToString(range)} ends in range ${rangeToString(endInsideRange)}`)
		} else {
			// no overlap; add it as a new range
			combinedRanges.push(range)
			//console.log(`range ${rangeToString(range)} not yet present`)
		}
	}
	console.log(`Collapsed ${ranges.length} to ${combinedRanges.length} ranges`)
	return combinedRanges
}

// first, compact down all the ranges
// sort the ranges in ascending order to make it easier to deal with and more predictable
allRanges.sort((rangeA, rangeB) => {
	if (rangeA.begin > rangeB.begin) return 1
	if (rangeA.begin < rangeB.begin) return -1
	return 0
})
const intermediateRanges = combineOverlappingRanges(allRanges)
// then, compact again in case there are combined ranges which first didn't overlap but later did
const finalRanges = combineOverlappingRanges(intermediateRanges)

// sum the ranges by the begin & end
let idCount = 0n
for (let r of finalRanges) {
	// add 1 because the range is inclusive
	idCount += 1n + r.end - r.begin
}
console.log(`Ids in ranges: ${idCount}`)
