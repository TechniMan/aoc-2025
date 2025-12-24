import fs from 'node:fs'

const input = fs.readFileSync('inputs/06.txt', 'utf8')
const inputLines = input.split('\n')

// problems are in columns, so each row contains a piece of each problem, separated by some quantity of spaces
const problemNumbers = []
const problemOperators = []
const numberLines = []

function readOperatorsLine(line) {
	// read in all the operators, skipping all spaces
	const parts = line.split(' ')
	for (const p of parts) {
		if (p === '') {
			continue
		}
		problemOperators.push(p)
	}
	//console.log(`List of operators: ${problemOperators}`)
}

function readNumbersLine(line, isFirst = false) {
	numberLines.push(line)
	// read in all the numbers, skipping all spaces
	const parts = line.split(' ')
	const numbers = []
	for (const p of parts) {
		if (p === '') {
			continue
		}
		numbers.push(parseInt(p))
	}
	//console.log(`List of numbers: ${numbers}`)
	problemNumbers.push(numbers)
}

// read in all the data and format back into problems
for (const line of inputLines) {
	if (['*', '+'].indexOf(line[0]) !== -1) {
		readOperatorsLine(line)
	} else if (line.length > 1) {
		readNumbersLine(line, problemNumbers.length === 0)
	}
}

// now solve the problems
let answersSum = 0
for (let o = 0; o < problemOperators.length; ++o) {
	//console.log(`Answering problem ${o}...`)
	let result = 0
	if (problemOperators[o] === '+') {
		for (const numbers of problemNumbers) {
			result += numbers[o]
		}
	} else if (problemOperators[o] === '*') {
		result = 1
		for (const numbers of problemNumbers) {
			result *= numbers[o]
		}
	}
	answersSum += result
}

console.log(`Sum of solutions p1: ${answersSum}`)

// Part 2:  read the numbers column-by-column

// determine widths of columns so we can read the numbers top-to-bottom
const columnWidths = []
let w = 0
for (const char of inputLines[inputLines.length - 2]) {
	if (char === ' ') {
		w++
	} else {
		columnWidths.push(w)
		w = 0
	}
}
columnWidths.push(w + 1)

// clear the numbers for the problems
let problemNumbers2 = []
let i = 0 // track the overall index
// for each problem column:
for (let c = 1; c < columnWidths.length; ++c) {
	const numbers = []
	// for each number column:
	for (let w = 0; w < columnWidths[c]; ++w) {
		// read column i from each row into a number for this problem
		let numberString = ''
		for (const row of numberLines) {
			// ignore empty digits
			if (row[i] !== ' ') {
				numberString += row[i]
			}
		}
		numbers.push(parseInt(numberString))
		// finally increment column index
		++i
	}
//	console.log(`${problemOperators[c - 1]} [${numbers}]`)
	problemNumbers2.push(numbers)
	// skip the empty column between problems
	++i
}

// now solve the problems again
let sum2 = 0
// for each problem:
for (let o = 0; o < problemOperators.length; ++o) {
	// for each number in the problem:
	if (problemNumbers2[o] === undefined) continue

	if (problemOperators[o] === '+') {
		sum2 += problemNumbers2[o].reduce((acc, val) => acc + val, 0)
	} else {
		sum2 += problemNumbers2[o].reduce((acc, val) => acc * val, 1)
	}
}
console.log(`Sum of solutions p2: ${sum2}`)
