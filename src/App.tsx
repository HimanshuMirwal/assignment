import Layout from "./Components/Layout"
import Stories from "./Components/Stories";
import "./styles/global.scss";
import users from "../user.json";
function App() {
  return (
    <>
     <Layout>
        <Stories users={users.users} />
       </Layout>
    </>
  )
}

export default App
