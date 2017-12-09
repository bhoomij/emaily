const router = require('express').Router();
const _ = require('lodash');
const PathParser = require('path-parser');
const { URL } = require('url');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = require('../models/surveys');
const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

router.get('/', requireLogin, async (req, res) => {
    const surveys = await Survey
        .find({ _user: req.user.id })
        .select({ recipients: false });

    res.send(surveys);
});

router.post('/', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, content, recipients, from_email } = req.body;

    const survey = new Survey({
        title,
        from_email,
        subject,
        content,
        recipients: recipients.split(',').map(email => ({ email: email.trim() })),
        _user: req.user.id,
        dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
        await mailer.send();
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();
        res.send(user);
    } catch (err) {
        res.status(422).send(err);
    }

});

router.get('/:surveyId/:choice', async (req, res) => {
    res.send("Thanks for voting!");
});

router.post('/webhooks', (req, res) => {
    const p = new PathParser('/api/surveys/:surveyId/:choice');

    // NOTE: we need to consider only "first feedback click" from user for a given survey

    // remove undefined elements from events arr
    // these are ones which are not matching our required url '/api/surveys/:surveyId/:choice' 
    // and hence they are undefined

    _.chain(req.body)
        .map(({ url, email }) => {
            const match = p.test(new URL(url).pathname);
            if (match) {
                return { email, surveyId: match.surveyId, choice: match.choice };
            }

        })
        .compact()
        .uniqBy(event => {
            return [event.email, event.surveyId].join();
        })
        .each(({ surveyId, email, choice }) => {
            Survey.updateOne(
                {
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email, responded: false }
                    }
                },
                {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }
            ).exec();

            // .then((res) => console.log(res, 'res'))
            // .catch((err) => console.log(err));
        })
        .value();

    res.send({});

});


router.delete('/:surveyId', requireLogin, async (req, res) => {
    const result = await Survey.findByIdAndRemove(req.params.surveyId);

    res.send(result);
});

module.exports = router;