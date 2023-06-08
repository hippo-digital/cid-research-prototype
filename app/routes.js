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

// V3 DECISION ROUTES

router.post('/v3/personal-country-post', function (req, res) {
  let country = req.session.data['country']

  if (! req.session.data['country'] ) {
    req.session.data['country'] = 'England'
  }

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
  let change = req.session.data['change']

  if (nhs === "No" && change === 'true'){
    // Send user to summary page
    res.redirect('/v3/check-details-1')
  } else if (nhs === "Yes"){
    // Send user to number input page
    res.redirect('/v3/healthcare-nhs-no')
  } else {
    // go to next step in the journey
    res.redirect('/v3/healthcare-gp-surgery')
  }
})

router.post('/v3/healthcare-do-you-know-chi-no-post', function (req, res) {
  let chi = req.session.data['knows-chi-no']
  let change = req.session.data['change']

  if (chi === "No" && change === 'true'){
    // Send user to summary page
    res.redirect('/v3/check-details-1')
  } else if (chi === "Yes"){
    // Send user to number input page
    res.redirect('/v3/healthcare-chi-no')
  } else {
    // go to next step in the journey
    res.redirect('/v3/healthcare-gp-surgery')
  }
})

// generate back link
router.get('/v3/healthcare-gp-surgery', function (req, res) {
  res.locals.prevURL = req.get('Referrer')
  prevURL = res.locals.prevURL

  return res.render('v3/healthcare-gp-surgery', {
    'prevURL': prevURL
  })
})

router.post('/v3/healthcare-lpa-post', function (req, res) {
  let lpa = req.session.data['has-lpa']
  // basic routing
  if (lpa === "Yes"){
    // Send user to nhs number input page
    res.redirect('/v3/healthcare-attorney-add')
  } else {
    res.redirect('/v3/check-details-1')
  }
})

// generate back link
router.get('/v3/healthcare-attorney-add', function (req, res) {
  let attorneys = req.session.data['attorneys']
  // set the variables as blank initially
  let attorneyName = ''
  let attorneyEmail = ''
  let attorneyPhone = ''

  // grab the previous page so we can create a contextual back link
  res.locals.prevURL = req.get('Referrer')
  prevURL = res.locals.prevURL

  // grab query string from url if it exists
  let item = req.query.item

  // if making an edit pull back the previous details and populated the variables
  if (req.query.item) {
    attorneyName = attorneys[item][0]
    attorneyEmail = attorneys[item][1]
    attorneyPhone = attorneys[item][2]
  }

  req.session.data['amend-attorney'] = ''

  // send back the variables to the page
  return res.render('v3/healthcare-attorney-add', {
    'prevURL': prevURL,
    'item': item,
    'attorneyName': attorneyName,
    'attorneyEmail': attorneyEmail,
    'attorneyPhone': attorneyPhone,
  })
})

// add or amend new attorney details
router.post('/v3/healthcare-attorney-add-post', function (req, res) {
  // load in the array if it exists already
  let attorneys = req.session.data['attorneys'] || []

  // determine if add or edit
  let item = req.session.data['amend-attorney']

  let attorneyName = req.session.data['attorney-name']
  let attorneyEmail = req.session.data['attorney-email']
  let attorneyPhone = req.session.data['attorney-telephone-number']
  // grab the inputted details and store them in our new array
  let newDetails = [attorneyName,attorneyEmail,attorneyPhone]

  if (item !== '') { // is an edit
    // overrite the values in the array
    attorneys[item] = newDetails
    console.log('item found')
  } else { // is a new addition
    // push the values from the input fields as an array into the array
    attorneys.push(newDetails)
  }


  // push the array back into the session data
  req.session.data['attorneys'] = attorneys

  // move to the summary page
  res.redirect('/v3/healthcare-attorney-list')
})

