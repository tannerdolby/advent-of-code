const { readFile } = require('../lib/util')

// rock beats scissors
// paper beats rock
// scissors beats paper

// rock loses to paper
// paper loses to scissors
// scissors loses to rock

// A loses to Y
// A beats Z
// A ties X

// B beats X
// B loses to Z
// B ties Y

// C beats X
// C loses to Y
// C ties Z

// X beats C
// X loses B
// X ties A

// Y beats A
// Y loses C
// Y ties B

// Z beats B
// Z loses A
// Z ties C

const shapeValues = {
    'X': 1,
    'Y': 2,
    'Z': 3,
    'A': 1,
    'B': 2,
    'C': 3
}

function getRoundResult(opponent, user) {
    if (
        user === 'X' && opponent === 'C' ||
        user === 'Y' && opponent === 'A' ||
        user === 'Z' && opponent === 'B'
    ) {
        return ['win', 6 + shapeValues[user]]
    }

    if (
        user === 'X' && opponent === 'A' ||
        user === 'Y' && opponent === 'B' ||
        user === 'Z' && opponent === 'C'
    ) {
        return ['draw', 3 + shapeValues[user]]
    }

    return ['loss', shapeValues[user]]
}

function lookForResult(opponent, resultType, resultPoints) {
    let choices = ['X', 'Y', 'Z']
    for (let i=0; i < choices.length; i++) {
        if (getRoundResult(opponent, choices[i])[0] === resultType) {
            return resultPoints + shapeValues[choices[i]]
        }
    }
}

// PART 1
async function solve() {
    const inputs = await readFile('./input.txt')
    const rounds = inputs.toString().split('\n')

    let userScore = 0

    for (const round of rounds) {
        if (!round) continue

        const [opponent, user] = round.split(' ')
        userScore += getRoundResult(opponent, user)[1]
    }

    return userScore
}

// PART 2
async function solveTwo() {
    const inputs = await readFile('./input.txt')
    const rounds = inputs.toString().split('\n')

    // X means lose
    // Y means tie
    // Z means win

    // todo: select correct shape
    function getRoundResultForUser(round) {
        if (!round) return false

        const [opponent, user] = round.split(' ')

        if (user === 'X') {
            // user loses
            const res = getRoundResult(opponent, user)
            if (res[0] === 'loss') {
                return res[1]
            }
            return lookForResult(opponent, 'loss', 0)
        }
        if (user === 'Y') {
            // draw
            return 3 + shapeValues[opponent]
        }
        if (user === 'Z') {
            // user wins
            return lookForResult(opponent, 'win', 6)
        }

        return 0
    }

    let userScore = 0

    for (const round of rounds) {
        userScore += getRoundResultForUser(round)
    }

    return userScore
}

async function run() {
    console.log('ANS: ', await solve())
    console.log('ANS: ', await solveTwo())
}

run()
