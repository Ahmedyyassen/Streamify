import { flagURL, LANGUAGE_TO_FLAG } from "../constants/language";


const LanguageFlag =({language}: {language:string})=>{
    if (!language) return null;

    const langLower =language.toLowerCase();
    const countryCode = LANGUAGE_TO_FLAG[langLower];

    if (countryCode) {
        return (
          <img
            src={flagURL(countryCode)}
            alt={`${langLower} flag`}
            className="h-3 mr-1 inline-block"
          />
        );
    }
    
}

export default LanguageFlag