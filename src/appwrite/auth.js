import {Client,Account,ID} from 'appwrite'
import conf from '../config/config';


export class AuthService{
   // prop
   client = new Client();  // if I put .setendpoint and other things then it is a waste of resources as we can defining before object is created i.e without anyone using it or going to use it, better it to define when object is instantiated and which function is call when object is made -> constructor
   account;

   constructor (){
     this.client
         .setEndpoint(conf.appwriteUrl)
         .setProject(conf.appwriteProjectId)

     this.account = new Account(this.client)
   }

  async createAccount({email,password,name}){
     try {
       const createAccResp =  await this.account.create(ID.unique(),email,password,name);

       if(createAccResp){
         // another method call
         console.log(`User created successfully !!! :: ${createAccResp}`);
         const innerLogin = this.login({email,password});
         console.log("Innerlogin :: ",innerLogin);
         return innerLogin;
       }else{
        console.log(`User creation fails :: createAccount :: ${createAccResp}`);
         return createAccResp;
       }

     } catch (error) {
        console.log("Error :: createAccount :: ",error)
        throw error;
     }
  }


  async login({email,password}){
    try {
       const loginResp =  await this.account.createEmailPasswordSession(email,password);
  
       if(loginResp){
           console.log("User login successfully :: ",loginResp)
       }else{
        console.log("user login failed :: ",loginResp)
       }
    } catch (error) {
        console.log("Error :: login :: ",error);

    }
  }


  async getCurrentUserStatus(){
        try {
            const statusResp = await this.account.get();

            if(statusResp){
                console.log('user is logged in !!!',statusResp);
            }else{
                console.log('user is not logged in ')
            }

            return statusResp;
        } catch (error) {
            console.log("Error :: getCurrentUserStatus :: ",error);
        }


        return null;
        // or instead of if else u can directly return null,as it say their was some error in try-catch
  }


  async logout(){
    try {
        const logoutResp = await this.account.deleteSessions();
        console.log("USer is logout successfully" , logoutResp);
    } catch (error) {
        console.log('Error :: logout :: ',error);
    }
  }

  
}

const authService = new AuthService();

export default authService;

// export default AuthService;  // if class is export then to use we have to create an object then can use all the functionality better can be to export object


















/* This is OKay but if we want to use at another place we have to write there too all so it will be messy better approach is to wrap under a class and export and use all the services 

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<PROJECT_ID>');                 // Your project ID

const account = new Account(client);

const user = await account.create(
    ID.unique(), 
    'email@example.com', 
    'password'
);*/