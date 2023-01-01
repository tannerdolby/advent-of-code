const { readFile } = require('../lib/util')

function checkForSimilarItems(leftHalf, rightHalf) {
    const similar = []
    const left = leftHalf.split('')
    const right = rightHalf.split('')
    for (let i=0; i < left.length; i++) {
        if (right.includes(left[i])) {
            similar.push(left[i])
        }
    }
    return [...new Set(similar)]
}

function getPriorityMap() {
    const priorities = {}
    for (let i=97, j=1; i < 123, j < 27; i++, j++) {
        priorities[String.fromCharCode(i)] = j
    }
    for (let i=65, j=27; i < 97, j < 53; i++, j++) {
        priorities[String.fromCharCode(i)] = j
    }
    return priorities
}

async function solve() {
    const inputs = await readFile('./input.txt')
    const rucksacks = inputs.toString().split('\n')
    const priorities = getPriorityMap()
    let ans = 0

    for (const rucksack of rucksacks) {
        const leftHalf = rucksack.substring(0, rucksack.length / 2)
        const rightHalf = rucksack.substring(rucksack.length / 2, rucksack.length+1)

        // check for similar items
        const similarItems = checkForSimilarItems(leftHalf, rightHalf)

        ans += priorities[similarItems[0]]
    }

    return ans
}

async function solveTwo() {
    const inputs = await readFile('./input.txt')
    const rucksacks = inputs.toString().split('\n')
    const priorites = getPriorityMap()
    let res = 0
    let group = []

    for (let i=0; i < rucksacks.length; i++) {
        if (i > 0 && i % 3 === 0) {
            // check the group of three and reset
            res += priorites[checkGroup(group)]
            group = []
        }
        group.push(rucksacks[i])
    }
    // last group of three of input to check
    res += priorites[checkGroup(group)]

    return res
}

function checkGroup(groupOfThree) {
    let charCounts = []

    for (let i=0; i < groupOfThree.length; i++) {
        const rucksack  = groupOfThree[i]
        const chars = {}
        for (let j=0; j < rucksack.length; j++) {
            chars[rucksack[j]] = (chars[rucksack[j]] || 0) + 1
        }
        charCounts.push(chars)
    }

    // look for common char that is in each of the three groups
    for (const letter in charCounts[0]) {
        if (
            charCounts[1].hasOwnProperty(letter) && 
            charCounts[2].hasOwnProperty(letter)
        ) {
            return letter
        }
    }

    return ''
}

async function run() {
    console.log('ANS PART 1: ', await solve())
    console.log('ANS PART 2: ', await solveTwo())
}

run()
