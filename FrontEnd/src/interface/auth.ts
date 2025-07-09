export interface SIGNUPMODEL {
  fullName: string;
  email: string;
  password: string;
}
export interface LOGINMODEL {
  email: string;
  password: string;

}

export interface ONBOARINGFORM {
  fullName: string;
  bio: string;
  nativeLanguage: string;
  learningLanguage: string;
  location: string;
  profilePic: string;
  createdAt?: Date;
  updatedAt?: Date;
}
