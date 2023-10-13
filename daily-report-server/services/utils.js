
const findDocument = async (modelName, fieldName, value) => {
    
    if (!value) {
       return await modelName.findOne({
			[fieldName]: { $exists: true },
		});
    }
};


const findDocumentByValue = (modelName, fieldName, value) => {
	if (fieldName === "_id") {
		return modelName.findById(value);
	}
	return modelName.findOne({ [fieldName]: value });
};

module.exports = {
	findDocument,
	findDocumentByValue,
};
