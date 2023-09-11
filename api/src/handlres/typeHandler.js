const {getAllTypes} = require("../controllers/typesControllers")

const getTypes = async (req, res)=>{
    try {
       const response = await getAllTypes();
       res.status(200).json({result: response})
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

module.exports = {getTypes}