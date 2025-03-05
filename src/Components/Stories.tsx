import { useEffect, useState } from "react";
import {Story, User} from "../Interfaces";
import styles from "../styles/Layout.module.scss";
function Stories({users}:{users:any}){
    const [user, setUser] = useState<User>();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [userStories, setStories] = useState<Story[]>([]);
    useEffect(() => {
        if (userStories.length === 0) return; 
    
        const changeImage = () => {
          setCurrentImageIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % userStories.length;
            console.log({ newIndex });
            return newIndex; 
          });
        };
    
        const intervalId = setInterval(changeImage, 5000);
    
        return () => clearInterval(intervalId); 
      }, [userStories]); 
    

    return (
        <>
        {
                user && <div className={styles.popup} style={{backgroundImage:`url(${userStories[currentImageIndex].filePath})`}}>
                    <div className={styles.barHolder}>
                        {user.stories.map((story: any, index: any) => {
                            return <div className={styles.bar}>
                                <div
                                style={{background: "#fff", width:(currentImageIndex >= index) ? "100%":"0%", height:"100%", transition:(currentImageIndex >= index) ? "5s" : "0s", }}
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
                        <svg onClick={()=>setUser(undefined)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                            <path d="M6 18L18 6M6 6l12 12" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
        }
        <div className={styles.storiesParent}>
            {
                users.map((data:User, index:number)=>{
                    return <div className={styles.card} key={index} onClick={()=>{
                        setUser(data)
                        setStories(data.stories)
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