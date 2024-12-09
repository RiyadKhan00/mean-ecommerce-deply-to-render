import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const AuthRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },

    onSubmit: (value, action) => {
      dispatch(registerUser(value)).then((data) => {
        if (data.payload.success) {
          toast({
            title: data.payload.message,
          });
          navigate("/auth/login");
          action.resetForm();
        } else {
          toast({
            title: data.payload.message,
            variant: "destructive",
          });
        }
      });
    },
  });

  return (
    <div className="w-50">
      <div className="text-center">
        <h2 className="fs-1">Create new account</h2>
        <p>
          Already have an account <Link to="/auth/login">Login</Link>
        </p>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            onChange={handleChange}
            value={values.userName}
            placeholder="Enter email"
            className="p-2"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            placeholder="Enter email"
            className="p-2"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            placeholder="Password"
            className="p-2"
          />
        </Form.Group>

        <Button type="submit" className="w-100 bg-black">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AuthRegister;
