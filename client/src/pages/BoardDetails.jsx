import React from 'react'

function BoardDetails() {
  return (
    <div>
      <h2>Board Tasks</h2>
      <div>{["todo", "in-progress" , "done"].map((status) =>(
        <div key={status}>
            <h3>{status}</h3>
            {tasks.filter((t)=> t.status === status)
            .map((task)=>(
                <div>
                    <p>{task.title}</p>
                    <p>{task.description}</p>
                </div>
            ))}
        </div>
      ))}
      </div>
    </div>
  )
}

export default BoardDetails
