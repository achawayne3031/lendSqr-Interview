const { ResponseData } = require('./../response/resData')
const { checkUserLoanCredibility } = require('./../service/KarmaBlacklist')


async function KarmaMiddleware(req: any, res: any, next: any) {

  try {
    const { email } = req.body;
   // checkUserLoanCredibility(email)


    next()
  } catch (e) {

    return res.status(500).send(ResponseData('failed', false, 'Internal Server Error.', e))
  }
}

module.exports = KarmaMiddleware
