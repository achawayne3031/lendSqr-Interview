import request from 'supertest';
import app from './../router/AccountRouter';



describe('POST /api/account/transfer', () => {
    it('should transfer from account to another account', async () => {
      const response = await request(app)
        .post('/api/account/transfer')
        .send({  
            sender_email: "achawayne4@gmail.com",
            beneficiary_email: "achawayne2@gmail.com",
            amount: "10.50"
        });
      expect(response.status).toBe(200);
    });
});



describe('POST /api/account/withdraw', () => {
    it('should withdraw from account', async () => {
      const response = await request(app)
        .post('/api/account/withdraw')
        .send({  

            email: "achawayne6@gmail.com",
            amount: "1.70" 
        });
      expect(response.status).toBe(200);
    });
});



describe('POST /api/account/fund', () => {
    it('should fund a user account', async () => {
      const response = await request(app)
        .post('/api/account/fund')
        .send({  
            email: "achawayne6@gmail.com",
            amount: "1.70" 
        });
      expect(response.status).toBe(200);
    });
});



describe('POST /api/account/create', () => {
    it('should create an account for users', async () => {
      const response = await request(app)
        .post('/api/account/create')
        .send({  
            full_name: "achawayne sixtus",
            email: "achawayne6@gmail.com",
            phone: "08134873993" 
        });
      expect(response.status).toBe(200);
    });
});

