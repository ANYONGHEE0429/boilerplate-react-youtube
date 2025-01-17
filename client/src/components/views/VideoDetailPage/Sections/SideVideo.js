import axios from "axios";
import React, { useEffect, useState } from "react";

function SideVideo() {

    const [sideVideos, setSideVideos] = useState([])

  useEffect(() => {
    axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        console.log(response.data.videos);
        setSideVideos(response.data.videos);
      } else {
        alert("Failed to get Videos");
      }
    });
  }, []);

  const renderSideVideo = sideVideos.map((video, index) => {
        
         var minutes = Math.floor(video.duration / 60);
         var seconds = Math.floor(video.duration - minutes * 60);

        return <div key={index} style={{ display: "flex", marginBottom: "1rem", padding: "0.2rem" }}>
        <div style={{ width: "40%", marginRight: "1rem" }}>
          <a href>
            <img style={{ width: "100%", heihgt: "100%"}} src={"http://localhost:5000/${video.thumbnail}"} alt="thumbnail" />
          </a>
        </div>
  
        <div style={{ width: "50%" }}>
          <a href style={{color: "gray"}}>
            <span style={{ fontSize: "1rem", color: "black" }}>{video.title}</span>
            <span>{video.writer.name}</span>
            <br />
            <span>{video.views} views</span>
            <br />
            <span>{minutes} : {seconds}</span>
          </a>
        </div>
      </div>

  })

  return (

    <React.Fragment>
        <div style={{ marginTop: "3rem"}} />
        
        {renderSideVideo}

    </React.Fragment>


    
  );
}

export default SideVideo;
