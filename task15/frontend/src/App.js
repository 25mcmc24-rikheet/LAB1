import { useState } from "react";
import Form from "./components/UserForm";
import List from "./components/UserList";

function App() {
  const [flag, setFlag] = useState(false);

  const reloadUsers = () => {
    setFlag(!flag);
  };

  return (
    <div style={{ padding: "25px", backgroundColor: "#f2f2f2" }}>
      <h2>My CRUD Dashboard</h2>

      <Form refreshList={reloadUsers} />
      <List trigger={flag} />
    </div>
  );
}

export default App;