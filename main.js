const contacts = require('./script');
const yargs = require('yargs');

yargs.command({
    command: 'add',
    describe: 'Tambahkan data kontak baru',
    builder: {
        name: {
            describe: 'Nama kontak',
            type: 'string',
            demandOption: true
        },
        email: {
            describe: 'Email kontak',
            type: 'string',
            demandOption: true
        },
        skills: {
            describe: 'Skills kontak',
            type: 'string',
            demandOption: true
        }
    },
    handler(argv) {
        contacts.saveContact(argv.name, argv.email, argv.skills);
    }
});

// commad to remove the contact

yargs.command({
    command:'remove',
    describe: 'Delete contact',
    builder: {
        name: {
            describe: 'Name of contact',
            type:'string',
            demandOption: true
        }
    },
    handler(argv) {
        contacts.removeContact(argv.name);
    }
});

// detail contact

yargs.command({
    command: 'detail',
    describe: 'Detail contact',
    builder: {
        name: {
            describe: 'Name of contact',
            type:'string',
            demandOption: true
        }
    },
    handler(argv) {
        contacts.showDetailContact(argv.name);
    }
});

// Update Exist contact

yargs.command({
    command: 'update',
    describe: 'Update contact',
    builder: {
        name: {
            describe: 'Name of contact',
            type:'string',
            demandOption: true
        },
        email: {
            describe: 'Email of contact',
            type:'string',
            demandOption: false
        },
        skills: {
            describe: 'Skills of contact',
            type:'string',
            demandOption: false
        }
    },
    handler(argv) {
        contacts.updateContact(argv.name, argv.email, argv.skills);
    }
});

yargs.parse();





// const container = async() => {
//     try {
//         const name = await contacts.createQuestion('Masukan nama anda = ');
//         const email = await contacts.createQuestion('Masukan email anda = ');
//         const skills = await contacts.createQuestion('Masukan skills anda = ');

//         contacts.saveContact( name , email , skills )
//     }catch(e){
//         console.error(e.message);
//     }
// }

// container();