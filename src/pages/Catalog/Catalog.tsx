import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';

import { Breadcrumb } from '../../components/baseComponents/Breadcrumb';
import { Categories, RoutePaths } from '../../routes/routes.enum';
import { Card } from '../../components/Card';
import { Filter } from '../../components/Filter';
import { cards } from '../../constants';
import styles from './Catalog.module.scss';

type CatalogParams = {
  category: string;
};

const Catalog: React.FC = () => {
  const { category } = useParams<CatalogParams>();
  const number = 8;

  if (!category || !Object.values(Categories).includes(category as Categories)) {
    return <Navigate to={RoutePaths.ERROR} replace />;
  }

  return (
    <Container className={styles.root} maxWidth="xl">
      <Breadcrumb className={styles.breadcrumb} />
      <section className={styles.section}>
        <aside>
          <div className={styles.filter}>
            <Filter />
          </div>
        </aside>
        <div className={styles.products}>
          <div className={styles.productsPanel}>
            <div className={styles.panelColLeft}>Display: {number} per page</div>
            <div className={styles.panelColRight}>Sorting by: Default</div>
          </div>
          <ul className={`list ${styles.productsList}`}>
            {cards.map((card) => (
              <li className={styles.productItem} key={card.id}>
                <Card
                  productName={card.productName}
                  description={card.description}
                  cardImage={card.cardImage}
                  price={card.price}
                  priceDiscount={card.priceDiscount}
                  priceOld={card.priceOld}
                  currency={card.currency}
                  isDiscount={card.isDiscount}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Container>
  );
};

export default Catalog;
