import { rejects } from "assert";
import { Task } from "../type/task";

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("taskDB", 2);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("tasks")) {
        db.createObjectStore("tasks", { keyPath: "id" });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const saveToIndexedDB = (key: string, value: Task[]) => {
  const request = indexedDB.open("taskDB", 1);
  request.onupgradeneeded = () => {
    request.result.createObjectStore("tasks", { keyPath: "id" });
  };
  request.onsuccess = async () => {
    const db = await openDB();
    const tx = db.transaction("tasks", "readwrite");
    const store = tx.objectStore("tasks");

    value.forEach((task) => store.put(task));
  };
};

export const getFromIndexedDB = async (): Promise<Task[]> => {
  const db = await openDB();
  const tx = db.transaction("tasks", "readonly");
  const store = tx.objectStore("tasks");

  const request = store.getAll();
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
