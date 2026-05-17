import { useEffect, useState } from "react";

import { getMyInformationPageData } from "../api/myInformationApi";

export function useMyInformation() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadMyInformationData() {
      try {
        setLoading(true);
        setError(null);

        const myInformationData = await getMyInformationPageData();

        if (!ignore) {
          setData(myInformationData);
        }
      } catch (err) {
        if (!ignore) {
          setError(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadMyInformationData();

    return () => {
      ignore = true;
    };
  }, []);

  const empty =
    !loading &&
    !error &&
    (!data || !data.profile || !data.learningProfile);

  return {
    data,
    loading,
    error,
    empty,
  };
}