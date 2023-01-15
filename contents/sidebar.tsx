import cssText from "data-text:~/contents/sidebar.css";
import { collection} from "firebase/firestore"
import { onSnapshot, query} from "firebase/firestore";
import type { PlasmoContentScript } from "plasmo";
import { useEffect, useState } from "react";

import { db } from "../firebase";


// Inject to the webpage itself
import "./sidebar-base.css";
import { useStorage } from "@plasmohq/storage/hook";





export const config: PlasmoContentScript = {
  matches: ["https://www.linkedin.com/*"]
}

// Inject into the ShadowDOM
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getShadowHostId = () => "plasmo-google-sidebar"

const GoogleSidebar = () => {
  const [user] = useStorage("userData")
    const [isOpen, setIsOpen] = useState(false)

const [todos, setTodos] = useState([])
  useEffect(() => {
    const q = query(collection(db, "profile"))
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = []
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id })
      })
      console.log(user.displayName)
         const filteredData = todosArray.filter(
         (data) => data.userId === user.uid
       );
       setTodos(filteredData);
      // setTodos(todosArray);
    })
    return () => unsub()
  }, [user])
  console.log(todos)
  useEffect(() => {
    document.body.classList.toggle("plasmo-google-sidebar-show", isOpen)
  }, [isOpen])

  return (
    <div id="sidebar" className={isOpen ? "open" : "closed"}>
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "🟡 Close" : "🟣 Open"}
      </button>
        <ul style={{paddingRight:"24px"}}>
        {todos.map((todo, index) => (
          <div>
             <h1>{todo.fullname}</h1>
             <h4>{todo.headline}</h4>
            <h4>{todo.currentCompany.replace(/<!---->/g, "")}</h4>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default GoogleSidebar