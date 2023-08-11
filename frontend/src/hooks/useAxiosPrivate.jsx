import { axioPrivate } from "../api";
import useRefreshToken from "./useRefreshToken";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axioPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axioPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;
        if (err?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axioPrivate(prevRequest);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axioPrivate.interceptors.request.eject(requestIntercept);
      axioPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axioPrivate;
};

export default useAxiosPrivate;
