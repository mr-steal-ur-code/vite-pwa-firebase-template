import { useRef, useState } from "react";
import Avatar from "./Avatar";
import ThemeSwitch from "./Theme Switch/ThemeSwitch";
import AppToaster from "./Toast/AppToaster";
import bookStore from "../store/bookStore";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ModalProfile from "./ModalProfile";
import { IoHomeSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import Button from "./Button";

const Header = () => {
	const navigate = useNavigate();
	const { user } = bookStore();
	const { isLoggedIn, emailVerified, sendVerificationEmail } = useAuth();
	const modalRef = useRef<ModalHandle>(null);
	const [toggleModal, setToggleModal] = useState(false);
	const [clickDisabled, setClickDisabled] = useState(false);

	const handleDebounceClose = () => {
		setToggleModal(false);
		setClickDisabled(true);
		setTimeout(() => setClickDisabled(false), 300);
	};

	const handleSendEmailVerification = async () => {
		const res = await sendVerificationEmail();
		modalRef?.current?.dismiss();
		if (res.success) {
			toast.success(res.response);
		} else toast.error(res.response);
	};

	return (
		<div
			className={`${
				isLoggedIn && !emailVerified ? "h-20" : "h-16"
			} fixed top-0 w-full flex flex-col text-white bg-bkg2 z-50`}
		>
			<div className={`flex flex-row items-center justify-between px-4 flex-1`}>
				<ThemeSwitch />
				<IoHomeSharp
					className="cursor-pointer text-primary"
					size={30}
					onClick={() => navigate("/")}
				/>
				<div className="flex flex-row gap-2 items-center">
					{isLoggedIn === false ? <Link to="/sign-in">sign in</Link> : null}
					<Avatar
						imageUrl={user?.avatar || null}
						onClick={() => !clickDisabled && setToggleModal(true)}
					/>
				</div>
				<ModalProfile
					user={user}
					isOpen={toggleModal}
					onClose={handleDebounceClose}
				/>
				<AppToaster />
			</div>
			{isLoggedIn && !emailVerified && (
				<span className="text-content text-center">
					Please verify your E-mail{" "}
					<Button
						type="text"
						text="Re-Send email"
						color="text-primary"
						onClick={handleSendEmailVerification}
					/>
				</span>
			)}
		</div>
	);
};

export default Header;
