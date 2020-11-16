const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity');

router.get('/celebrities/index', (req, res) => {
  console.log('celebrities');
  // get all the celebrities from the database
  Celebrity.find().then(celebrities => {
    // render a books view to display them
    res.render('celebrities/index', { celebrities })
  }).catch(err => {
    console.log(err);
  })
});

router.get('/celebrities/new', (req, res)=>{
res.render('celebrities/new')
})

router.post('/celebrities', (req, res)=>{
  
  const {name, occupation, catchPhrase} = req.body;
  Celebrity.create({
    name,
    occupation,
    catchPhrase
  })
  .then(celeb => {
    console.log(`${celeb.name} was added to the database`);
    res.redirect(`celebrities/index`)
  })
  .catch(err => {
    console.log(err);
    res.render('celebrities/new');
  })
  })



router.get('/celebrities/:id', (req, res) => {
  const celebId = req.params.id;
  // get all the celebrities from the database
  Celebrity.findById(celebId)
  .then(celebrity => {
    // render a books view to display them
    res.render('celebrities/show', { celebrity })
  }).catch(err => {
    console.log(err);
  })
});

router.post('/celebrities/:id/delete', (req, res) => {
  const celebId = req.params.id;
  Celebrity.findByIdAndDelete(celebId)
  .then(()=> {
    res.redirect('../index')
  })
  .catch(err => {
    console.log(err)
  })
})

router.get('/celebrities/:id/edit', (req, res) => {
  const celebId = req.params.id;
  // get all the celebrities from the database
  Celebrity.findById(celebId)
  .then(celebrity => {
    // render a books view to display them
    res.render('celebrities/edit', { celebrity })
  }).catch(err => {
    console.log(err);
  })
});

router.post('/celebrities/:id', (req, res) => {
  const celebId = req.params.id
  const {name, occupation, catchPhrase} = req.body;
  Celebrity.findByIdAndUpdate(celebId,{
    name,
    occupation,
    catchPhrase
  })
  .then(celeb => {
    console.log(`1 was added to the database`);
    res.redirect('/celebrities/index')
  })
  .catch(err => {
    console.log(req.body)
    console.log(err);
    // res.render('celebrities/new');
  })
});



module.exports = router;