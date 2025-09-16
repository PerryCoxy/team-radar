import axios from "axios";
import { BacklogResponse } from '../types';

export const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? '/api'  // В Docker используем прокси через Nginx
    : "http://localhost:3000",  // В разработке прямой доступ
});

export const fetchBacklog = async (sprint: number): Promise<BacklogResponse> => {
  const res = await api.get(`/backlog?sprint=${sprint}`);
  return res.data;
};
