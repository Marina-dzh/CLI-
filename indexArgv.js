// console.log("Halo!!!!")
const contacts = require("./contacts");
// console.log(contacts)

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log(allContacts)
      break;

    case "get":
      const contact = await contacts.getById(id)
      console.log(contact);
      break;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone})
      console.log(newContact);
      break;

    case "remove":
      // ... id
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction({action:"list"});
// invokeAction({action:"get", id:"Z5sbDlS7pCzNsnAHLtDJd"})

const actionIndex =process.argv.indexOf("--action")
console.log(process.argv)
if(actionIndex!==-1){
    const action = process.argv[actionIndex+1];
    if(action==="add"){
        const name = process.argv[actionIndex+2];
        const email = process.argv[actionIndex+3];
        const phone = process.argv[actionIndex+4];
    
        invokeAction({action, name, email, phone});
        return;
    }
    const id = process.argv[actionIndex+2];
    const name = process.argv[actionIndex+3];
    const email = process.argv[actionIndex+4];
    const phone = process.argv[actionIndex+5];

    invokeAction({action, id, name, email, phone})
}