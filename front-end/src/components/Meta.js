import { Helmet } from 'react-helmet';

const Meta = ({ title, keywords, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to TechShop',
  keywords:
    'electronics,iphone, camera, buy online, buy electronics, cheap electronics',
  description: 'We sell the best products for cheap'
};

export default Meta;
