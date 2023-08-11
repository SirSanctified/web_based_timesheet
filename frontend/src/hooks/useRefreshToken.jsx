import { api as axios } from "../api";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get('/refresh-token', {
      withCredentials: true
    });
    setAuth(prev => {
      return {
        ...prev,
        token: response.data.token
      }
    });
    return response.data.token;
  }
  return refresh;
};

export default useRefreshToken;
