import { Button, Input, message } from "antd";
import { useState } from "react";
import { useAuth } from "../../../hooks";
import { Auth } from "../../../api";

import './ComponentForm.scss';
import { useNavigate } from "react-router-dom";

export function ComponentForm() {
    const { login } = useAuth();
    const navigate = new useNavigate();
    
    const authController = new Auth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }
    
    const actionSubmit = async (event) => {
        event.preventDefault();
        await validateSignin();
    }
    
    const validateSignin = async () => {
        const response = await authController.postSignin(formData);
        
        if (!response) return message.error("Error de autenticación");
        if (response?.error) return message.error("Error al ejecutar petición");

        await authController.setDataUser(response);
        login(response);
        message.success("Success");
        navigate("/user/characters");
    }
    
    return (
        <form onSubmit={actionSubmit} onChange={handleChange}>
            <label htmlFor="email">
                <span>Email</span>
                <Input placeholder="Email" name='email' value={formData.email} />
            </label>
            <label htmlFor="password">
                <span>Password</span>
                <Input.Password placeholder="Password" name='password' value={formData.password} />
            </label>
            <Button type="primary" htmlType='submit' >Submit</Button>
        </form>
    )
}
