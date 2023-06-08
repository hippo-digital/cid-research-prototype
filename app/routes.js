const express = require('express')
const router = express.Router()

// show all data store items in the terminal window
router.use((req, res, next) => {
  const log = {
    method: req.method,
    url: req.originalUrl,
    data: req.session.data
  }
  // you can enable this in your .env file
  if (process.env.LOGGING === 'TRUE') {
    console.log(JSON.stringify(log, null, 2))
  }
  next()
})

// V3 ROUTES

router.post('/v3/personal-country-post', function (req, res) {
  let country = req.session.data['country']

  if (country === "Scotland"){
    // Send user to interuption page
    res.redirect('/v3/personal-country-scotland')
  } else {
    res.redirect('/v3/personal-address')
  }
})

router.post('/v3/personal-features-post', function (req, res) {
  let country = req.session.data['country']

  if (country === "Scotland"){
    // Send user to interuption page
    res.redirect('/v3/healthcare-do-you-know-chi-no')
  } else {
    res.redirect('/v3/healthcare-do-you-know-nhs-no')
  }
})

router.post('/v3/healthcare-do-you-know-nhs-no-post', function (req, res) {
  let nhs = req.session.data['knows-nhs-no']

  if (nhs === "Yes"){
    // Send user to nhs number input page
    res.redirect('/v3/healthcare-nhs-no')
  } else {
    res.redirect('/v3/healthcare-gp-surgery')
  }
})

router.post('/v3/healthcare-do-you-know-chi-no-post', function (req, res) {
  let chi = req.session.data['knows-chi-no']

  if (chi === "Yes"){
    // Send user to nhs number input page
    res.redirect('/v3/healthcare-chi-no')
  } else {
    res.redirect('/v3/healthcare-gp-surgery')
  }
})


router.post('/v3/healthcare-lpa-post', function (req, res) {
  let lpa = req.session.data['has-lpa']

  if (lpa === "Yes"){
    // Send user to nhs number input page
    res.redirect('/v3/healthcare-attorney-add')
  } else {
    res.redirect('/v3/check-details-1')
  }
})

router.post('/v3/healthcare-attorney-add-post', function (req, res) {
  // load in the array if it exists already
  let attorneys = req.session.data['attorneys'] || []

  // push the value from the input field into the array
  attorneys.push(req.session.data['attorney-name'])

  // push the array back into the session data
  req.session.data['attorneys'] = attorneys

  // move to the summary page
  res.redirect('/v3/healthcare-attorney-list')
})

router.post('/v3/healthcare-attorney-list-post', function (req, res) {
  // get the value from the radio button
  let addattorney = req.session.data['add-attorney']

  // routing based on the answer
  if (addattorney == "yes"){
    res.redirect('/v3/healthcare-attorney-add')
  } else {
    res.redirect('/v3/check-details-1')
  }
})


// V2 ROUTES

// Run this code when a form is submitted to '/v2/refusing-treatment-dementia-scenarios'
  router.post('/v2/refusing-treatment-dementia-scenarios', function (req, res) {

    // Make a variable and give it the value from 'refuse-lst-brain-injury'
    var refuseLifeSustainingTreatmentDementia = req.session.data['refuse-lst-dementia']

    // Check whether the variable matches a condition
    if (refuseLifeSustainingTreatmentDementia == "yes") {
      // Send user to refusal options page
      res.redirect('/v2/refusing-treatment-dementia-scenarios')
    } else {
      // Send user to next page, skipping refusal options
      res.redirect('/v2/my-values')
    }

  })

  // Run this code when a form is submitted to 'refusing-treatment-terminal-illness-routing'
  router.post('/v2/refusing-treatment-dementia-scenarios-specific-symptoms-or-behaviours', function (req, res) {

    // Make a variable and give it the value from 'refuse-lst-brain-injury'
    var refuseLifeSustainingTreatmentDementiaScenarios = req.session.data['refuse-lst-dementia-symptoms-or-behaviours']

    // Check whether the variable matches a condition
    if (refuseLifeSustainingTreatmentDementiaScenarios == "refuse-all-but-certain-symptoms-or-behaviours") {
      // Send user to refusal options page
      res.redirect('/v2/refusing-treatment-dementia-scenarios-specific-symptoms-or-behaviours')
    } else {
      // Send user to next page, skipping refusal options
      res.redirect('/v2/my-values')
    }

  })

// Run this code when a form is submitted to 'refusing-treatment-terminal-illness'
  router.post('/v2/refusing-treatment-terminal-illness', function (req, res) {

    // Make a variable and give it the value from 'refuse-lst-brain-injury'
    var refuseLifeSustainingTreatmentBrainInjury = req.session.data['refuse-lst-brain-injury']

    // Check whether the variable matches a condition
    if (refuseLifeSustainingTreatmentBrainInjury == "yes") {
      // Send user to refusal options page
      res.redirect('/v2/refusing-treatment-brain-injury-scenarios')
    } else {
      // Send user to next page, skipping refusal options
      res.redirect('/v2/my-values')
    }

  })

// Run this code when a form is submitted to 'refusing-treatment-terminal-illness-routing'
  router.post('/v2/refusing-treatment-terminal-illness-routing', function (req, res) {

    // Make a variable and give it the value from 'refuse-lst-brain-injury'
    var refuseLifeSustainingTreatmentBrainInjuryScenarios = req.session.data['refuse-lst-brain-injury-symptoms-or-behaviours']

    // Check whether the variable matches a condition
    if (refuseLifeSustainingTreatmentBrainInjuryScenarios == "refuse-all-but-certain-symptoms-or-behaviours") {
      // Send user to refusal options page
      res.redirect('/v2/refusing-treatment-brain-injury-scenarios-specific-symptoms-or-behaviours')
    } else {
      // Send user to next page, skipping refusal options
      res.redirect('/v2/my-values')
    }

  })

module.exports = router
