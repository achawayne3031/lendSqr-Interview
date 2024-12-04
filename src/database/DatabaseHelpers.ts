
import MysqlPool from './../database/MysqlPool';
const { generateRandom } = require('./../utils/FuncHelpers')
const { onlyNumbersGreaterThanZero } = require('./../utils/FuncHelpers')




export const createAccountQuery = async (table: string, data: any) => {

    const connection = await MysqlPool.getConnection();

    try {

        await connection.beginTransaction();

        let userCode = generateRandom(10)

        // create user account ///
        await connection.query('INSERT INTO `user_accounts` (`full_name`, `email`, `phone`, `user_code`) VALUES(?, ?, ?, ?)', [data.full_name, data.email, data.phone, userCode]);

        /// create user wallet ////
        await connection.query('INSERT INTO `wallet_balance` (`user_code`) VALUES(?)', [userCode]);

        await connection.commit();
    
      } catch (DbError) {
        await connection.rollback();
        throw DbError
      }
}



export const emailExist = async (email: string) => {

    try {
        /// check if email exists
        const [results]  = await MysqlPool.query(`SELECT * FROM user_accounts WHERE email = ? LIMIT 1`, [email]);

        if(Object.values(results).length > 0){
            return true
        }else{
            return false
        }

      } catch (error) {
        throw error
      } 

}


export const getUserData = async (email: string) => {

    try {
        /// check if email exists
        const [results]  = await MysqlPool.query(`SELECT * FROM user_accounts INNER JOIN wallet_balance ON user_accounts.user_code = wallet_balance.user_code WHERE user_accounts.email = ?`, [email]);

        if(Object.values(results).length > 0){
            return results[0]
        }else{
            return []
        }

      } catch (error) {
        throw error
      } 

}



export const fundUserWallet = async (email: string, amount: string) => {

    if(!onlyNumbersGreaterThanZero(amount)){
        return { status : false, message: 'Character must be greater than 1. Numbers only' }
    }


    const connection = await MysqlPool.getConnection();

    try {
        /// get User data
        const [results]  = await MysqlPool.query(`SELECT * FROM user_accounts INNER JOIN wallet_balance ON user_accounts.user_code = wallet_balance.user_code WHERE user_accounts.email = ?`, [email]);

        if(Object.values(results).length > 0){
            let userData = results[0];
            let newAmount = userData.balance + parseFloat(amount);

            await connection.beginTransaction();
          
            /// Fund user wallet ////
            await connection.query('UPDATE `wallet_balance` SET `balance` = ? WHERE `user_code` = ?', [newAmount, userData.user_code]);
    
            await connection.commit();

            return true
        }else{
            return false
        }

      } catch (error) {
        await connection.rollback();

        throw error
      } 

}




export const withdrawFromWallet = async (email: string, amount: string) => {

    if(!onlyNumbersGreaterThanZero(amount)){
        return { status : false, message: 'Character must be greater than 1. Numbers only' }
    }


    const connection = await MysqlPool.getConnection();

    try {

        await connection.beginTransaction();

        /// get User data
        const [results]  = await connection.query(`SELECT * FROM user_accounts INNER JOIN wallet_balance ON user_accounts.user_code = wallet_balance.user_code WHERE user_accounts.email = ?`, [email]);

        if(Object.values(results).length > 0){
            let userData = results[0];

            if(parseFloat(amount) > userData.balance){
                return { status : false, message: 'insufficient balance' }
            }

            let newAmount = userData.balance - parseFloat(amount);

          
            /// update user wallet ////
            await connection.query('UPDATE `wallet_balance` SET `balance` = ? WHERE `user_code` = ?', [newAmount, userData.user_code]);
    
            await connection.commit();

            return  { status : true, message: 'success' }
        }else{
            return { status : false, message: 'user not found' }
        }

      } catch (error) {
        await connection.rollback();

        throw error
      } 

}






export const transferToBenficiary = async (sender_email: string, beneficiary_email: string,  amount: string) => {

    if(!onlyNumbersGreaterThanZero(amount)){
        return { status : false, message: 'Character must be greater than 1. Numbers only' }
    }
    const connection = await MysqlPool.getConnection();

    try {

         await connection.beginTransaction();

            /// get sender data ///
            const [results]  = await connection.query(`SELECT * FROM user_accounts INNER JOIN wallet_balance ON user_accounts.user_code = wallet_balance.user_code WHERE user_accounts.email = ?`, [sender_email]);
            let userData = results[0];

            if(parseFloat(amount) > userData.balance){
                return { status : false, message: 'insufficient balance' }
            }

            let newAmount = userData.balance - parseFloat(amount);
          
            /// update sender wallet ////
            await connection.query('UPDATE `wallet_balance` SET `balance` = ? WHERE `user_code` = ?', [newAmount, userData.user_code]);


            // get beneficiary data ///
            const [rows]  = await connection.query(`SELECT * FROM user_accounts INNER JOIN wallet_balance ON user_accounts.user_code = wallet_balance.user_code WHERE user_accounts.email = ?`, [beneficiary_email]);
            
            let userBeneficiaryData = rows[0];
            let newBeneficiaryWalletBalance = userBeneficiaryData.balance + parseFloat(amount);

            /// update beneficiary wallet ////
            await connection.query('UPDATE `wallet_balance` SET `balance` = ? WHERE `user_code` = ?', [newBeneficiaryWalletBalance, userBeneficiaryData.user_code]);


            await connection.commit();

            return  { status : true, message: 'success' }
      

      } catch (error) {
        await connection.rollback();

        throw error
      } 

}