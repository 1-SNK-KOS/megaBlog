import { useCallback, useEffect } from "react" 
import {useForm } from 'react-hook-form'
import appWriteService from '../../appwrite/configuration'
import { useSelector } from "react-redux"
import {Button , Input , Select , RTE} from '../index'
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types'


function PostForm({post}) {

    const navigate = useNavigate();
    const userData = useSelector(state => state.userData.userData);
    console.log("Post Form :: userData",userData.$id);

    const {register , handleSubmit , setValue , getValues , watch , control} = useForm({
        defaultValues : {
            title: post?.title || '',
            slug : post?.$id || '',
            content : post?.content || '',
            status : post?.status || 'active',
        },
    });


    const submit = async (data) => {
        // Case 1 : post request for update
        if(post){
                //file handling
                const file = data.image[0]? await appWriteService.uploadFile(data.image[0]) :null;

                if(file){
                    //prev file delete
                    appWriteService.deleteFile(post.featuredImage);
                }
//REVIEW : while updating if file is null to be sure that featuredImg should be not delete I have done this (featuredImg:file?file.$id:post.featuredImage) , we will see what happens if we define undefined there at false condition

                    // update post in DB
                const dBPost = await appWriteService.updatePost(post.$id,
                    {...data,
                    featuredImg:file?file.$id:post.featuredImage
                });
                     //if successfully updated then direct to post
                if(dBPost){
                    navigate(`/post/${dBPost.$id}`)
                }
        }
        else{
                const file =  await appWriteService.uploadFile(data.image[0]);
                    
                if(file){
                    console.log("data ::" ,data,userData.id);
                    data.featuredImg = file.$id;
                    
                        const dBPost = await appWriteService.createPost({...data,user_id:userData.$id})

                        if(dBPost)navigate(`/post/${dBPost.$id}`)
                }
                else{
                    console.log('Insert File');
                    throw new Error("Upload Image");
                    
                }
        }
    };

    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string')
        return value
                .trim()
                .toLowerCase()
                .replace(/[^A-Za-z\d\s]+/g,'-')
                .replace(/\s/g,'-');
 
        return ""
    },[])

    //NOTE : Interview ques helper too concept of useEffect's unsubscription method for memory management so that the function doesn't re-render itself again and again

    useEffect(() => {
            const subscription = watch((value,{name}) => {
                console.log('watch :: slug :: PostForm ::') //REVIEW
                        if(name === 'title'){
                            console.log('watch :: slug :: PostForm :: if-condition :: ',name,value); //REVIEW
                            setValue('slug',slugTransform(value.title),{shouldValidate:true});
                        }
                        console.log('subscription :: slug :: PostForm :: ',subscription); //REVIEW
                return () => subscription.unsubscribe();
            })
    },[watch,slugTransform,setValue])



return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    <div className="w-2/3 px-2">
        <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
                console.log('onInput :: slug :: PostForm ::') //REVIEW
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
    </div>
    <div className="w-1/3 px-2">
        <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={appWriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
            {post ? "Update" : "Submit"}
        </Button>
    </div>
</form>
)
}

PostForm.propTypes = {
    post : PropTypes.object
}

export default PostForm