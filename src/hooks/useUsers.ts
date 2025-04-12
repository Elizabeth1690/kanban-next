import { useState, useEffect } from "react";
import { User } from "@/type/user";

const API = process.env.NEXT_PUBLIC_API_URL as string;

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API}/user`);
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error al cargar usuarios", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  return { users, loading };
};
