import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axiosService from "../helper/axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    avatar: null,
  });
  const [error, setError] = useState(null);
  const navigate =useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const registrationForm = event.currentTarget;

    if (registrationForm.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    const data = {
      username: form.username,
      email: form.email,
      password: form.password,
      first_name: form.first_name,
      last_name: form.last_name,
      avatar: form.avatar,
    };

    axiosService.post("/auth/register/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    .then((res) =>{
        console.log('success', res)
        localStorage.setItem("auth", JSON.stringify({
            access: res.data.access,
            refresh: res.data.refresh,
            user: res.data.user,
        }));
        navigate("/");
    }).catch((err) => {
      if (err.message) {
        console.log("Error occurs", error);
        setError(err.request.response);
      }
    });
  };

  return (
    <div>
      <h2>Register here</h2>
      <Form
        id="registration-form"
        className="border p-4 rounded"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={form.first_name}
            onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            required
            type="text"
            placeholder="Enter first name"
          />
          <Form.Control.Feedback type="invalid">
            This field is required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            value={form.last_name}
            onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            required
            type="text"
            placeholder="Enter last name"
          />
          <Form.Control.Feedback type="invalid">
            This field is required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
            type="text"
            placeholder="Enter username"
          />
          <Form.Control.Feedback type="invalid">
            This field is required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            type="email"
            placeholder="Enter email"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Profile Photo</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, avatar: e.target.files[0] })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={form.password}
            minLength={8}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            type="password"
            placeholder="Password"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Password
          </Form.Control.Feedback>
        </Form.Group>

        <div className="text-content text-danger">
          {error && <p>{error}</p>}
        </div>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default RegistrationForm;
