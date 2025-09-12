import { useQuery } from "@tanstack/react-query";
import { fetchBacklog } from '../api/api';

export const useBacklog = (sprint: number) => {
  return useQuery({
    queryKey: ["backlog", sprint],
    queryFn: async () => {
      const data = await fetchBacklog(sprint);
      return data;
    },
    staleTime: 0,   // данные считаются устаревшими сразу
    refetchOnMount: true, // всегда перезапрашивать при монтировании
    refetchOnWindowFocus: false, // можно отключить авто-обновление при фокусе
  });
};
