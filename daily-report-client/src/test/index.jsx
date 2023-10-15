/** @format */

import data from "../../public/prison_list.json";

const TESt = () => {
	console.log(data, ' main data')
	const date = "2023-10-14";
	const result = {};

	for (const jailName in data) {
		let totalEntry = 0;
		let totalRelease = 0;

		const jailData = data[jailName];
		for (const warderName in jailData) {
			for (const itemData of Object.keys(jailData[warderName])) {
				
				if (itemData === date) {
					totalEntry += jailData[warderName][itemData].entry;
					totalRelease += jailData[warderName][itemData].release;
				}
			}
		}

		result[jailName] = { totalEntry, totalRelease };
	}
	console.log(result);
	return <div></div>;
};

export default TESt;
