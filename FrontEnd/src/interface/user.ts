export interface Friend{
    _id: string;
    fullName:string;
    profilePic: string,
    nativeLanguage:string,
    learningLanguage:string;
    createdAt: Date;
    updatedAt: Date;
};

export interface User {
  _id: string;
  fullName: string;
  bio: string;
  profilePic: string;
  nativeLanguage: string;
  learningLanguage: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Recipient{
  _id: string;
  fullName: string;
  profilePic: string;
  nativeLanguage: string;
  learningLanguage: string;
}
export interface OUTGOINGREQUESTS {
  _id: string;
  sender: string;
  status: string;
  recipient: Recipient;
  createdAt: Date;
  updatedAt: Date;
}

export interface GETFRIENTREQUEST{
  inComingReqs:[
  {
  _id: string;
  sender: Recipient;
  status: string;
  recipient: string;
  createdAt: Date;
  updatedAt: Date;
  }],
  acceptedReqs:[
    {
  _id: string;
  sender: string;
  status: string;
  recipient: {
    _id: string;
    fullName: string;
    profilePic: string;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
  }
  ]
}
