import "firebase/firestore";
import "firebase/auth";

import { addDoc, collection} from "firebase/firestore";
import { onSnapshot, query } from "firebase/firestore";
import type { PlasmoContentScript, PlasmoGetInlineAnchor } from "plasmo";
import { useEffect, useState } from "react";



import { useStorage } from "@plasmohq/storage/hook";



import { db } from "../firebase";





export const config: PlasmoContentScript = {
  matches: ["https://www.linkedin.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(".pv-top-card-v2-ctas .pvs-profile-actions ")

export const getShadowHostId = () => "h2"
const PlasmoInline = () => {

const [user] = useStorage("userData")

if (user) {
    console.log(user)
  } else {
    console.log("No user is currently logged in")
  }
  const [profileDetails, setProfileDetails] = useState({
    fullname: "",
    headline: "",
    experience: "",
    volunteering: "",
    currentCompany:"",
    previousCompany:""
  })


  const handleSaveProfile = async (e) => {
    e.preventDefault()
    if (!user) {
      alert("Please log in to save the profile.")
      return
    }

      const existingProfile = todos.find((todo) => todo.userId === user.uid && todo.fullname === profileDetails.fullname);
    if (existingProfile) {
      alert("Profile already exists!");
      return;
    }

    try {
      await addDoc(collection(db, "profile"),{
        userId: user.uid,
        fullname: profileDetails.fullname,
        headline: profileDetails.headline,
        experience: profileDetails.experience,
        volunteering: profileDetails.volunteering,
        currentCompany: profileDetails.currentCompany,
        previousCompany: profileDetails.previousCompany
        // createdAt: firebase.firestore().FieldValue.serverTimestamp()
      })
      alert("Profile saved successfully!")
    } catch (error) {
      console.error("Error saving profile: ", error)
      alert("Error saving profile, please try again later.")
    }
  }


  
  var x 
   
  var y 
   
  var z 
   
  var a
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
          setTimeout(() => {
            setProfileDetails({
              fullname: document.querySelector(
                ".pv-top-card .text-heading-xlarge"
              ).textContent,
              headline: document.querySelector(".pv-top-card .text-body-medium")
                .textContent
                ? document.querySelector(".pv-top-card .text-body-medium")
                    .textContent
                : "no headline",
              experience:
                ((x =
                  document === null || document === void 0
                    ? void 0
                    : document.querySelector("#experience")) === null ||
                x === void 0
                  ? void 0
                  : x.parentElement.querySelector(
                      " div.pvs-list__outer-container > ul"
                    ).innerHTML) || "",
              volunteering:
                (y =
                  document === null || document === void 0
                    ? "no volunteering"
                    : document.querySelector("#volunteering_experience")) ===
                  null || y === void 0
                  ? "no volunteering"
                  : y.parentElement.querySelector(
                      " div.pvs-list__outer-container > ul"
                    ).innerHTML || "no volunteering",
              currentCompany:
                (z =
                  document === null || document === void 0
                    ? "unemployed"
                    : document.querySelector("#experience")) === null ||
                z === void 0
                  ? "unemployed"
                  : z.parentElement.querySelector(
                      "div.pvs-list__outer-container > ul > li:nth-child(1) > div > div.display-flex.flex-column.full-width.align-self-center > div > div.display-flex.flex-column.full-width > span:nth-child(2) > span:nth-child(1)"
                    ).innerHTML || "unemployed",
              previousCompany:
                (a =
                  document === null || document === void 0
                    ? "no previous company"
                    : document.querySelector("#experience")) === null ||
                a === void 0
                  ? "no previous company"
                  : a.parentElement.querySelector(
                      " div.pvs-list__outer-container > ul > li:nth-child(2) > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > span:nth-child(2) > span:nth-child(1)"
                    ).innerHTML || "no previous company"
            })
          },3000)
        }, [])
        console.log(profileDetails)

  return user?user.displayName===profileDetails.fullname? "":<button style={{alignItems: "center", backgroundColor: "#0A66C2",borderRadius: '100px', color: "#ffffff",fontSize: "16px",fontWeight: 600, padding:"8px",  overflow: "hidden", fontFamily: '-apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif', boxShadow:"none"}}  onClick={handleSaveProfile}>Save profile</button>:""
}

export default PlasmoInline


  // profileDetails.currentCompany,
  //         profileDetails.experience,
  //         profileDetails.fullname,
  //         profileDetails.headline