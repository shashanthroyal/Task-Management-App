import { useState , useEffect } from 'react'
import {Link} from 'react-router-dom'
import api from '../api/axios'

function Boards() {

    const [boards , setBoards] = useState([]);

    useEffect(()=>{
        api.get("/boards").then((res) => setBoards(res.data));
    }, [])
  return (
    <div>
      <h1>MY Boards</h1>
      <ul>{boards.map((b)=>(
        <li key={b._id}>
            <Link to={ `/board/${b._id}`}>{b.name}</Link>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default Boards
