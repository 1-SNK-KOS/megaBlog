import { useEffect , useState } from "react";
import { useNavigate, useParams ,Link } from "react-router-dom";
import parse from 'html-react-parser'
import appWriteService from "../appwrite/configuration";
import { Container , Button } from "../components";
import { useSelector } from "react-redux";


function Post() {

    const userData = useSelector(state => state.userData.userData);
    const navigate = useNavigate();
    const {slug} = useParams();
    const [post,setPost] = useState(null);


    useEffect(() => {
            if(slug){
                appWriteService.getPost(slug).then((post) => {
                    if(post)setPost(post);
                    else navigate('/')
                })
            }
            else navigate('/')
    },[slug,navigate])

    const isAuthor = post && userData? userData.$id === post.userId : false;

    const deletePost = () => {
            appWriteService.deletePost(post.$id).then((status) => {
            if(status){
                appWriteService.deleteFile(post.featuredImg);
                navigate('/')
            }})
    };

return post ?  (  
<div className="py-8">
<Container>
    <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
        <img src={appWriteService.getFilePreview(post.featuredImg)} 
            alt={post.title}  
            className="rounded-xl"
            />
                {
                    isAuthor && (
                        <div className="absolute right-6 top-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                    )
                }

                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">{console.log('here',post.content)}
                    {parse(JSON.stringify(post.content))}
                    </div>

        </div>
    </Container>
</div>        
)
: null;
    

}

export default Post