import { Input } from "antd";
import { useCombobox } from "downshift";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [inputItems, setInputItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState([]);
  const [email, setEmail] = useState([]);
  const [phone, setPhone] = useState([]);
  
  useEffect(() => {
    
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => setUsers(data))
  },[]);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        users.filter((item) =>
          item.name.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      );
    },
  });

  return (
    <div className="App">
      <h2>User: {singleUser}</h2>
      <h2>Email: {email}</h2>
      <h2>Phone: {phone}</h2>
      <div {...getComboboxProps()}>
        <Input
          {...getInputProps()}
          placeholder="Search Google or type a URL"
          enterButton="Search"
          size="large"
        />
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          inputItems.map((item, index) => (
            <span 
              key={item.id}
              {...getItemProps({ item, index })}
              onClick={() => {
                setSingleUser(item.name);
                setEmail(item.email);
                setPhone(item.phone);
              }}
            >
              
            <li
              style={highlightedIndex === index ? { background: "#ff3" } : {}}
            >
              <h4>{item.name}</h4>
            </li>
            </span>
          ))}
      </ul>
    </div>
  );
}

export default App;
