const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

// create directory if it doesn't exist
const dirPath = './data'
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// create file if it't exists
const filePath = `${dirPath}/data.json`;

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf8');
}

const saveContact = (name, email, skills) => {
    const contact = { name, email, skills };
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // check duplicates name
    const isDuplicate = data.find(item => item.name === name);
    if (isDuplicate) {
        console.log(chalk.bgRed.white('Data already exists, try another name'));
        return;
    }

    // validate email
    if (!validator.isEmail(email)) {
        console.error(chalk.bgRed('Invalid email'));
        return;
    }

    data.push(contact);
    fs.writeFileSync(filePath, JSON.stringify(data));
    console.log(chalk.bgGreenBright('Data berhasil disimpan'));
    // rl.close();
}

// removeContact function
const removeContact = (name) => {
    const contact = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const filteredData = contact.filter(item => item.name !== name);
    fs.writeFileSync(filePath, JSON.stringify(filteredData));
    console.log(chalk.bgGreenBright('Data berhasil dihapus'));
}


module.exports = { saveContact, removeContact };


// const readline = require('readline');


// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });