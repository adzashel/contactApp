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

const readFile = () => {
    const contact = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(contact);

    return data;
}

const saveContact = (name, email, skills) => {
    const contact = { name, email, skills };
    const data = readFile();
    // check duplicates name
    const isDuplicate = data.find(item => item.name === name);
    if (isDuplicate) {
        console.log(chalk.bgRed.white('Data already exists, try another name'));
        return;
    }

    // validate email
    if (!validator.isEmail) {
        console.error(chalk.bgRed('Invalid email'));
        return;
    } else {
        data.push(contact);
        fs.writeFileSync(filePath, JSON.stringify(data));
        console.log(chalk.bgGreenBright('Data has  been saved to: ' + filePath))
    }
    // rl.close();
}

// removeContact function
const removeContact = (name) => {
    const fileBuffer = readFile();
    const filteredData = fileBuffer.filter(item => item.name !== name);
    fs.writeFileSync(filePath, JSON.stringify(filteredData));
    console.log(chalk.bgGreenBright('Data has been deleted from ' + filePath));
}

// show detail contact
const showDetailContact = (name) => {
    const data = readFile();
    const foundContact = data.find(item => item.name === name);

    if (!foundContact) {
        console.log(chalk.bgRed.white('Data not found'));
        return;
    } else {
        console.log(chalk.bgCyanBright(`Detail contact ${foundContact.name}`));
        console.log(`Nama: ${foundContact.name}`);
        console.log(`Email: ${foundContact.email}`);
        console.log(`Skills: ${foundContact.skills}`);
    }
}

// update exist contact

const updateContact = (name, email, skills) => {
    const data = readFile();
    const updatedData = data.map(item => {
        if (item.name === name) {
            return { ...item, email, skills };
        }
        return item;
    });

    fs.writeFileSync(filePath, JSON.stringify(updatedData));
    console.log(chalk.bgGreenBright('Data has been updated'));
}

// show list of contacts
const showListContact = () => {
    const data = readFile();
    if (data.length === 0) {
        console.log(chalk.bgRed.white('No contact found'));
        return;
    } else {
        data.forEach((item, index) => {
            console.table(`${index + 1}. ${item.name} = ${item.email}`);
        });
    };
}

module.exports = {
    showListContact, 
    updateContact, 
    saveContact, 
    removeContact, 
    showDetailContact 
};


// const readline = require('readline');


// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });