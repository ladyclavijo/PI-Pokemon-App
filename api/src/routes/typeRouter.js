const { Router } = require('express');
const router = Router();
const getTypesApi = require('../controllers/getTypesApi');



router.get('/', async (req, res) => {

    try {
        const infoTypes = await getTypesApi()

    return res.status(200).send(infoTypes)
        
    } 
    catch (error) {
        return res.status(404).send('Type not found')
    }
})

module.exports = router;