import React, { useEffect, useState } from "react";

const App = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedChips, setSelectedChips] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await fetch(
          "https://657966fff08799dc8046d142.mockapi.io/students"
        );
        const data = await response.json();
        setItems(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetcher();
  }, []);

  const handleInput = (e) => {
    setInputValue(() => e.target.value);
    const newValue = items.filter(
      (item) =>
        item.userName.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.userEmail.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredData(newValue);
  };

  const handleBackspace = (e) => {
    console.log(e);
    if (
      inputValue === "" &&
      e.key === "Backspace" &&
      selectedChips.length > 0
    ) {
      const index = selectedChips[selectedChips.length - 1];
      remove(index);
    }
  };

  const remove = (index) => {
    setSelectedChips((prevChips) =>
      prevChips.filter((chip) => chip.id !== index)
    );
    setFilteredData((prevItems) => [...prevItems, index]);
    setSelectedChips((prevChips) =>
      prevChips.filter((item) => item.id !== index.id)
    );
  };

  const add = (chip) => {
    setSelectedChips((prevChips) => [...prevChips, chip]);
    setFilteredData((prevItems) =>
      prevItems.filter((item) => item.id !== chip.id)
    );
    setInputValue("");
  };

  return (
    <>
      <div style={{ backgroundColor: "#586776", minHeight: "100vh" }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInput}
          placeholder="Enter name of the person or email"
          onKeyDown={handleBackspace}
          style={{
            width: "80%",
            height: "40px",
            padding: "20px",
            color: "grey",
            fontSize: "15px",
            fontWeight: "bold",
            borderRadius: "10px",
            margin: "20px",
          }}
        />
        <div style={{ display: "flex", flexWrap: "wrap", padding: "10px" }}>
          {selectedChips.map((chip) => (
            <div
              key={chip.id}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid black",
                borderRadius: "10px",
                padding: "5px 10px",
                margin: "5px",
                backgroundColor: "#8395A7",
                height: "50px",
              }}
            >
              <img
                style={{
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
                src={chip.userProfile}
                alt={chip.userName}
                height={30}
                width={30}
              />
              <span style={{ color: "#2B2B52" }}>
                {chip.userName} - {chip.userEmail}
              </span>
              <div
                style={{
                  color: "#F9DDA4",
                  margin: "20px",
                  alignSelf: "end",
                  cursor: "pointer",
                }}
                onClick={() => remove(chip)}
              >
                X
              </div>
            </div>
          ))}
        </div>

        <div>
          {filteredData.map((item) => (
            <div
              onClick={() => add(item)}
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid black",
                borderRadius: "10px",
                padding: "2px",
                margin: "2px",
                backgroundColor: "#8395A7",
                cursor: "pointer",
                height: "50px",
              }}
            >
              <img
                style={{
                  borderRadius: "50%",
                  margin: "10px",
                }}
                src={item.userProfile}
                alt={item.userName}
                height={30}
                width={30}
              />
              <span style={{ color: "#2B2B52", margin: "5px" }}>
                {item.userName}
              </span>
              <span style={{ color: "#4C4B4B", margin: "5px" }}>
                {item.userEmail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
