import fs from 'node:fs'

const input = fs.readFileSync('inputs/03.txt', 'utf8')
const batteryBanks = input.split('\n')

// find greatest digit in string
function indexOfGreatestDigit(str) {
	let greatestDigitIdx = 0
	let greatestDigit = 0
	for (let i = 0; i < str.length; ++i) {
		const d = parseInt(str[i])
		if (d > greatestDigit) {
			greatestDigit = d
			greatestDigitIdx = i
		}
	}
	//console.log(`str: ${str} greatestDigit: ${greatestDigit} idx: ${greatestDigitIdx}`)
	return greatestDigitIdx
}

// greatest 2-digit from '4123'
// > find greatest in 412
// > result: 4, idx 0
// > add 4 * 10^1
// > find greatest in 123
// > result: 3, idx 3 [2 + 1]
// > add 3 * 10^0
// > end: 43

// finds the greatest N-digit combination from a bank of batteries
function highestJoltage(bank, joltLength) {
	//console.log(`bank: ${bank}`)
	let index = 0
	let joltage = 0
	for (let d = 0; d < joltLength; ++d) {
		const slice = bank.slice(index, -(joltLength - d - 1) || bank.length)
		index += indexOfGreatestDigit(slice)
		const digit = parseInt(bank[index])
		joltage += digit * Math.pow(10, joltLength - d - 1)
		//console.log(`index: ${index} digit: ${digit} joltage: ${joltage}`)
		index++
	}
	return joltage
}

let sumPart1 = 0
let sumPart2 = 0
for (let bank of batteryBanks) {
	// skip the empty \n line at the end of the file
	if (bank.length > 1) {
		let joltage = highestJoltage(bank, 2)
		sumPart1 += joltage
		sumPart2 += highestJoltage(bank, 12)
	}
}
console.log(`Sum of highest 2digit joltage from all battery banks: ${sumPart1}`)
console.log(`Sum part 2: ${sumPart2}`)
