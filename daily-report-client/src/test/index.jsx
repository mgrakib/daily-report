import data from '../../public/prison_list.json'

const TESt = () => {
    
    const mapArr = Object.keys(data)
		.map(item => {
			if (item.startsWith("1015")) {
				return data[item];
			}
		})
		.filter(Boolean);

    

    return (
        <div>
            
        </div>
    );
};

export default TESt;