/** @format */

import { format } from "date-fns";
import { useState } from "react";

const PDFPage = ({ data, usersName, activeLockup, reportDate }) => {
	const reportD = reportDate || format(new Date(), "yyyy-MM-dd");

	const [todaysReport, setTodaysReport] = useState(0);

	const objectArr = Object.keys(data);

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

	const newObj = {};

	for (const key in data) {
		const [firstPart, lastPart] = key.split("|");
		newObj[lastPart] = newObj[lastPart] || {};
		newObj[lastPart][key] = data[key];
	}

	const sortedNewObj = {};

	Object.keys(newObj)
		.sort()
		.forEach(key => {
			sortedNewObj[key] = newObj[key];
		});

	const totalEntryRelease = {};

	for (const jailName in sortedNewObj) {
		let totalEntry = 0;
		let totalRelease = 0;

		const jailData = sortedNewObj[jailName];
		for (const warderName in jailData) {
			for (const itemData of Object.keys(jailData[warderName])) {
				if (itemData === reportD) {
					totalEntry += jailData[warderName][itemData].entry;
					totalRelease += jailData[warderName][itemData].release;
				}
			}
		}

		totalEntryRelease[jailName] = { totalEntry, totalRelease };
	}

	const va = Object.keys(sortedNewObj).map(value => {
		const array = [];
		Object.keys(sortedNewObj[value]).map(station => {
			if (station.startsWith("jailWarder")) {
				array.push(station);
			} else {
				array.splice(array.length - 1, 0, station);
			}
		});
	});

	return (
		<div className='mt-5'>
			{Object.keys(sortedNewObj).map((value, i) => {
				const stationKeys = Object.keys(sortedNewObj[value]);
				const jailWarderItems = [];
				const otherItems = [];

				stationKeys.forEach(station => {
					if (station.startsWith("jailWarder")) {
						jailWarderItems.push(station);
					} else {
						otherItems.push(station);
					}
				});

				const allItems = otherItems.concat(jailWarderItems);
				console.log();
				return (
					<div key={value}>
						<div className='text-[15px] text-black bg-[#34A853] px-1 font-bold py-1'>
							{`(${i + 1}) ${value}`}{" "}
							<span className='mx-2'>
								{" Pri-"}
								{activeLockup?.[value]?.lockupPrison ?? 0}
							</span>
							<span className='mx-2'>
								{" Entry-"}
								{totalEntryRelease?.[value]?.totalEntry}
							</span>
							<span className='mx-2'>
								{" Pri-"}
								{totalEntryRelease?.[value]?.totalRelease}
							</span>
							<span className='mx-2'>
								{"Active Pri-"}
								{activeLockup?.[value]?.activePrison ?? 0}
							</span>
						</div>
						{allItems.map(operator => {
							// console.log(
							// 	activeLockup[operator.split("|")[1]],
							// 	" this iis "
							// );
							return (
								//    the
								<div key={operator}>
									<div className='text-[15px] text-white  px-2 font-bold mt-2'>
										{operator.startsWith("jailWarder")
											? "Jail Warder"
											: usersName[operator.split("|")[0]]}
									</div>
									<div className='px-3'>
										<div className='flex items-center '>
											<div className='mr-2'>Entry:</div>
											{Object.keys(
												sortedNewObj[value][operator]
											)
												.sort(
													(a, b) =>
														new Date(b) -
														new Date(a)
												)
												.map((date, index, array) => {
													const isLast =
														index ===
														array.length - 1; // Check if it's the last element

													return (
														<div key={date}>
															{`${
																sortedNewObj[
																	value
																][operator][
																	date
																].entry
															}${
																isLast
																	? ""
																	: "+"
															}`}
														</div>
													);
												})}
										</div>

										<div
											key={operator}
											className='flex items-center '
										>
											<div className='mr-2'>Release:</div>
											{Object.keys(
												sortedNewObj[value][operator]
											)
												.sort(
													(a, b) =>
														new Date(b) -
														new Date(a)
												)
												.map((date, index, array) => {
													const isLast =
														index ===
														array.length - 1; // Check if it's the last element
													return (
														<div key={date}>
															{`${
																sortedNewObj[
																	value
																][operator][
																	date
																].release
															}${
																isLast
																	? ""
																	: "+"
															}`}
														</div>
													);
												})}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default PDFPage;
