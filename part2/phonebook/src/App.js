import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personsService from "./services/personsService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    personsService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const newObject = {
      name: newName,
      number: newNumber,
    };

    // Replace number of a person
    if (persons.find((person) => person.name === newObject.name)) {
      const personId = persons.find((person) => person.name === newName).id;
      const replacementObject = { ...newObject, id: personId };
      if (
        window.confirm(
          `${newObject.name} is already added to phonebook, replace the old number with a new one ?`
        )
      ) {
        personsService.update(personId, replacementObject);
        setPersons(
          persons.map((person) =>
            person.id === personId ? replacementObject : person
          )
        );
        setNotification({
          message: `Changed ${newObject.name}'s number`,
          type: "success",
        });
      }
    } else {
      // Add person
      personsService
        .create(newObject)
        .then((newPerson) => setPersons(persons.concat(newPerson)));
      setNotification({
        message: `Added ${newObject.name}`,
        type: "success",
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id) => {
    const personName = persons.filter((person) => person.id === id)[0].name;

    if (window.confirm(`Delete ${personName} ?`)) {
      personsService.delete(id).catch((error) => {
        setNotification({
          message: `Information of ${personName} has already been removed from the server`,
          type: "error",
        });
        setTimeout(() => {
          setNotification({
            message: "",
            type: "",
          });
        }, 5000);
        return;
      });
      setPersons(persons.filter((person) => person.id !== id));
      setNotification({
        message: `Information of ${personName} has been removed from the server`,
        type: "success",
      });
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filtered = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter handleFilterChange={handleFilterChange} />
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filtered={filtered} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
