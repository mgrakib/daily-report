import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	isOpen: false,
	stationsName: [
		"NTMC",
		"Bagerhat District Jail",
		"Bandarban District Jail",
		"Barguna District Jail",
		"Barisal Central Jail",
		"Bhola District Jail",
		"Bogra District Jail",
		"Brahmanbaria District Jail",
		"Chandpur District Jail",
		"Chapai Nawabganj District Jail",
		"Chattogram Central Jail",
		"Chuadanga District Jail",
		"Comilla District Jail",
		"Cox's Bazar District Jail",
		"Dhaka Central Jail",
		"Dinajpur District Jail",
		"Faridpur District Jail",
		"Feni District Jail",
		"Gaibandha District Jail",
		"Gazipur District Jail",
		"Gopalganj District Jail",
		"Habiganj District Jail",
		"Jamalpur District Jail",
		"Jessore Central Jail",
		"Jhalokati District Jail",
		"Jhenaidah District Jail",
		"Joypurhat District Jail",
		"Kashimpur Central Jail-1",
		"Kashimpur Central Jail-2",
		"Kashimpur High security Jail",
		"Kashimpur Female's Central Jail",
		"Khagrachari District Jail",
		"Khulna District Jail",
		"Kishoreganj District Jail",
		"Kurigram District Jail",
		"Kushtia District Jail",
		"Lakshmipur District Jail",
		"Lalmonirhat District Jail",
		"Madaripur District Jail",
		"Magura District Jail",
		"Manikganj District Jail",
		"Meherpur District Jail",
		"Moulvibazar District Jail",
		"Munshiganj District Jail",
		"Mymensingh Central Jail",
		"Narail District Jail",
		"Narayanganj District Jail",
		"Narsingdi District Jail",
		"Natore District Jail",
		"Netrokona District Jail",
		"Nilphamari District Jail",
		"Noakhali District Jail",
		"Pabna District Jail",
		"Panchagarh District Jail",
		"Patuakhali District Jail",
		"Pirojpur District Jail",
		"Rajbari District Jail",
		"Rajshahi Central Jail",
		"Rangamati District Jail",
		"Rangpur Central Jail",
		"Satkhira District Jail",
		"Shariatpur District Jail",
		"Sherpur District Jail",
		"Sirajganj District Jail",
		"Sunamganj District Jail",
		"Sylhet Central Jail",
		"Tangail District Jail",
		"Thakurgao District Jail",
	],
};

export const workStationList = createSlice({
	name: "workStationList",
	initialState,
	reducers: {
		changeStatus: (state, { payload}) => {
			state.isOpen = payload;
		}
	},
});


export const { changeStatus } = workStationList.actions;
export default workStationList.reducer;