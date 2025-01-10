import { useState } from 'react';
import { Badge, InputBase, AppBar, Toolbar, Container } from '@mui/material';
import { Search, Person, Favorite, ShoppingBag } from '@mui/icons-material';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AppBar position="sticky"  sx={{ backgroundColor: 'white!important', boxShadow: 2, }} className="z-50">
      <Container maxWidth="xl" sx={{mx:1,p:0}}>
        <Toolbar className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-4xl font-bold bg-gradient-to-r from-pink-700 to-orange-500 text-transparent bg-clip-text">
                Upick
              </span>
            </a>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/men" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">MEN</a>
            <a href="/women" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">WOMEN</a>
            <a href="/kids" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">KIDS</a>
            <a href="/home-living" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">HOME & LIVING</a>
            <a href="/beauty" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">BEAUTY</a>
            
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="w-full flex items-center bg-gray-100 px-3 py-2 rounded-md">
              <Search className="text-gray-400 mr-2" />
              <InputBase
                placeholder="Search for products, brands and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm"
                sx={{
                  '& .MuiInputBase-input': {
                    '&::placeholder': {
                      color: '#9CA3AF',
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            <a href="/profile" className="text-gray-700 hover:text-gray-900">
              <div className="flex flex-col items-center">
                <Person className="h-6 w-6" />
                <span className="text-xs mt-1">Profile</span>
              </div>
            </a>
            <a href="/wishlist" className="text-gray-700 hover:text-gray-900">
              <div className="flex flex-col items-center">
                <Badge badgeContent={0} color="error">
                  <Favorite className="h-6 w-6" />
                </Badge>
                <span className="text-xs mt-1">Wishlist</span>
              </div>
            </a>
            <a href="/bag" className="text-gray-700 hover:text-gray-900">
              <div className="flex flex-col items-center">
                <Badge badgeContent={0} color="error">
                  <ShoppingBag className="h-6 w-6" />
                </Badge>
                <span className="text-xs mt-1">Bag</span>
              </div>
            </a>
          </div>
        </Toolbar>
      </Container>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        <div className="w-full flex items-center bg-gray-100 px-3 py-2 rounded-md">
          <Search className="text-gray-400 mr-2" />
          <InputBase
            placeholder="Search for products, brands and more"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm"
            sx={{
              '& .MuiInputBase-input': {
                '&::placeholder': {
                  color: '#9CA3AF',
                },
              },
            }}
          />
        </div>
      </div>
    </AppBar>
  );
}
