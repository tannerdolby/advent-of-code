const { readFile } = require('../lib/util');

async function solve() {
    const inputs = (await readFile('./crate-sequence.txt')).toString()
    const craneMoves = inputs.split('\n')
    let ans = ''

    const stacks = [
        ['W', 'B', 'D', 'N', 'D', 'F', 'J'],
        ['P', 'Z', 'V', 'Q', 'L', 'S', 'T'],
        ['P', 'Z', 'B', 'G', 'J', 'T'],
        ['D', 'T', 'L', 'J', 'Z', 'B', 'H', 'C'],
        ['G', 'V', 'B', 'J', 'S'],
        ['P', 'S', 'Q'],
        ['B', 'V', 'D', 'F', 'L', 'M', 'P', 'N'],
        ['P', 'S', 'M', 'F', 'B', 'D', 'L', 'R'],
        ['V', 'D', 'T', 'R']
    ]

    for (const move of craneMoves) {
        const task = move.match(/\d+/gm).map(v => Number(v)).filter(Boolean)
        const fromStack = stacks[task[1]-1]
        const toStack = stacks[task[2]-1]
    
        for (let i=0; i < task[0]; i++) {
            toStack.push(fromStack.pop())
        }

        stacks[task[1]-1] = fromStack
        stacks[task[2]-1] = toStack
    }

    for (const stack of stacks) {
        ans += stack[stack.length-1]
    }

    return ans
}

async function solveTwo() {
    const inputs = (await readFile('./crate-sequence.txt')).toString()
    const craneMoves = inputs.split('\n')
    let ans = ''

    const stacks = [
        ['W', 'B', 'D', 'N', 'C', 'F', 'J'],
        ['P', 'Z', 'V', 'Q', 'L', 'S', 'T'],
        ['P', 'Z', 'B', 'G', 'J', 'T'],
        ['D', 'T', 'L', 'J', 'Z', 'B', 'H', 'C'],
        ['G', 'V', 'B', 'J', 'S'],
        ['P', 'S', 'Q'],
        ['B', 'V', 'D', 'F', 'L', 'M', 'P', 'N'],
        ['P', 'S', 'M', 'F', 'B', 'D', 'L', 'R'],
        ['V', 'D', 'T', 'R']
    ]

    // TODO: finish logic variation from part 1
    for (const move of craneMoves) {
        const task = move.match(/\d+/gm).map(v => Number(v)).filter(Boolean)
        let fromStack = stacks[task[1]-1]
        let toStack = stacks[task[2]-1]
        
        if (task[0] == fromStack.length) {
            // retain original order
            if (fromStack.length) {
                toStack.push(...fromStack)
            }
            fromStack = []
        } else {
            for (let i=0; i < task[0]; i++) {
                toStack.push(fromStack.pop())
            }
        }

        stacks[task[1]-1] = fromStack
        stacks[task[2]-1] = toStack
    }

    for (const stack of stacks) {
        ans += stack[stack.length-1]
    }

    return ans
}


async function run() {
    console.log('ANS PART 1: ', await solve())
    console.log('ANS PART 2: ', await solveTwo())
}

run()
