import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { RoutePaths } from '../../routes/routes.enum';
import { Icon } from '../baseComponents/Icon';
import { IconName } from '../baseComponents/Icon/Icon.enum';
import { MenuCategories } from '../MenuCategories';
import { LogoVariant } from '../Logo/Logo.enum';
import { Logo } from '../Logo';
import styles from './Footer.module.scss';

const Footer: React.FC = () => (
  <footer className={classNames('ls-2', styles.root)}>
    <Container maxWidth="lg" sx={{ pb: 4 }}>
      <div className={classNames(styles.footerRow)}>
        <div className={classNames(styles.footerColumn)}>
          <div className={classNames(styles.logo)}>
            <Logo variant={LogoVariant.WHITE} />
          </div>
          <Link className={classNames('link', styles.link)} to={RoutePaths.ABOUT}>
            About Us
          </Link>
          <div className={classNames(styles.links)}>
            <Link className={classNames('link', styles.link)} to={RoutePaths.LOGIN}>
              Sign In
            </Link>
            <span className={classNames('link', styles.divider)}>|</span>
            <Link className={classNames('link', styles.link)} to={RoutePaths.REGISTRATION}>
              Sign Up
            </Link>
          </div>
        </div>
        <div className={classNames(styles.footerColumn)}>
          <Typography variant="h5" component="h5" sx={{ mb: '8px' }}>
            Categories
          </Typography>
          <MenuCategories />
        </div>
        <div className={classNames(styles.footerColumn)}>
          <Typography variant="h5" component="h5" sx={{ mb: '8px' }}>
            Contact Us
          </Typography>
          <List>
            <ListItem sx={{ p: 0, mb: 2 }}>
              <Icon name={IconName.PHONE} width={32} height={32} className={classNames('icon', 'mr-1')} />
              <a className="text-inherit" href="tel:+38068588284186">
                (+380) 68 018 45 67
              </a>
            </ListItem>
            <ListItem sx={{ p: 0, mb: 2 }}>
              <Icon name={IconName.WHATSUP} width={32} height={32} className={classNames('icon', 'mr-1')} />
              <a className="text-inherit" href="tel:+38068588284186">
                (+380) 68 018 45 67
              </a>
            </ListItem>
            <ListItem sx={{ p: 0, mb: 2 }}>
              <Icon name={IconName.EMAIL} width={32} height={32} className={classNames('icon', 'mr-1')} />
              <a className="text-inherit" href="mailto:yescode@gmail.com">
                (+380) 68 018 45 67
              </a>
            </ListItem>
          </List>
        </div>
      </div>
    </Container>
    <p className={classNames('ls-1', styles.copyright)}>
      {'All rights reserved. © '} {new Date().getFullYear()}.
    </p>
  </footer>
);

export default Footer;
