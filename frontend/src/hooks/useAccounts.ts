import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import type { IAccount } from "@/types/accounts";
import { getAccounts } from "@/services/accountsService";

export const useAccounts = () => {
  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getAccounts(API_URL, token);
      setAccounts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [token]);

  return {
    accounts,
    loading,
    error,
    refresh: fetchAccounts,
  };
};