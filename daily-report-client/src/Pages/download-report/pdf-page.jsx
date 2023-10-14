

const PDFPage = ({data}) => {

    console.log(data, 'afir');
    const object = Object.keys(data)
    const newArr = [...object]
    

    // const modify = object.reduce((acc, cur) => {
        
    //     return acc
    // }, [])


   object.sort(function (a, b) {
		var nameA = a.split("|")[1].toLowerCase();
		var nameB = b.split("|")[1].toLowerCase();

		if (nameA < nameB) {
			return -1;
		}

		if (nameA > nameB) {
			return 1;
		}

		return 0;
   });

    console.log(object)
    return (
        <div>
            this is padf
        </div>
    );
};

export default PDFPage;