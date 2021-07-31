import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    function fetchData() {
      axios
        .get("/users/current")
        .then((res) => {
          if (isMounted) {
            setUser(res.data.item);
            setLoading(false);
          }
        })
        .catch(() => {
          setLoading(false);
        });
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);
  const logout = async () => {
    try {
      await axios.get("/users/logout");
      toast("Successfully logged out");
      setUser(null);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return { user, logout, loading };
};

export default useAuth;
