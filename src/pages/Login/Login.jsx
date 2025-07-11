import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/AuthContext/AuthContext";

function Login() {
	const { register, handleSubmit, formState } = useForm();
	const [loginError, setLoginError] = useState("");
	const navigate = useNavigate();
	const { login } = useContext(AuthContext);
	const onSubmit = (data) => {
		const save = login(data.email, data.password);
		if (save) navigate("/");
		else setLoginError("Invalid email or password. Or no user registered.");
	};

	return (
		<div className="container mt-5">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-3">
					<label className="form-label">Email</label>
					<input
						type="email"
						className="form-control"
						{...register("email", {
							required: {
								value: true,
								message: "Email is required",
							},
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "Invalid Email Address format",
							},
						})}
					/>
					{formState.errors.email && <span style={{ color: "red" }}>{formState.errors.email.message}</span>}
				</div>
				<div className="mb-3">
					<label className="form-label">Password</label>
					<input
						type="password"
						className="form-control"
						{...register("password", {
							required: {
								value: true,
								message: "Password is required",
							},
						})}
					/>
					{formState.errors.password && <span style={{ color: "red" }}>{formState.errors.password.message}</span>}
				</div>

				{loginError && <p style={{ color: "red", fontWeight: "bold" }}>{loginError}</p>}

				<button type="submit" className="btn btn-dark">
					Submit
				</button>
			</form>
		</div>
	);
}

export default Login;
