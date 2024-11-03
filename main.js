const fs = require('fs');
const validator = require('validator');
const readline = require('readline');

const rl =  readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// create directory if it doesn't exist
const dirPath = './data'
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// create file if it't exists
const filePath = `${dirPath}/data.json`;

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath , '[]' , 'utf8');
}

// write a question 
const createQuestion = (question) => {
    return new Promise((resolve, reject) => {
        rl.question( question , (answer)=> {
            if (!validator.isEmpty(answer)) {
                resolve(answer);
            } else {
                reject(new Error('Question cannot be empty'));
            }
        });
    })
}

const container = async() => {
    try {
        const name = await createQuestion('Masukan nama anda = ');
        const email = await createQuestion('Masukan email anda = ');
        const skills = await createQuestion('Masukan skills anda = ');

        const contact = {name , email , skills};
        const data = JSON.parse(fs.readFileSync(filePath , 'utf-8'));
        data.push(contact);
        fs.writeFileSync(filePath , JSON.stringify(data));
        console.log('Data berhasil disimpan');
        rl.close();
    }catch(e){
        console.error(e.message);
    }
}

container();