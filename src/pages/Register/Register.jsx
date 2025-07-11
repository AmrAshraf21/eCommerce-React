import { useForm, useFieldArray } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "./../../components/context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
	const { register, watch, handleSubmit, formState, control } = useForm({
		defaultValues: {
			addresses: [{ address: "" }],
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const { fields, append, remove } = useFieldArray({ control, name: "addresses" });
	// console.log(formState.isDirty);

	const password = watch("password");

	const { signin } = useContext(AuthContext);
	const navigate = useNavigate();

	const onSubmit = (data) => {
		console.log(data);
		
		signin(data.email, data.password);
		navigate("/login");
	};
	return (
		<div className="container m-auto">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">User Name</label>
					<input
						type="text"
						className="form-control"
						{...register("username", {
							required: { value: true, message: "Username is required" },
							pattern: {
								value: /^[^\s]+$/,
								message: "username must not contain spaces",
							},
						})}
						placeholder="Enter username"
					/>
					{formState.errors.username && <small style={{ color: "red" }}>{formState.errors.username.message}</small>}
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Email address</label>
					<input
						type="email"
						className="form-control"
						aria-describedby="emailHelp"
						{...register("email", { required: true })}
						placeholder="Enter email"
					/>
					{formState.errors.email && <small style={{ color: "red" }}>email is required</small>}
				</div>

				<div className="form-group">
					<label htmlFor="exampleInputPassword1">Password</label>
					<input
						type="password"
						className="form-control"
						{...register("password", {
							required: {
								value: true,
								message: "password is required",
							},
							pattern: {
								value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/,
								message: "password must contain at least one uppercase, one number and one special character",
							},
						})}
						placeholder="Password"
					/>
					{formState.errors.password && <small style={{ color: "red" }}>{formState.errors.password.message}</small>}
				</div>

				<div className="form-group">
					<label>Confirm Password</label>
					<input
						type="password"
						className="form-control"
						{...register("confirmPassword", {
							required: {
								value: true,
								message: "confirm password is required",
							},
							validate: (val) => val === password || "password does not match",
						})}
						placeholder="Confirm Password"
					/>
					{formState.errors.confirmPassword && (
						<small style={{ color: "red" }}>{formState.errors.confirmPassword.message}</small>
					)}
				</div>
				{/* <div className="form-group">
					<label htmlFor="exampleInputEmail1">Address</label>
					<input
						type="text"
						className="form-control"
						aria-describedby="emailHelp"
						{...register("address", { required: true })}
						placeholder="Address"
					/>
					{formState.errors.address && <small style={{ color: "red" }}>Address is required</small>}
				</div> */}

				<div className="form-group">
					{fields.map((field, index) => (
						<div key={field.id}>
							<label>Address {index + 1}</label>
							<input
								placeholder="Address"
								className="form-control"
								{...register(`addresses.${index}.address`)}
								defaultValue={field.address}
							/>
							<button className="btn btn-primary" disabled={index === 0} type="button" onClick={() => remove(index)}>
								Remove
							</button>
							<button type="button" className="btn btn-secondary ms-3" onClick={() => append({ address: "" })}>
								Add an address
							</button>
						</div>
					))}
				</div>

				<button type="submit" className="btn btn-info text-white mt-2 px-4 py-2 rounded-2">
					Submit
				</button>
			</form>
		</div>
	);
};
