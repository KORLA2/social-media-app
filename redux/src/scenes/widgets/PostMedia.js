export let PostMedia=({Media,MediaType})=>{
    return (
    
        MediaType==='.jpg'?<img src={Media} width='100%'/>:
    MediaType==='.mp4'?<video width="400" controls>
  <source src={Media} type="video/mp4">
 </source>
  Your browser does not support HTML video.
</video> : MediaType==='.mp3' ?<audio controls>
  <source src={Media} type="audio/ogg">
 </source>

</audio>:  <iframe src={Media} width="800"
                height="500">
        </iframe>
    
        
    )
    
}