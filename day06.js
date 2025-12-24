import fs from 'node:fs'

const input = fs.readFileSync('inputs/06.txt', 'utf8')
const inputLines = input.split('\n')

// problems are in columns, so each row contains a piece of each problem, separated by some quantity of spaces
const problemNumbers = []
const problemOperators = []

function readOperatorsLine(line) {
	// read in all the operators, skipping all spaces
	const parts = line.split(' ')
	for (const p of parts) {
		if (p === '') {
			continue
		}
		problemOperators.push(p)
	}
	console.log(`List of operators: ${problemOperators}`)
}

function readNumbersLine(line, isFirst = false) {
	// read in all the numbers, skipping all spaces
	const parts = line.split(' ')
	const numbers = []
	for (const p of parts) {
		if (p === '') {
			continue
		}
		numbers.push(parseInt(p))
	}
	console.log(`List of numbers: ${numbers}`)
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
	console.log(`Answering problem ${o}...`)
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

console.log(`Sum of solutions: ${answersSum}`)
