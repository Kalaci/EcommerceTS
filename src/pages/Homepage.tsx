import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Landing from "./../assets/images/Landing.jpg";

const Homepage = () => {
    return (
        <Box
            sx={{
                backgroundImage: `url(${Landing})`, 
                backgroundSize: 'cover', 
                backgroundRepeat: 'no-repeat', 
                backgroundPosition: 'center', 
                minHeight: '100vh', 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
            }}
        >
            <Box
                sx={{
                    textAlign: 'center',
                    maxWidth: '600px',
                    padding: '0 1rem',
                    position: 'relative',
                }}
            >
                <Typography
                    variant="h4"
                    color="white"
                    sx={{
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                        marginBottom: '1rem', 
                    }}
                >
                    Bazaar
                </Typography>
                <Typography variant="body1" sx={{ color: "#F0F8FF"}}>
                    Welcome to our shop! Explore our collection of unique and high-quality products.
                </Typography>
                <Link to="/shop" style={{ textDecoration: 'none' }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ mt: 2, padding: '10px 20px', backgroundColor: "#FBFBFB", color: 'black'}} 
                    >
                        Shop Now
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default Homepage;
