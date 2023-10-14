
const findDocument = async (modelName, fieldName, value) => {
    
    if (!value) { // fled name is dynamic 
       const obj =  await modelName.findOne({
			[fieldName]: { $exists: true },
	   });
		
		return obj ?? {}
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
