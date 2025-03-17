import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetWorkspaces = () => {
  const query = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const res = await client.api.workspaces.$get();
      console.log(res);

      if (!res.ok) {
        return null;
      }
      const { data } = await res.json();

      return data;
    },
  });
  return query;
};
