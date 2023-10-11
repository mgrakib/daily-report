import { useDispatch } from "react-redux";
import useChangeNavStatus from "../../hooks/useChangeNavStatus/useChangeNavStatus";
import { changeNavState } from "../../redux/features/nav-value-state/navValueSlice";

const DownloadReport = () => {
	//change automatically nav name and state
	const dispatch = useDispatch();
	useChangeNavStatus(dispatch, changeNavState, true, "DOWNLOAD REPORT");
	return <div className='text-dark-common-color'>download report</div>;
};

export default DownloadReport;