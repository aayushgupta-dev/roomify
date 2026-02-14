import { Box } from "lucide-react";
import Button from "./ui/Button";
import { useOutletContext } from "react-router";

const Navbar = () => {
    const { isSignedIn, userName, signIn, signOut } = useOutletContext<AuthContext>();

    const handleAuthClick = async () => {
        try {
            if (!isSignedIn) {
                await signIn();
            } else {
                await signOut();
            }
        } catch (error) {
            console.error("Auth action failed:", error);
        }
    }

    return (
        <header className="navbar">
            <nav className="inner">
                <div className="left">
                    <div className="brand">
                        <Box className="logo" />
                        <span className="name">Roomify</span>
                    </div>

                    <ul className="links">
                        <a href="#">Product</a>
                        <a href="#">Pricing</a>
                        <a href="#">Community</a>
                        <a href="#">Enterprise</a>
                    </ul>
                </div>

                <div className="actions">
                    {isSignedIn ? (
                        <>
                            <span className="greeting">{userName ? `Hi, ${userName}` : 'Signed In'}</span>

                            <Button size="sm" className="btn" onClick={handleAuthClick}>Log Out</Button>
                        </>
                    ) : (
                        <>
                            <Button size="sm" variant="ghost" onClick={handleAuthClick}>Log In</Button>
                            <a href="#upload" className="cta">Get Started</a>
                        </>
                    )}
                </div>
            </nav >
        </header >
    );
};

export default Navbar;