
const contacts = require("./contacts");

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
      console.log("You successfully added this contact!",newContact);
      break;

    case "remove":
      const newContacts = await contacts.removeContact(id);
      if(newContacts.length===0){ console.log(`There is no contact with id "${id}". Maybe you have already removed this contact.`);
      break
    }
      console.log("You successfully removed this contact!",newContacts)
      break;

    default:
      console.warn("Unknown action type!");
  }
}

 invokeAction(argv);

