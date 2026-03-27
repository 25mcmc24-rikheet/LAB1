import { useState } from "react";
import client from "../api";

function UserForm({ refreshList }) {
  const [data, setData] = useState({ name: "", email: "", age: "" });
  const [msg, setMsg] = useState("");

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addUser = async () => {
    try {
      if (!data.name || !data.email || !data.age) {
        setMsg("Fill all fields");
        return;
      }

      await client.post("/", data);

      setData({ name: "", email: "", age: "" });
      setMsg("");
      refreshList();
    } catch {
      setMsg("Failed to add user");
    }
  };

  return (
    <div>
      {msg && <p>{msg}</p>}

      <input name="name" placeholder="Name" value={data.name} onChange={handleInput} />
      <input name="email" placeholder="Email" value={data.email} onChange={handleInput} />
      <input name="age" placeholder="Age" value={data.age} onChange={handleInput} />

      <button onClick={addUser}>Add</button>
    </div>
  );
}

export default UserForm;