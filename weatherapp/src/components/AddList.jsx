import { useState } from "react";
import { Button, FormControl, ListGroup } from "react-bootstrap";
import "../App.css";

const AddList = () => {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  //The addItem function first checks if the input is empty.
  //  If not, it converts the input to lowercase and verifies whether it already
  //  exists in the list using the some() method. If a duplicate is found,
  // an alert is shown, and no action is taken. Otherwise, the new item is added
  // to the state, ensuring that the input field is cleared for the next entry.
  //  The function ensures that duplicates (even with different capitalization)
  // are not allowed while maintaining the original case for display."

  const addItem = () => {
    if (!item.trim()) return;
    const lowerCaseItem = item.trim().toLowerCase();
    const isDuplicate = items.some(
      (existingItem) => existingItem.toLowerCase() === lowerCaseItem
    );

    if (isDuplicate) {
      alert("Item already exists!");
      return;
    }

    setItems([...items, item.trim()]);
    setItem("");
  };

  //The deleteItem function takes an index as input, representing the item to be removed.
  // It uses the .filter() method to create a new array that excludes
  //  the item at the given index. This new array is then set as the updated state using
  // setItems(), ensuring that the UI updates dynamically.
  // This approach follows the principle
  // of immutability, preventing direct modification of the original state.
  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div>
      <h2>My List</h2>
      <FormControl
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Add an item"
        style={{ borderColor: "blueviolet" }}
      />
      <Button
        style={{ borderRadius: "20px", marginTop: "10px" }}
        onClick={addItem}
      >
        +
      </Button>
      <ListGroup>
        {items.map((data, index) => (
          <ListGroup.Item
            key={index}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "azure")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "white")
            }
            className="d-flex justify-content-between align-items-center px-4 py-2 border-0 shadow-sm fw-semibold"
            action
          >
            <span className="flex-grow-1">{data}</span>{" "}
            <Button
              variant="outline-danger"
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
                marginTop: "10px",
                paddingTop: "2px",
              }}
              size="sm"
              className="d-flex align-items-center justify-content-center"
              onClick={() => deleteItem(index)}
            >
              🗑️
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default AddList;
