import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    !auth?.token ? verifyRefreshToken() : setIsLoading(false);
  }, [auth, refresh]);

  return (
    <>
      {isLoading ? (
        <div>
          <ClipLoader
            color={"#6c63ff"}
            loading={isLoading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
