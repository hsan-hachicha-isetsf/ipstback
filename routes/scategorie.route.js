var express = require('express');
var router = express.Router();
var SCategorie=require("../models/scategorie");
const { verifyToken } = require('../Middleware/verifytoken');
// créer un nouvelle catégorie
router.post('/', async (req, res) => {
    const { nomscategorie, imagescat,categoriID} = req.body;
    
    const scat1 = new SCategorie({nomscategorie:nomscategorie,imagescat:imagescat,categoriID:categoriID})
    try {
        await scat1.save();
        res.status(200).json(scat1 );
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
});

// afficher la liste des categories.
router.get('/',verifyToken, async (req, res )=> {
    try {
        const scat = await SCategorie.find()
        res.status(200).json(scat);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
        });

module.exports = router;