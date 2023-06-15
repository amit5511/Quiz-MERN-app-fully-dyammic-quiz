import React, { useEffect, useState } from 'react'

const LeaderBoard = () => {
  const[data,setdata]=useState([]);
     const apifun=async()=>{
     
        let d=await fetch('http://localhost:5000/api/response/get-all-response');
        d = await d.json();
        setdata(d.data);
       // console.log(data,d)
     }
  useEffect(()=>{
      apifun();
  },[])


  return <>
       <div style={{display:'grid',gridTemplateColumns:'1 fr 1fr 1fr'}}>
       <div style={{display:'flex',justifyContent:'space-around' ,backgroundColor:'brown',color:'white'}}>
          <div>USER ID</div>
          <div>Quix ID</div>
          <div>SCORE</div>
          </div>
      { // console.log(data)
        data.map(it =>(
          <>
          <div style={{display:'flex',justifyContent:'space-around',backgroundColor:'blueviolet',color:'white'}}>
          <div>{it.user}</div>
          <div>{it.quizId}</div>
          <div>{it.score}</div>
          </div>
          <hr/>
          </>
        ))
      }
      </div>
    
  </>
  
}

export default LeaderBoard