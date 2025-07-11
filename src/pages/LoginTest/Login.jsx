import React, { useState } from "react";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleSub = (e) => {
		e.preventDefault();
		console.log(email,password);
        
	};
	return (
		<div>
			<form onSubmit={handleSub}>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e?.target?.value)}
					name="email"
					placeholder="email"
				/>
				<input
					type="password"
					value={password}
					name="password"
					onChange={(e) => setPassword(e?.target?.value)}
					placeholder="password"
				/>
				<button className="btn btn-secondary">Click</button>
			</form>
		</div>
	);
};

export default Login;
