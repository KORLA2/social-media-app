import {Client,Account,Databases,Graphql,Storage,Query,ID} from 'appwrite'
export let client=new Client();
client.setEndpoint(process.env.REACT_APP_End_Point).setProject(process.env.REACT_APP_PROJECT_ID);
export let account= new Account(client);
export let storage=new Storage(client)
export let database=new Databases(client)
export let query=Query;
