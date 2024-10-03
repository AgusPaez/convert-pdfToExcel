import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);

  const port = process.env.PORT || 5000;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await axios.post(
        "https://backendconverter.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );

      // Crear enlace de descarga para el Excel
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "converted.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error uploading the file:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h1>Bienvenido</h1>
      <h2>Convert PDF to Excel</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Upload PDF</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Convert to Excel
        </Button>
      </Form>
    </Container>
  );
}
export default App;
