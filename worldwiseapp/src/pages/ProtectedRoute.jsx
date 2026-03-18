import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
	const { isAuthemticated } = useAuth();
	const navigate = useNavigate();

	useEffect(
		function () {
			if (!isAuthemticated) navigate("/");
		},
		[isAuthemticated, navigate]
	);

	return isAuthemticated ? children : null;
}

export default ProtectedRoute;
