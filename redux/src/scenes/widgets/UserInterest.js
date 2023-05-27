import Dropzone from 'react-dropzone'
import {useState} from 'react'
import {storage,database} from  '../Appwrite/Appwrite'
import { InputBase,useTheme,Button,Box ,Typography,Divider, useMediaQuery} from '@mui/material'
import {Image} from '../../components/image'
import {FlexBetween} from '../../components/FlexBetween'
import {Widgetwrap} from '../../components/widgets'
import {v4 as uuid} from 'uuid'
import { AttachFileOutlined, EditOutlined,MoreHorizOutlined, GifBoxOutlined, ImageOutlined, MicOutlined } from '@mui/icons-material'
export let UserInterest=()=>{

    let {palette}=useTheme();
    let nonmobile=useMediaQuery('(min-width:1000px)')
let [image,setimage]=useState(null);
let [Description,setDescription]=useState('');
let mediumMain=palette.neutral?.mediumMain;
let medium=palette.neutral?.main;
let background=palette.background?.alt;
let primary=palette.primary?.main;
console.log(image)
let neutral=palette.neutral?.light;


let Post=async()=>{
try{
    
let response =await  storage.getFile('6472167a116ba1ed2323','2c460081-dfa6-4f11-b1f7-a3fcd60e7d9e')
console.log(response)

}
catch(err){
    console.log(err)
}

}



    return (
        <Widgetwrap>
<FlexBetween

gap='1.5rem'


>
    
    <Image/>
    <InputBase 
    sx={{
        p:'1rem 2rem',
        backgroundColor:neutral,
        borderRadius:'2rem',
        width:'100%'
    }}
    onChange={(e)=>{setDescription(e.target.value)}}
    placeholder='Whats in your mind ...'
    />
</FlexBetween>
<Box 
p='1rem'
mt='1rem'
borderRadius='5px'

>
<Dropzone
acceptedFiles='.jpg'
multiple={true}
onDrop={(accepted)=>
setimage(accepted[0])

}
>

{
    ({getRootProps,getInputProps})=>(
        <Box
        {...getRootProps()}
        p='1rem'
        width='100%'
        sx={{"&:hover":{cursor:'pointer'}}}
        border={`2px dashed ${palette.primary.main}`}
        >
            <input {...getInputProps()} />
   {

    image?(<FlexBetween>
        <Typography>
            
            {image.path}
            </Typography>
            <EditOutlined/>
        </FlexBetween>):<p>Add Image</p>
   }
        
            </Box>
    )
}
    </Dropzone>

    </Box>

<Divider sx={{margin:'1.25rem'}}/>

  <FlexBetween>

<FlexBetween gap='0.25rem' >
<ImageOutlined color={mediumMain}/>

<Typography
sx={{color:mediumMain,
"&:hover":{
cursor:'pointer',
color:medium
}
}}
>
Image
</Typography>

</FlexBetween>
{
nonmobile?(

<>
<FlexBetween gap='0.25rem' >
<AttachFileOutlined  color={mediumMain}/>

<Typography
sx={{color:mediumMain,
"&:hover":{
cursor:'pointer',
color:medium
}
}}
>
Attach File
</Typography>

</FlexBetween>
<FlexBetween gap='0.25rem' >
<GifBoxOutlined  color={mediumMain}/>

<Typography
sx={{color:mediumMain,
"&:hover":{
cursor:'pointer',
color:medium
}
}}
>
Attach Gif
</Typography>

</FlexBetween>
<FlexBetween gap='0.25rem' >
<MicOutlined />

<Typography
sx={{color:mediumMain,
"&:hover":{
cursor:'pointer',
color:medium
}
}}
>
Add Audio
</Typography>

</FlexBetween>
</>

):(<FlexBetween gap='0.25rem'>
    <MoreHorizOutlined/>
</FlexBetween>)
}
<Button
sx={{background:background,color:primary,borderRadius:'3rem'}}
onClick={Post}
>
    POST

</Button>
    </FlexBetween>

            </Widgetwrap>
    )
}