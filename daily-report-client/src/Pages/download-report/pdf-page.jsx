

const PDFPage = ({data}) => {

    console.log(data, 'afir');
    const objectArr = Object.keys(data)
    


  objectArr.sort(function (a, b) {
		var nameA = a.split("|")[1].toLowerCase();
		var nameB = b.split("|")[1].toLowerCase();

		// Check if both items contain "jailWarder"
		var isJailWarderA = a.includes("jailWarder");
		var isJailWarderB = b.includes("jailWarder");

		if (nameA < nameB) {
			return -1;
		}

		if (nameA > nameB) {
			return 1;
		}

		// If names are the same, sort "jailWarder" items to the end
		if (isJailWarderA && !isJailWarderB) {
			return 1;
		} else if (!isJailWarderA && isJailWarderB) {
			return -1;
		}

		return 0;
  });

    
    
    return (
		<div className=''>
            {objectArr.map(opetator => {
                console.log(opetator);
                return (
					<div key={opetator}>
						<div className="text-black bg-blue-300 px-2 font-bold">{opetator.split("|")[0]}</div>
						<p className='flex items-center gap-5'>
							Entry:{" "}
							<span className='flex items-center gap-3'>
								{Object.keys(data[opetator]).map(day => {
									console.log();
									return (
										<div key={day}>
											<p>{data[opetator][day].release}</p>
										</div>
									);
								})}
							</span>
						</p>
						<p className='flex items-center gap-5'>
							Release:{" "}
							<span className='flex items-center gap-3'>
								{Object.keys(data[opetator]).map(day => {
									console.log();
									return (
										<div key={day}>
											<p>{data[opetator][day].release}</p>
										</div>
									);
								})}
							</span>
						</p>
					</div>
				);
            })}
		</div>
	);
};

export default PDFPage;