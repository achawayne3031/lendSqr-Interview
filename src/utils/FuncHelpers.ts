
import Crypto  from 'crypto'



   
export const generateRandom = (size = 20) => {
    return Crypto
        .randomBytes(size)
        .toString('base64')
        .slice(0, size);
   }


   export const onlyNumbersGreaterThanZero = (amount: string) => {

    if(!isNaN(parseFloat(amount)) && parseFloat(amount) > 0){
        return true
    }

    return false

   }