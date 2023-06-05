const express = require('express')
const router = express.Router()

// V2 ROUTES
// Run this code when a form is submitted to '/v3/refusing-treatment-dementia-scenarios'
router.post('/v3/refusing-treatment-dementia-scenarios', function (req, res) {

  // Make a variable and give it the value from 'refuse-lst-brain-injury'
  var refuseLifeSustainingTreatmentDementia = req.session.data['refuse-lst-dementia']

  // Check whether the variable matches a condition
  if (refuseLifeSustainingTreatmentDementia == "yes"){
    // Send user to refusal options page
    res.redirect('/v3/refusing-treatment-dementia-scenarios')
  } else {
    // Send user to next page, skipping refusal options
    res.redirect('/v3/my-values')
  }

})

// Run this code when a form is submitted to 'refusing-treatment-terminal-illness-routing'
router.post('/v3/refusing-treatment-dementia-scenarios-specific-symptoms-or-behaviours', function (req, res) {

  // Make a variable and give it the value from 'refuse-lst-brain-injury'
  var refuseLifeSustainingTreatmentDementiaScenarios = req.session.data['refuse-lst-dementia-symptoms-or-behaviours']

  // Check whether the variable matches a condition
  if (refuseLifeSustainingTreatmentDementiaScenarios == "refuse-all-but-certain-symptoms-or-behaviours"){
    // Send user to refusal options page
    res.redirect('/v3/refusing-treatment-dementia-scenarios-specific-symptoms-or-behaviours')
  } else {
    // Send user to next page, skipping refusal options
    res.redirect('/v3/my-values')
  }

})

// Run this code when a form is submitted to 'refusing-treatment-terminal-illness'
router.post('/v3/refusing-treatment-terminal-illness', function (req, res) {

  // Make a variable and give it the value from 'refuse-lst-brain-injury'
  var refuseLifeSustainingTreatmentBrainInjury = req.session.data['refuse-lst-brain-injury']

  // Check whether the variable matches a condition
  if (refuseLifeSustainingTreatmentBrainInjury == "yes"){
    // Send user to refusal options page
    res.redirect('/v3/refusing-treatment-brain-injury-scenarios')
  } else {
    // Send user to next page, skipping refusal options
    res.redirect('/v3/my-values')
  }

})

// Run this code when a form is submitted to 'refusing-treatment-terminal-illness-routing'
router.post('/v3/refusing-treatment-terminal-illness-routing', function (req, res) {

  // Make a variable and give it the value from 'refuse-lst-brain-injury'
  var refuseLifeSustainingTreatmentBrainInjuryScenarios = req.session.data['refuse-lst-brain-injury-symptoms-or-behaviours']

  // Check whether the variable matches a condition
  if (refuseLifeSustainingTreatmentBrainInjuryScenarios == "refuse-all-but-certain-symptoms-or-behaviours") {
    // Send user to refusal options page
    res.redirect('/v3/refusing-treatment-brain-injury-scenarios-specific-symptoms-or-behaviours')
  } else {
    // Send user to next page, skipping refusal options
    res.redirect('/v3/my-values')
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
