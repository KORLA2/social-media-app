import {Client,Account,Databases,Graphql,Storage} from 'appwrite'
let client=new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('647085210f385efc1628');
export let account= new Account(client);
export let storage=new Storage(client)
export let database=new Databases(client)
export let graphql=new Graphql(client)