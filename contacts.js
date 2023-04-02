const fs = require("fs").promises;
const path = require("path")
const {nanoid} = require ("nanoid")

const contactsPath = path.join(__dirname, "db", "contacts.json")


async function readContacts(){
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data)
   
}

function listContacts() {
   return readContacts()
  }


function updateContacts (contacts){
    return fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
}

async function getById (id){
    const contacts = await readContacts();
    const contact = contacts.find(contact => contact.id===id);
   
    return contact;
}

async function addContact(contact){
    const contacts = await readContacts();
    const newContact = {...contact, id:nanoid(8)}
    contacts.unshift(newContact);
   await updateContacts(contacts);
   return newContact
}

async function removeContact(contactId) {
    const contacts = await readContacts();
    const newContacts = contacts.filter(contact=>contact.id!==(contactId));
    const deletedCon = contacts.filter(contact=>contact.id===(contactId))
    await updateContacts(newContacts);
    return deletedCon;
  }
module.exports={
    getById,
    addContact,
    listContacts,
    removeContact
}