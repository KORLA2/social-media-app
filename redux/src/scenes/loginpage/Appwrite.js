import {Client,Account,Databases} from 'appwrite'
let client=new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('647085210f385efc1628');
export let account= new Account(client);
export let database=new Databases(client,'6470905eda50ef893bdb')
