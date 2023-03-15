import React from 'react'
import '../main/dashbord.css'
const Dashbordcard =  ({ title, value }) => {
  return (
    <div>
         <div className="dashboard-card">
              <h2>{title}</h2>
               <p>{value}</p>
        </div>
    </div>
  )
}

export default Dashbordcard