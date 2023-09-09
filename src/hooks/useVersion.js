import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "@env";
import Constants from "expo-constants";
import { compareVersions } from "../utils/compareVersions";

const useVersion = () => {
  const [update, setUpdate] = useState(null);
  const [newVersion, setNewVersion] = useState({});
  const appVersion = Constants.manifest2.extra.expoClient.version;

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
        throw error;
      }
    };
    getUpdate();
  }, []);

  return { update, newVersion };
};

export default useVersion;
