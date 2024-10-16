import {useState , useEffect} from 'react'
import appWriteService from '../appwrite/configuration'
import {Container,PostCard} from '../components'

function AllPosts() {
    const [posts,setPosts] = useState([]);

    useEffect(() => {
        appWriteService.getPosts([])
                    .then((posts) => {
                        if(posts)setPosts(posts.documents);
                        })
    },[]) //Doubt: Why are we using it without anything inside it

    


return (
    <div className='w-full py-8'>
    <Container>
        <div className='flex flex-wrap'>
            {posts && posts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard {...post}/>
                </div>
            ))}
        </div>
            </Container>
    </div> 
)
}

export default AllPosts