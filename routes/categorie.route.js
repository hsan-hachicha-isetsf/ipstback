var express = require('express');
var router = express.Router();
var Categorie=require("../models/categorie")
const {verifyToken} =require("../Middleware/verifytoken")
const {authorizeRoles} = require("../Middleware/authorizeRoles")
const { uploadFile } = require('../Middleware/uploadfile')
// créer un nouvelle catégorie
router.post('/',uploadFile.single("imagecategorie"), async (req, res) => {
    const { nomcategorie} = req.body;
    const imagecategorie=req.file.filename
    const cat1 = new Categorie({nomcategorie:nomcategorie,imagecategorie:imagecategorie})
    try {
        await cat1.save();
        res.status(200).json(cat1 );
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
});

// afficher la liste des categories.
router.get('/',verifyToken, async (req, res )=> {
    try {
        const cat = await Categorie.find();
        res.status(200).json(cat);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
        });

// Supprimer une catégorie
router.delete('/:categorieId', async (req, res)=> {
    //const id = req.params.categorieId;
    await Categorie.findByIdAndDelete(req.params.categorieId);
    res.json({ message: "categorie deleted successfully." });
    });
// chercher une catégorie
router.get('/:idcat',async(req, res)=>{
    try {
    const cat = await Categorie.findById(req.params.idcat);
    res.status(200).json(cat);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
    // modifier une catégorie
router.put('/:categorieId', async (req, res)=> {
    const { nomcategorie, imagecategorie} = req.body;
    //const id = req.params.categorieId;
    try {
    const cat1 = {
    nomcategorie:nomcategorie,imagecategorie:imagecategorie, _id:req.params.categorieId };
    await Categorie.findByIdAndUpdate(req.params.categorieId, cat1);
    res.json(cat1);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
module.exports = router;