import { GoogleAuthProvider, User, browserLocalPersistence, onAuthStateChanged, setPersistence, signInWithCredential } from "firebase/auth";
import { useEffect, useState } from "react";
import { useStorage } from "@plasmohq/storage/hook";
import { auth } from "./firebase";





// setPersistence(auth, 'LOCAL')
setPersistence(auth, browserLocalPersistence)
function IndexPopup() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User>(null)
const [userData, setUserData] = useStorage("userData", (v) =>
  v === null
)
const [loading, setLoading] = useStorage("loading", (v) =>
  v === false
)


  const onLogoutClicked = async () => {
    if (user) {
      await auth.signOut()
    }
  }

  const onLoginClicked = () => {
    chrome.identity.getAuthToken({ interactive: true }, async function (token) {
      if (chrome.runtime.lastError || !token) {
        console.error(chrome.runtime.lastError)
        setIsLoading(false)
        setLoading(false)
        return
      }
      if (token) {
        const credential = GoogleAuthProvider.credential(null, token)
        try {
          await signInWithCredential(auth, credential)
        } catch (e) {
          console.error("Could not log in. ", e)
        }
      }
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoading(false)
      setUser(user)
      setUserData(user)
      setLoading(false)
    })
  }, [])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h1>
        Welcome to your Linkedin Extension!
      </h1>
      {!userData ? (
        <button
          onClick={() => {
            setLoading(true)
            onLoginClicked()
          }}>
          Log in
        </button>
      ) : (
        <button
          onClick={() => {
            setLoading(true)
            onLogoutClicked()
          }}>
          Log out
        </button>
      )}
      <div>
        {loading ? "Loading..." : ""}
        {!!userData ? (
          <div>
            Welcome to Plasmo, {userData.displayName} your email address is{" "}
            {userData.email}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default IndexPopup