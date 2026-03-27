import { useEffect, useState } from "react";
import client from "../api";

function UserList({ trigger }) {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const loadUsers = async () => {
    try {
      const res = await client.get(`/?page=${page}&search=${query}`);
      setList(res.data);
    } catch {
      alert("Error loading users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page, query, trigger]);

  const removeUser = async (id) => {
    try {
      await client.delete(`/${id}`);
      loadUsers();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div>
      <input
        placeholder="Search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
      />

      {list.map((u) => (
        <div key={u.id}>
          {u.name} - {u.email} - {u.age}
          <button onClick={() => removeUser(u.id)}>Delete</button>
        </div>
      ))}

      <div style={{ marginTop: "10px" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <button
          disabled={list.length < 5}
          onClick={() => setPage(page + 1)}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UserList;