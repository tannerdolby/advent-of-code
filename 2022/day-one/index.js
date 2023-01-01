const { readFile } = require('../lib/util')

// PART 1
async function solve() {
    const inputs = (await readFile('./input.txt')).toString()
    const calorieList = inputs.match(/\d+\n|\d+|\n/gm)

    let maxCalories = 0
    let currCalories = 0

    for (const count of calorieList) {
        if (count === '\n') {
            currCalories = 0
            continue
        }

        currCalories += parseInt(count, 10)
        maxCalories = Math.max(maxCalories, currCalories)
    }

    return maxCalories
}


// PART 2
async function solveTwo() {
    const inputs = (await readFile('./input.txt')).toString()
    const calorieList = inputs.match(/\d+\n|\d+|\n/gm)
    let maxCalories = 0
    let currCalories = 0
    const allCounts = []

    for (const count of calorieList) {
        if (count === '\n') {
            currCalories = 0
            continue
        }

        currCalories += parseInt(count, 10)
        maxCalories = Math.max(maxCalories, currCalories)
        allCounts.push(maxCalories)
    }

    const res = [...new Set(allCounts)].slice(-3)
        .reduce((acc,curr) => acc+curr, 0)

    return res
}


async function run() {
    console.log('PART 1 ANS: ', await solve())
    console.log('PART 2 ANS: ', await solveTwo())
}

run()
