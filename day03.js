import fs from 'node:fs'

const input = fs.readFileSync('inputs/03.txt', 'utf8')
const batteryBanks = input.split('\n')

// finds the highest 2-digit combination from a bank of batteries
function highestJoltage(bank) {
	const digits = bank.split('')
	// first, find the highest digit
	let highestIndex = 0
	let highestDigitSoFar = 0
	for (let i = 0; i < digits.length - 1; ++i) {
		const d = parseInt(digits[i])
		if (d > highestDigitSoFar) {
			highestIndex = i
			highestDigitSoFar = d
		}
	}
	let joltage = 10 * highestDigitSoFar
	highestDigitSoFar = 0
	// then the highest digit after that
	for (let i = highestIndex + 1; i < digits.length; ++i) {
		const d = parseInt(digits[i])
		if (d > highestDigitSoFar) {
			highestDigitSoFar = d
		}
	}
	joltage += highestDigitSoFar
	// finally, return the number they make
	return joltage
}

let sumPart1 = 0
for (let bank of batteryBanks) {
	sumPart1 += highestJoltage(bank)
}
console.log(`Sum of highest 2digit joltage from all battery banks: ${sumPart1}`)
