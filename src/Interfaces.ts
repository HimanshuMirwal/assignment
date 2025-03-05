export interface Story  {
    fileType: string; // or any other file type if applicable
    filePath: string;
    thumbnail: string;
  };
  
export interface User {
    _id: string;
    name: string;
    profileImagePath: string;
    stories: Story[];
  };