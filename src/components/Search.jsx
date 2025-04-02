import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

export default function Search(){
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams,setSearchParams] = useSearchParams()

  function handleKeyPress(e){
    if(e.key === "Enter"){
      const query = e.target.value
      if(location.pathname === "/posts"){
        setSearchParams({...Object.fromEntries(searchParams), search:query})
      }else{
        navigate(`/posts?search=${query}`)
      }
    }
  }

    return <div className='bg-gray-100 p-2 rounded-full flex items-center gap-2'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width='20'
          height='20'
          viewBox="0 0 24 24"
          fill="none"
          stroke='black'
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input type='text' placeholder="Search a post..." className="bg-transparent" onKeyDown={handleKeyPress}/>
    </div>
}