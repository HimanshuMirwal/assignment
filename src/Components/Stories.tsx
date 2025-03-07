import { useEffect, useState } from "react";
import {Story, User} from "../Interfaces";
import styles from "../styles/Layout.module.scss";
function Stories({users}:{users:any}){
    const [user, setUser] = useState<User>();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [userStories, setStories] = useState<Story[]>([]);
    const [videoDuration, setVideoDuration] = useState<number>(5); // Default to 5s


    useEffect(() => {
        if (userStories.length === 0) return; 
    
        const changeImage = () => {
          setCurrentImageIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % userStories.length;
            console.log({ newIndex });
            return newIndex; 
          });
        };

 
    
        const currentStory = userStories[currentImageIndex];
        let intervalTime = 5000; // Default 5 seconds for images
    
        if (currentStory.fileType === "video") {
          // Set the interval based on the video's duration
          intervalTime = videoDuration * 1000; // Duration in milliseconds
        }
        

        const intervalId = setInterval(changeImage, intervalTime);
    
        return () => clearInterval(intervalId); 
      }, [userStories, currentImageIndex, videoDuration]); 
    
      const handleVideoDuration = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const videoElement = e.target as HTMLVideoElement;
        setVideoDuration(videoElement.duration);
      };
    
    return (
        <>
        {
                user && <div className={styles.popup} >
                    <div className={styles.mediaSection}>
                            {userStories[currentImageIndex].fileType == "image" && <div className={styles.imageHolder}  style={{backgroundImage:`url(${userStories[currentImageIndex].filePath})`}}></div>}
                            {userStories[currentImageIndex].fileType == "video" && <video className={styles.videoHolder} autoPlay={false} muted={false} loop   
                                  controls                   
                            onLoadedMetadata={handleVideoDuration}
                            >
                                <source src={`${userStories[currentImageIndex].filePath}`} type="video/mp4" />
                            </video>
                                  
                            }
                    </div>
                    <div className={styles.leftClickableSection} onClick={()=>{
                        setCurrentImageIndex((prevIndex) => {
                            if(prevIndex == 0 ){
                                return userStories.length - 1   
                            }
                            const newIndex = (prevIndex - 1) % userStories.length;
                            console.log({ newIndex });
                            return newIndex; 
                          });
                    }} />
                    <div className={styles.rightClickableSection}
                    onClick={()=>{
                        setCurrentImageIndex((prevIndex) => {
                            if(prevIndex > userStories.length ){
                                return 0
                            }
                            const newIndex = (prevIndex + 1) % userStories.length;
                            console.log({ newIndex });
                            return newIndex; 
                          });
                    }}
                    />
                    <div className={styles.mainSection}>
                        <div className={styles.barHolder}>
                            {user.stories.map((_, index: any) => {
                                return <div className={styles.bar}>
                                    <div
                                        style={{ background: "#fff", width: (currentImageIndex >= index) ? "100%" : "0%", height: "100%" }}
                                    />
                                </div>
                            })}
                        </div>
                        <div className={styles.popUpProfile}>
                            <div className={styles.info}>
                                <div className={styles.image}>
                                    <img
                                        src={user.profileImagePath}
                                        height={"100%"}
                                        width={"100%"}
                                    />
                                </div>
                                <h5 className={styles.name}>{user.name}</h5>
                            </div>
                            <svg onClick={() => setUser(undefined)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                                <path d="M6 18L18 6M6 6l12 12" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
        }
        <div className={styles.storiesParent}>
            {
                users.map((data:User, index:number)=>{
                    return <div className={styles.card} key={index} onClick={()=>{
                        setUser(data)
                        setStories(data.stories)
                        setCurrentImageIndex(0)
                        }}> 
                        <div className={styles.profileImage}>
                            <img 
                                src={data.profileImagePath}
                                height={"100%"}
                                width={"100%"}
                            />
                        </div>
                        <h5 className={styles.name}>{data.name}</h5>
                    </div>
                })
            }
        </div>
        </>
    )

}
export default Stories;