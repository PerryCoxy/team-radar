import axios from "axios";
import { BacklogResponse } from '../types';

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const fetchBacklog = async (): Promise<BacklogResponse> => {
  const res = await api.get("/backlog?sprint=66");
  return res.data;
};
