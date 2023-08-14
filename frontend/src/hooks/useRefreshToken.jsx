import { axioPrivate as axios } from "../api";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get('/refresh-token');
    setAuth(response.data);
    return response.data.token;
  }
  return refresh;
};

export default useRefreshToken;
