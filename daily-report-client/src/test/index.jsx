/** @format */

import data from "../../public/prison_list.json";

const TESt = () => {
	const result = {};

	for (const jail in data) {
		for (const key in data[jail]) {
			let totalEntry = 0;
			let totalRelease = 0;
			let count = 0; // To count the number of data points
			for (const date in data[jail][key]) {
				const values = data[jail][key][date];
				totalEntry += values.entry;
				totalRelease += values.release;
				count++;
			}
			const averageEntry = totalEntry / count;
			const averageRelease = totalRelease / count;
			result[key] = {
				totalEntry,
				totalRelease,
				averageEntry,
				averageRelease,
			};
		}
	}

	console.log(result);
	return <div></div>;
};

export default TESt;
