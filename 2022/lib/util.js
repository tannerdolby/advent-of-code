const fs = require('fs/promises')

async function readFile(filepath) {
    try {
        return await fs.readFile(filepath)
    } catch (err) {
        throw err
    }
}

module.exports = {
    readFile
}
