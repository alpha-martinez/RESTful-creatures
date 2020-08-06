const express = require('express');
const router = express.Router();
const fs = require('fs'); 


router.get('/new', (req,res) => {
    res.render('dinosaurs/new')
})

router.get('/', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    //convert the json to javascript
    let dinoData = JSON.parse(dinosaurs);
    
    let nameFilter = req.query.nameFilter;
    console.log(nameFilter);

    if(nameFilter){
        dinoData = dinoData.filter((dino) => {
            return dino.name.toLowerCase()===nameFilter.toLowerCase();
        })
    }
    //render our dino index page and pass it the dinData as "myDinos"
    res.render('dinosaurs/index', {myDinos: dinoData})
})

//show route(uses URL parameter "id") 
router.get('/:id', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs);
    // grab the id parameter from the url and convert the url to int 
    //(was originally string)
    let dinoIndex = parseInt(req.params.id);
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})
    console.log(req.params.id);

})

//postt a new dino

router.post('/', (req,res) => {
    //get json dinos and convert to a js array of objects
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs);
    //push new data into dinoData
    dinoData.push(req.body)
    // convert dinoData back to JSON and write to dinosaurs.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
    // redirect to the index get route
    res.redirect('/dinosaurs');

})

module.exports = router;