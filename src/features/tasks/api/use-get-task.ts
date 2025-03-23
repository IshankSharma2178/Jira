import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

interface useGetTaskProp {
  taskId: string;
}

export const useGetTask = ({ taskId }: useGetTaskProp) => {
  const query = useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const res = await client.api.tasks.$get({
        query: { taskId },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const { data } = await res.json();
      return data;
    },
  });
  return query;
};
