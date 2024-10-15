import {Client,ID,Databases,Storage,Query} from 'appwrite';
import conf from '../config/config';


export class Service {
    client = new Client();
    database;
    bucket; // storage

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

       this.database = new Databases(this.client)
       this.bucket = new Storage(this.client)
    }

    
    async createPost({title,slug,content,featuredImg,status,user_id}){
          try {
            const createPostResp = await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,content,featuredImg,status,user_id
                }
              )

              if(createPostResp){
                console.log("Post created Successfully !!! :: ",createPostResp);
              }else{
                console.log("create Post unsuccessful :: ",createPostResp);
              }

              return createPostResp;

          } catch (error) {
            console.log("Error :: configuration.js :: createPost :: ",error); 
          }
    }

    // DOUBT : is any plus point to keep slug outside of object maybe it is easy to keep it seprate     
    // NOTE : we want only user to update his post so we are not giving user_id in this. If other can edit then we have to give user_id 
    //TODO : Try it by giving user__id and see the change and try to create a functionality that other can request for a change and it will be update when owner allow for it 
    async updatePost(slug , {title,content,featuredImg,status}){
        try {
            const updatePostResp = await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,content,status,featuredImg
                }
            )

            if(updatePostResp){
                console.log("Post update Successfully :: ",updatePostResp);
            }else{
                console.log("Retry to Update Post ::  ",updatePostResp);
            }

            return updatePostResp;

        } catch (error) {
            console.log("Error :: configuration.js :: updatePost :: ",error);
        }
    }


    async deletePost(slug){
        try {
            const deletePostResp = await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

            if(deletePostResp){
                console.log("Post deleted :: ",deletePostResp);
            }else{
                console.log("Try Again to delete :: ",deletePostResp);
            }

            return true;
        } catch (error) {
             console.log("Error :: configuration.js :: deletePost :: ",error);

             return false;
        }


    }


    async getPost(slug){
        try {
            const getPostResp = await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

            if(getPostResp){
                console.log("Post fetched :: ",getPostResp);
            }else{
                console.log("Retry getPost :: ",getPostResp);
            }

            return true;
        } catch (error) {
            console.log("Error :: configuration.js :: getPost :: ",error);
            return false;
        }
    }
  

   // NOTE : For query to run the following key should be in indexes in appwrite then only it an be run 
    async getPosts(defQueries = [Query.select("status","active")]){
        try {
            const getPostsResp = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                defQueries
            )
           
            if(getPostsResp){
                console.log("Posts fetched :: ",getPostsResp);
            }else{
                console.log("Retry getPosts :: ",getPostsResp);
            }

            return getPostsResp;
        } catch (error) {
            console.log("Error:: configuration.js  :: getPosts :: ",error);
        }
    }


    // File upload service / method //TODO : further we have to put this service in seprate file  
   
    async uploadFile(file){
        try {
            const uploadFileResp = await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
         
            if(uploadFileResp){
                console.log("File uploaded :: ",uploadFileResp);
            }else {
                console.log("Retry File upload :: ",uploadFileResp);
            }

            return uploadFileResp;
        } catch (error) {
            console.log("Error :: configuration.js :: uploadFile :: ",error);

            return false;
        }
    }


    async deleteFile(fileId){
        try {
            const deleteFileResp = await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            )

            if(deleteFileResp){
                console.log("File deleted Successfully :: ",deleteFileResp);
            }else{
                console.log("Retry to delete :: ",deleteFileResp);
            }

            return true;
        } catch (error) {
            console.log("Error :: configuration.js :: deleteFile :: ",error);

            return false;
        }
    }

    
    getFilePreview(fileId){
      try {
        const getFilePreviewResp = this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileId
        )

        return getFilePreviewResp;
      } catch (error) {
        console.log("Error :: configuration.js :: getFilePreview :: ",error);
        return false;
      }
    }


    

};

const appWriteService = new Service();

export default appWriteService;