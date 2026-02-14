import { Box } from "lucide-react";
import Button from "./ui/Button";


const Navbar = () => {
    const handleAuthClick = async () => {

    }

    const isSignedIn = false;
    const username = 'aayush'; // Will always be lowercase.

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
                            <span className="greeting">{username ? `Hi, ${username}` : 'Signed In'}</span>

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