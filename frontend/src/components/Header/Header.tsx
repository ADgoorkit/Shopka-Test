import { AppBar, Avatar, Badge, Box, Toolbar } from '@mui/material';
import React, { useEffect } from 'react';
import { Button, Input } from '../UI';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../assets/images/logo.svg';
import styled from '@emotion/styled';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useLocation, useNavigate } from 'react-router-dom';
import { getWatchList } from '../../store/slices/product/selector/watchListSelector';

const SearchInput = styled(Input)`
  .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }
`;

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const [searchValue, setSearchValue] = React.useState('');

  const { watchList } = useAppSelector(getWatchList);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const search = new URLSearchParams(location.search).get('search');

    if (search) {
      setSearchValue(search);
    }
  }, []);

  const handleClearSearch = () => {
    setSearchValue('');

    const queryParams = new URLSearchParams(location.search);

    queryParams.delete('search');

    navigateWithSearch(queryParams);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams(location.search);

    if (searchValue.trim() !== '') {
      queryParams.set('search', searchValue);
    } else {
      queryParams.delete('search');
    }

    navigateWithSearch(queryParams);
  };

  const navigateWithSearch = (queryParams: URLSearchParams) => {
    if (location.pathname !== '/') {
      navigate('/?' + queryParams.toString());
    } else {
      navigate('/?' + queryParams.toString(), { replace: true });
    }
  };

  return (
    <div>
      <AppBar
        position='static'
        sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}
      >
        <Toolbar>
          <Box
            sx={{ marginRight: '70px', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <img src={logo} alt='logo' />
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <SearchInput
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              showClearButton={true}
              onClear={handleClearSearch}
              placeholder='Search...'
              sx={{
                width: '70%',
                backgroundColor: '#EDEDF0',
                borderRadius: '32px',
                border: 'none',
              }}
              InputProps={{
                style: { height: '48px' },
                startAdornment: (
                  <SearchIcon
                    sx={{ marginRight: '16px', cursor: 'pointer' }}
                    onClick={handleSearch}
                  />
                ),
              }}
            />
          </Box>

          <Badge
            badgeContent={watchList?.length || 0}
            color='error'
            sx={{ marginX: '26px' }}
          >
            <Button
              variant='outlined'
              size='large'
              onClick={() => navigate('/watch')}
            >
              Watch
            </Button>
          </Badge>

          <Avatar alt='Profile' src='/profile.jpg' />
        </Toolbar>
      </AppBar>
    </div>
  );
};
