import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { hydrateRoot } from 'react-dom/client'

function App() {
  const [inputValue, setinput] = useState("")
  const [data, setData] = useState({});
  const [err, seterr] = useState({})

  const getData = async () =>{
    try {
      if (!inputValue) {
        console.error("Input value is empty");
        alert("Please enter a GitHub username");
        return;
      }
      const response = await axios.get(`https://api.github.com/users/${inputValue}`);
      // console.log(response.status);
      const userData = response.data;
      setData({...userData});
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error, error.status);
      if( error.status === 404) {
        alert("User not found");
        setData({})
        seterr({msg : "User not found"})
      }else if(error.message === "Network Error"){
        seterr({msg : "No Internet"})
      }
    }
  }

  return (
    <>
      <div className='navebar'>
        <input type="text" placeholder='search git profile' onChange={(e)=> setinput(e.target.value)}/>
        <button onClick={getData}>🔍</button>
      </div>
      {Object.keys(data).length > 0 ? <div className="card">
      <img src={data.avatar_url} alt="Avatar" style={{ width: '100px', borderRadius: '50%' }} />
      <h2>{data.name}</h2>
      <p><strong>Username:</strong> {data.login}</p>
      <p><strong>Bio:</strong> {data.bio}</p>
      <p><strong>Location:</strong> {data.location}</p>
      <p><strong>Company:</strong> {data.company}</p>
      <p><strong>Repos:</strong> {data.public_repos}</p>
      <p><strong>Followers:</strong> {data.followers}</p>
      <p><strong>Following:</strong> {data.following}</p>
      <a href={data.blog} target="_blank" rel="noreferrer">Visit Blog</a><br />
      <a href={data.html_url} target="_blank" rel="noreferrer">View GitHub Profile</a>
      </div> : Object.keys(err).length > 0 ? <h1 className='searchPro' >{err.msg}</h1> : <h1 className='searchPro' >Search GitHub Profile</h1> }
       
    </>
  )
}

export default App
