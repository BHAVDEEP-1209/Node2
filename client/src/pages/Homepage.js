import React, { useEffect, useState } from 'react'
import axios from "axios"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Space, Typography, Button } from "antd";
import { Input } from 'antd';
import "../Styles/Homepage.scss"
import {handleLogOut2} from "../slices/userSlice"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {fetchData} from '../utils/utils';

const { Text, Link } = Typography;
const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [weatherData,setData] = useState({});
  const [name,setName] = useState("");
  const [click,setClick] = useState(false);
  const handleClick=()=>{
    setClick(!click);
  }

  useEffect(()=>{
    const getData =async()=>{
      const q = name=="" ? "kolkata" : name;
      try{
        // const result = await axios.post("http://localhost:5000/homepage",{name : q});
        const result = await fetchData(q);

        // const result = await getData(q);
        // const data = await result.();
        if(result.status==201){
          setData(result.data);
          console.log(result.data);
        }else{
          window.alert("Data Not Found!");
        }
      }catch(err){
        console.log(err);
      }
    }
    getData();
  },[click])

  const handleChange=(e)=>{
    setName(e.target.value);
  }
  const handleLogOut=()=>{
    dispatch(handleLogOut2());
    navigate("/");
  }


  return (
    // <div>
    //     <h1>
    //       <input type="text" name="name" onChange={(e)=>setName(e.target.value)} value={name}/>
    //       <button onClick={handleClick}>submit</button>
    //     </h1>
    // </div>
    <div className="custom_card">
      <button className='logOut' onClick={handleLogOut}>Log Out</button>
    <div className="img_div">
      <div className="header">
        <Space direction="vertical">
        <Text className="smallest_text">Today's Weather</Text>
          <Text className="text">
            {Math.round(weatherData?.temperature-273.15)} &#176;
          </Text>
          <Text className="small_text"></Text>
          <div className="info1">
            <Button type="primary" className="btn">
              Humidity :
            </Button>
            <Text className="smallest_text">{weatherData?.humidity} mm</Text>
          </div>
          <div className="info">
            <Button type="primary" className="btn">
              Pressure:
            </Button>
            <Text className="smallest_text">{weatherData?.pressure} mb</Text>
          </div>
          <div className="info">
            <Button type="primary" className="btn">   
              windSpeed
            </Button>
            <Text className="smallest_text">{weatherData?.windSpeed} kmph</Text>
          </div>
          <div className="info">
            <Button type="primary" className="btn">
              description
            </Button>
            <Text className="smallest_text description">{weatherData?.description}</Text>   
          </div>
        </Space>
        
      </div>
      <div className="header_right">
      <LocationOnIcon sx={{fontSize: 30}}/>
      <Text className="small_text">{weatherData?.name}</Text>
      </div>
    </div>
    <div className="footer">
      <Input placeholder="enter the city name" value={name}  className="input_city" onChange={handleChange}/>
      <Button type="primary" className="btn" onClick={handleClick}>search</Button>
    </div>
    
  </div>
  )
}

export default Homepage