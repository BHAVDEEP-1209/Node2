import axios from "axios";

export const fetchData=(name)=>(axios.post("http://localhost:5000/homepage",{name : name}))
   


