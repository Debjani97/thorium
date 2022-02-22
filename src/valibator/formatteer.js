function trim() {
    let name = '  Debjani Bhattacharjee    '
    console.log('Trimmed name is: ',name.trim())
}

function changetoLowerCase() {
    let name = 'DeBjAnI BhaTtaChArjEE'
    console.log('Name in lowercase is: ',name.toLowerCase())
}

function changeToUpperCase() {
    let name = 'debjani bhattacharjee'
    console.log('Name in uppercase is: ',name.toUpperCase())
}

module.exports.trim = trim
module.exports.changetoLowerCase = changetoLowerCase
module.exports.changeToUpperCase = changeToUpperCase