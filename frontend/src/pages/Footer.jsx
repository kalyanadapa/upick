import React from 'react';
import Grid from '@mui/material/Grid2';
import { Container,  Typography, Link, Box } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#000', py: 4, mt: 4 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Footer Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Company</Typography>
            <Box>
              <Link href="/" color="inherit" sx={{ display: 'block', mb: 1 }}>About Us</Link>
              <Link href="/contact" color="inherit" sx={{ display: 'block', mb: 1 }}>Contact</Link>
              <Link href="/careers" color="inherit" sx={{ display: 'block', mb: 1 }}>Careers</Link>
              <Link href="/privacy-policy" color="inherit" sx={{ display: 'block', mb: 1 }}>Privacy Policy</Link>
            </Box>
          </Grid>

          {/* Customer Service Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Customer Service</Typography>
            <Box>
              <Link href="/faq" color="inherit" sx={{ display: 'block', mb: 1 }}>FAQ</Link>
              <Link href="/returns" color="inherit" sx={{ display: 'block', mb: 1 }}>Returns</Link>
              <Link href="/shipping" color="inherit" sx={{ display: 'block', mb: 1 }}>Shipping</Link>
              <Link href="/order-status" color="inherit" sx={{ display: 'block', mb: 1 }}>Order Status</Link>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Follow Us</Typography>
            <Box>
              <Link href="https://facebook.com" target="_blank" color="inherit" sx={{ mr: 2 }}>
                <Facebook />
              </Link>
              <Link href="https://twitter.com" target="_blank" color="inherit" sx={{ mr: 2 }}>
                <Twitter />
              </Link>
              <Link href="https://instagram.com" target="_blank" color="inherit" sx={{ mr: 2 }}>
                <Instagram />
              </Link>
              <Link href="https://linkedin.com" target="_blank" color="inherit">
                <LinkedIn />
              </Link>
            </Box>
          </Grid>

          {/* Newsletter Signup */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Subscribe to Our Newsletter</Typography>
            <Box>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  padding: '10px',
                  width: '100%',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  marginBottom: '10px',
                }}
              />
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#ff6f61',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Subscribe
              </button>
            </Box>
          </Grid>
        </Grid>
        
        {/* Footer Bottom */}
        <Box sx={{ textAlign: 'center', mt: 4, py: 2 }}>
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} Upick. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
