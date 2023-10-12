
const findDocument = async (modelName, fieldName, value) => {
    
    if (!value) {
       return await modelName.findOne({
			[fieldName]: { $exists: true },
		});
    }
};

module.exports = {
	findDocument,
};
