
import axios from 'axios';

export const checkUserLoanCredibility = async (identity: string) => {
    try {
        const token = 'sk_live_Hfvcf9srOs5pPWDporlAOWpDqrjon0y9PeUysTtB';
        const url = `https://adjutor.lendsqr.com/v2/verification/karma/${identity}`; 
        const response = await axios.get(url, { 
            headers: {
                'Authorization': `Bearer ${token}`,
              },
        });

        if(response.data && response.data.status == 'success'){
            let karmaData = response.data.data
            if(parseFloat(karmaData.amount_in_contention) > 0){
                return true
            }else{
                return false;
            }

        }else{
            return false;
        }
        console.log('Response data:', response.data);
    
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return false
          console.error('Error message:', error.message);
        } else {
            return false;
          console.error('Unexpected error:', error);
        }
    }
}