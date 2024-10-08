import { useEffect, useRef, useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.coms";
interface Post {
    id: number
    title: string
}
export default function FetchData() {
    const [isLoading,setIsLoading] = useState(false)
    const [Posts,setPosts] = useState<Post[]>([])
    const [error, setError] = useState()
    const abortControllerRef = useRef<AbortController | null>(null)

    useEffect(()=> {
        const fetchData = async() => {
          abortControllerRef.current?.abort();
          abortControllerRef.current = new AbortController();

            setIsLoading(true)
            try {
              const response = await fetch(`${BASE_URL}/posts`, {
                signal: abortControllerRef.current?.signal,
              })
              const posts = await response.json() as Post[];
              setPosts(posts)
            } catch (err: unknown) {
              setError(err)
            }
            setIsLoading(false)
        }
        fetchData();
    },[])

    if(isLoading) {
        return <div className="bg-slate-950 h-screen text-white text-3xl text-center pt-28">Loading.......</div>
    }

    if(error){
      return <div className="bg-slate-950 h-screen text-white text-3xl text-center pt-28">Something went wrong! try again later</div>
    }
  return (
    <div className="bg-slate-950 h-screen text-white text-3xl text-center pt-28">
        <h1>Fetching data in React</h1>
      <ul className="mb-4 text-2xl">
        {
            Posts.map(post => {
                return <li key={post.id}>{post.title}</li>
            })
        }
      </ul>
    </div>
  )
}
