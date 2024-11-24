import { useEffect, useState } from "react";

const useWorkspace = (workspaceId: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [workspaceData, setWorkspaceData] = useState<any>(null);

  useEffect(() => {
    const getWorkspace = async () => {
      try {
        setLoading(true);
        const resp = await fetch("/api/workspace/" + workspaceId);
        const respData = await resp.json();
        setWorkspaceData(respData.data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getWorkspace();
  }, [workspaceId]);

  return { loading, error, workspaceData };
};

export default useWorkspace;
