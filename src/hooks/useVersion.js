import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "@env";
import { compareVersions } from "../utils/compareVersions";

const useVersion = () => {
  const [update, setUpdate] = useState(null);
  const [error, setError] = useState(null);
  const [newVersion, setNewVersion] = useState({});
  const appVersion = "1.5.0";

  useEffect(() => {
    const getUpdate = async () => {
      try {
        const response = await axios.get(URL);
        setNewVersion(response.data);

        if (response.data && response.data.version) {
          const result = compareVersions(appVersion, response.data.version);
          setUpdate(result === -1);
        }
      } catch (error) {
        setError({ status: true, msg: error.message });
      }
    };
    getUpdate();
  }, []);

  return { update, newVersion, error };
};

export default useVersion;
