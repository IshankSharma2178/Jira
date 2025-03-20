import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetProjects = (workspaceId: string) => {
  const query = useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      const response = await client.api.projects.$get({
        query: { workspaceId },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
