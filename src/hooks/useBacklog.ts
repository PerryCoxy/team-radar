import { useQuery } from "@tanstack/react-query";
import { fetchBacklog, fetchBacklogWithTransfers } from '../api/api';

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

export const useBacklogWithTransfers = (sprint: number) => {
  return useQuery({
    queryKey: ["backlog-with-transfers", sprint],
    queryFn: async () => {
      const data = await fetchBacklogWithTransfers(sprint);
      return data;
    },
    staleTime: 5 * 60 * 1000, // кэшируем на 5 минут (переносы не меняются часто)
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};
