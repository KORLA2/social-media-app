import { Widgetwrap } from "../../components/widgets";
import {Box} from '@mui/material';
export let Post=({Name,Likes,Comments,Profession,Locaiton})=>{
return (

    <Widgetwrap mt='0.5rem'>
        
        <Box>

            {Name}

            </Box>

        </Widgetwrap>

)



}