const { readFile } = require('../lib/util')

function fullyContains(pairOne, pairTwo) {
    const [leftStart, leftEnd] = pairOne;
    const [rightStart, rightEnd] = pairTwo;

    if (
        leftStart >= rightStart && leftEnd <= rightEnd ||
        rightStart >= leftStart && rightEnd <= leftEnd
    ) {
        return true;
    }

    return false;
}

function hasOverlap(pair) {
    const elfOne = pair[0].split('-').map((val) => Number(val))
    const elfTwo = pair[1].split('-').map((val) => Number(val))

    return fullyContains(elfOne, elfTwo)
}

async function solve() {
    const input = (await readFile('./input.txt')).toString()
    const assignments = input.split("\n")
    let res = 0

    for (const assignment of assignments) {
        if (!assignment) continue

        const pair = assignment.split(',')

        if (hasOverlap(pair)) {
            res += 1
        }
    }

    return res
}

async function solveTwo() {
    const input = (await readFile('./input.txt')).toString();
    const assignments = input.split("\n");
    let res = 0

    for (const assignment of assignments) {
        // check for any overlap at all
        const pair = assignment.split(',');
        const [leftStart, leftEnd] = pair[0].split('-').map(v => Number(v));
        const [rightStart, rightEnd] = pair[1].split('-').map(v => Number(v));

        
        // single section overlaps
        const singleSectionOverlap = leftEnd == rightStart || leftEnd == rightEnd || leftStart == rightStart || leftStart == rightEnd
        const partialOverlap = rightStart >= leftStart && leftEnd >= rightStart && leftEnd <= rightEnd

        // 54-78,29-77
        if (
            rightStart >= leftStart && rightStart <= leftEnd ||
            leftStart >= rightStart && leftStart <= rightEnd
            // singleSectionOverlap ||
            // partialOverlap || 
            // leftStart <= rightStart && leftEnd >= rightEnd ||
            // leftStart >= rightStart && leftEnd >= rightEnd
        ) {
            console.log('wow', leftStart, leftEnd, rightStart, rightEnd)
            res += 1
        }

    }
    return res
}

async function run() {
    console.log('ANS PART 1: ', await solve())
    console.log('ANS PART 2: ', await solveTwo())
}

run()
