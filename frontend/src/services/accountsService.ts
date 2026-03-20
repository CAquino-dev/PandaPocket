import axios from "axios";
import type { IAccount, AccountType } from "../types/accounts";

type CreateAccountBody = {
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
};

type UpdateAccountBody = {
  name?: string;
  type?: AccountType;
  balance?: number;
  currency?: string;
};

export const getAccounts = async (API_URL: string, token: string) => {
  const res = await axios.get<IAccount[]>(`${API_URL}/api/accounts`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

export const createAccount = async (
  API_URL: string,
  token: string,
  body: CreateAccountBody
) => {
  const res = await axios.post<IAccount>(`${API_URL}/api/accounts`, body, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

export const updateAccount = async (
  API_URL: string,
  token: string,
  accountId: string,
  body: UpdateAccountBody
) => {
  const res = await axios.put<IAccount>(
    `${API_URL}/api/accounts/${accountId}`,
    body,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data;
};

export const deleteAccount = async (
  API_URL: string,
  token: string,
  accountId: string
) => {
  await axios.delete(`${API_URL}/api/accounts/${accountId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};