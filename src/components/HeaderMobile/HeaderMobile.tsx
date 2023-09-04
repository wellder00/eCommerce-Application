import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import { RoutePaths } from '../../routes/routes.enum';
import { IconName } from '../baseComponents/Icon/Icon.enum';
import { Icon } from '../baseComponents/Icon';
import { ThemeToggle } from '../ThemeToggle';
import { LogoVariant } from '../Logo/Logo.enum';
import { SelectCurrency } from '../SelectCurrency';
import { NavBarMobile } from '../NavBarMobile';
import { userStore } from '../../stores';
import { Logo } from '../Logo';
import styles from './HeaderMobile.module.scss';

const HeaderMobile: React.FC = () => {
  const { loggedIn } = userStore;
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const toggleNavBar = (): void => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  return (
    <header className={styles.root}>
      <Container>
        <div className={styles.top}>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={toggleNavBar}>
            <MenuIcon />
          </IconButton>
          <div className={styles.logo}>
            <Logo variant={LogoVariant.DEFAULT} />
          </div>
          <div className={`ml-auto ${styles.flex}`}>
            {loggedIn && (
              <Link to={RoutePaths.PROFILE}>
                <Icon name={IconName.USER} width={40} height={40} color="var(--color-text)" className="icon mr-1" />
              </Link>
            )}
            <Link to={RoutePaths.CART}>
              <Icon name={IconName.CART} width={40} height={40} color="var(--color-text)" className="icon mr-1" />
            </Link>
            {!loggedIn ? (
              <Link to={RoutePaths.LOGIN}>
                <LoginIcon sx={{ ml: '10px' }} fontSize="large" />
              </Link>
            ) : (
              <Link
                to={RoutePaths.MAIN}
                onClick={(): void => {
                  userStore.logout();
                }}
              >
                <LogoutIcon sx={{ ml: '10px' }} fontSize="large" />
              </Link>
            )}
          </div>
        </div>
        <div className={`${styles.flex} ${styles.end}`}>
          <SelectCurrency />
          <ThemeToggle />
        </div>
      </Container>
      <NavBarMobile onClose={toggleNavBar} isOpen={isNavBarOpen} />
    </header>
  );
};

export default observer(HeaderMobile);