// generate back link
router.get('/v3/healthcare-attorney-list', function (req, res) {
  res.locals.prevURL = req.get('Referrer')
  prevURL = res.locals.prevURL

  return res.render('v3/healthcare-attorney-list', {
    'prevURL': prevURL
  })
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

router.post('/v3/healthcare-attorney-list-remove', function (req, res) {
  // pull in the array values
  var attorneys = req.session.data['attorneys']

  // pick up the value of the specific remove link
  let remove = req.session.data.remove

  // remove 1 item from the array at the place indicated by the remove link
  attorneys.splice(remove, 1);

  // reload the page
  res.redirect('/v3/healthcare-attorney-list')

})

// generate back link
router.get('/v3/check-details-1', function (req, res) {
  res.locals.prevURL = req.get('Referrer')
  prevURL = res.locals.prevURL

  return res.render('v3/check-details-1', {
    'prevURL': prevURL
  })
})

// V3 STATEMENT ROUTES

router.post('/v3/statement/personal-country-post', function (req, res) {
  let country = req.session.data['country']

  if (! req.session.data['country'] ) {
    req.session.data['country'] = 'England'
  }

  if (country === "Scotland"){
    // Send user to interuption page
    res.redirect('/v3/statement/personal-country-scotland')
  } else {
    res.redirect('/v3/statement/personal-address')
  }
})

router.post('/v3/statement/personal-features-post', function (req, res) {
  let country = req.session.data['country']

  if (country === "Scotland"){
    // Send user to interuption page
    res.redirect('/v3/statement/healthcare-do-you-know-chi-no')
  } else {
    res.redirect('/v3/statement/healthcare-do-you-know-nhs-no')
  }
})

router.post('/v3/statement/healthcare-do-you-know-nhs-no-post', function (req, res) {
  let nhs = req.session.data['knows-nhs-no']
  let change = req.session.data['change']

  if (nhs === "No" && change === 'true'){
    // Send user to summary page
    res.redirect('/v3/statement/check-details-1')
  } else if (nhs === "Yes"){
    // Send user to number input page
    res.redirect('/v3/statement/healthcare-nhs-no')
  } else {
    // go to next step in the journey
    res.redirect('/v3/statement/healthcare-gp-surgery')
  }
})

router.post('/v3/statement/healthcare-do-you-know-chi-no-post', function (req, res) {
  let chi = req.session.data['knows-chi-no']
  let change = req.session.data['change']

  if (chi === "No" && change === 'true'){
    // Send user to summary page
    res.redirect('/v3/statement/check-details-1')
  } else if (chi === "Yes"){
    // Send user to number input page
    res.redirect('/v3/statement/healthcare-chi-no')
  } else {
    // go to next step in the journey
    res.redirect('/v3/statement/healthcare-gp-surgery')
  }
})

// generate back link
router.get('/v3/statement/healthcare-gp-surgery', function (req, res) {
  res.locals.prevURL = req.get('Referrer')
  prevURL = res.locals.prevURL

  return res.render('v3/statement/healthcare-gp-surgery', {
    'prevURL': prevURL
  })
})

router.post('/v3/statement/healthcare-lpa-post', function (req, res) {
  let lpa = req.session.data['has-lpa']
  // basic routing
  if (lpa === "Yes"){
    // Send user to nhs number input page
    res.redirect('/v3/statement/healthcare-attorney-add')
  } else {
    res.redirect('/v3/statement/check-details-1')
  }
})

// generate back link
router.get('/v3/statement/healthcare-attorney-add', function (req, res) {
  let attorneys = req.session.data['attorneys']
  // set the variables as blank initially
  let attorneyName = ''
  let attorneyEmail = ''
  let attorneyPhone = ''

  // grab the previous page so we can create a contextual back link
  res.locals.prevURL = req.get('Referrer')
  prevURL = res.locals.prevURL

  // grab query string from url if it exists
  let item = req.query.item

  // if making an edit pull back the previous details and populated the variables
  if (req.query.item) {
    attorneyName = attorneys[item][0]
    attorneyEmail = attorneys[item][1]
    attorneyPhone = attorneys[item][2]
  }

  req.session.data['amend-attorney'] = ''

  // send back the variables to the page
  return res.render('v3/statement/healthcare-attorney-add', {
    'prevURL': prevURL,
    'item': item,
    'attorneyName': attorneyName,
    'attorneyEmail': attorneyEmail,
    'attorneyPhone': attorneyPhone,
  })
})

// add or amend new attorney details
router.post('/v3/statement/healthcare-attorney-add-post', function (req, res) {
  // load in the array if it exists already
  let attorneys = req.session.data['attorneys'] || []

  // determine if add or edit
  let item = req.session.data['amend-attorney']

  let attorneyName = req.session.data['attorney-name']
  let attorneyEmail = req.session.data['attorney-email']
  let attorneyPhone = req.session.data['attorney-telephone-number']
  // grab the inputted details and store them in our new array
  let newDetails = [attorneyName,attorneyEmail,attorneyPhone]

  if (item !== '') { // is an edit
    // overrite the values in the array
    attorneys[item] = newDetails
    console.log('item found')
  } else { // is a new addition
    // push the values from the input fields as an array into the array
    attorneys.push(newDetails)
  }


  // push the array back into the session data
  req.session.data['attorneys'] = attorneys

  // move to the summary page
  res.redirect('/v3/statement/healthcare-attorney-list')
})

// generate back link
router.get('/v3/statement/healthcare-attorney-list', function (req, res) {
  res.locals.prevURL = req.get('Referrer')
  prevURL = res.locals.prevURL

  return res.render('v3/statement/healthcare-attorney-list', {
    'prevURL': prevURL
  })
})

router.post('/v3/statement/healthcare-attorney-list-post', function (req, res) {
  // get the value from the radio button
  let addattorney = req.session.data['add-attorney']

  // routing based on the answer
  if (addattorney === "yes"){
    res.redirect('/v3/statement/healthcare-attorney-add')
  } else {
    res.redirect('/v3/statement/check-details-1')
  }
})

router.post('/v3/statement/healthcare-attorney-list-remove', function (req, res) {
  // pull in the array values
  var attorneys = req.session.data['attorneys']

  // pick up the value of the specific remove link
  let remove = req.session.data.remove

  // remove 1 item from the array at the place indicated by the remove link
  attorneys.splice(remove, 1);

  // reload the page
  res.redirect('/v3/statement/healthcare-attorney-list')

})

// generate back link
router.get('/v3/statement/check-details-1', function (req, res) {
  res.locals.prevURL = req.get('Referrer')
  prevURL = res.locals.prevURL

  return res.render('v3/statement/check-details-1', {
    'prevURL': prevURL
  })
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
