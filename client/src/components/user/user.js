import React from 'react'

export const Contact = (props) => {
    return (
      <div>
        <p className="my-0">{props.emailId}</p>
        <p className="my-0">India - {props.phone_no}</p>
      </div>
    );
  }
  
  export const Education = (props) => {
    return (
      <div>
        <p className="my-0">{props.college.name}</p> 
        <p className="my-0">
          {/* B.E. - Electronics and Telecommunication Engineering (EXTC/ECE) */}
          {props.branch}
        </p>
        <p className="my-0">{props.university_id}</p>
      </div>
    );
  }
  
  export const StudentInterests = (props) => {
    return props.interests.map((interest)=>(<p className="my-0">{interest}</p>));
  }
  
