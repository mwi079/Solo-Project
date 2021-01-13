// this provider is responsible for bootstrapping the user's data if token is in localStorage
// createContext, useContext,
import { useEffect, useState } from "react";
import { getProfile } from "../services/ApiClientService";

// const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState({
    name: "",
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    const getUserProfile = async (accessToken) => {
      const userCredentials = await getProfile(accessToken);

      if (userCredentials) {
        const { name } = userCredentials;
        setUser((prevState) => {
          return {
            ...prevState,
            name,
          };
        });
      }
    };

    getUserProfile(accessToken);
  }, []);
}

export { AuthProvider };
