// routes/contacts.js

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataFile = path.join(__dirname, './db.json');

// Read data from JSON file
const getData = () => {
  const data = fs.readFileSync(dataFile);
  return JSON.parse(data);
};

// Write data to JSON file
const saveData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

// Generate a unique ID for new contacts
const generateId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

router.get('/', (req, res) => {
  const data = getData();
  res.json(data.contacts);
});

router.get('/:id', (req, res) => {
  const contactId = req.params.id;
  const data = getData();
  const contact = data.contacts.find(c => c.id === contactId);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

router.post('/', (req, res) => {
  const contact = req.body;
  const data = getData();
  contact.id = generateId();
  data.contacts.push(contact);
  saveData(data);
  res.status(201).json(contact);
});

router.put('/:id', (req, res) => {
  const contactId = req.params.id;
  const updatedContact = req.body;
  const data = getData();
  const contactIndex = data.contacts.findIndex(c => c.id === contactId);
  if (contactIndex !== -1) {
    data.contacts[contactIndex] = { ...data.contacts[contactIndex], ...updatedContact };
    saveData(data);
    res.json(data.contacts[contactIndex]);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

router.delete('/:id', (req, res) => {
  const contactId = req.params.id;
  const data = getData();
  const contactIndex = data.contacts.findIndex(c => c.id === contactId);
  if (contactIndex !== -1) {
    const deletedContact = data.contacts.splice(contactIndex, 1)[0];
    saveData(data);
    res.json(deletedContact);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

module.exports = router;
