import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { AppStoreContext } from "../appStoreContext";
import { useNavigate } from "react-router-dom";

export const AddApp = () => {
  const store = useContext(AppStoreContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a dynamic ID (for demonstration, using a random number)
    const dynamicId = Math.floor(Math.random() * 1000000);

    let app = { name: name, id: dynamicId };

    store?.createApp(app);

    navigate("/");

    // You can perform other actions here, such as sending data to a server
  };

  return (
    <div className="p-3">
      <h2 className="text-center">Add App</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <div className="d-flex justify-content-center p-3">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
