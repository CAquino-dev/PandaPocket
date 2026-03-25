import axios from "axios";
import type { Category } from "@/types/transactions";

export const getCategories = async (API_URL: string, token: string) => {
  const res = await axios.get(`${API_URL}/api/category/getCategories`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data as Category[];
};

export const createCategory = async (
    API_URL: string, 
    token: string, 
    body: any
) => {
    try {
        const res = await axios.post(
            `${API_URL}/api/category/createCategory`,
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization:  `Bearer ${token}`,
                },
            },
        )
        return res.data;   
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "Failed to create category");
    }
}