const Session = require('../models/sessionModel.js')
const sessionController = {}

sessionController.startSession = (req, res, next) => {
    const filter = { activeSessionId: res.locals.hash };
    const update = { activeSessionId: res.locals.hash };
    Session.findOneAndUpdate(filter, { upsert: true, new: true, overwrite: true })
        .then((sessionResponse) => {
            console.log('session created: ', sessionResponse);
            return next()
        })
        .catch(err => {
            return next(
                {
                    log: 'Error in sessioncontroller.startsession',
                    message: { err }
                }
            )
        })
}


module.exports = sessionController;