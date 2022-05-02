import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Product = React.lazy(() =>
  import(/* webpackChunkName: "pages-product" */ './product')
);
const Profile = React.lazy(() =>
  import(/* webpackChunkName: "pages-profile" */ './profile')
);
const Miscellaneous = React.lazy(() =>
  import(/* webpackChunkName: "pages-miscellaneous" */ './miscellaneous')
);
const Categories = React.lazy(() =>
  import(/* webpackChunkName: "pages-miscellaneous" */ './categories')
);
const Users = React.lazy(() =>
  import(/* webpackChunkName: "pages-miscellaneous" */ './users')
);
const Subscription = React.lazy(() =>
  import(/* webpackChunkName: "pages-miscellaneous" */ './subscription')
);
const Keywords = React.lazy(() =>
  import(/* webpackChunkName: "pages-miscellaneous" */ './keywords')
);
const Payments = React.lazy(() =>
  import(/* webpackChunkName: "pages-miscellaneous" */ './payments')
);
const States = React.lazy(() =>
  import(/* webpackChunkName: "pages-miscellaneous" */ './states')
);
const FAQ = React.lazy(() =>
  import(/* webpackChunkName: "pages-miscellaneous" */ './faq')
);
const Blog = React.lazy(() =>
  import(/* webpackChunkName: "pages-blog" */ './blog')
);
const Subsecribers = React.lazy(() =>
  import(/* webpackChunkName: "pages-subscribers" */ './subscribers')
);
const Contactus = React.lazy(() =>
  import(/* webpackChunkName: "pages-contactus" */ './contactus')
);
const Slider = React.lazy(() =>
  import(/* webpackChunkName: "pages-slider" */ './slider')
);
const Contactvendor = React.lazy(() =>
  import(/* webpackChunkName: "pages-contactvendor" */ './contactvendor')
);

const Pages = ({ match }) => (
  <Suspense fallback={ <div className="loading" /> }>
    <Switch>
      <Redirect exact from={ `${ match.url }/` } to={ `${ match.url }/users` } />
      <Route
        path={ `${ match.url }/product` }
        render={ (props) => <Product { ...props } /> }
      />
      <Route
        path={ `${ match.url }/profile` }
        render={ (props) => <Profile { ...props } /> }
      />
      <Route
        path={ `${ match.url }/blog` }
        render={ (props) => <Blog { ...props } /> }
      />
      <Route
        path={ `${ match.url }/miscellaneous` }
        render={ (props) => <Miscellaneous { ...props } /> }
      />
      <Route
        path={ `${ match.url }/categories` }
        render={ (props) => <Categories { ...props } /> }
      />
      <Route
        path={ `${ match.url }/users` }
        render={ (props) => <Users { ...props } /> }
      />
      <Route
        path={ `${ match.url }/subscription` }
        render={ (props) => <Subscription { ...props } /> }
      />
      <Route
        path={ `${ match.url }/keywords` }
        render={ (props) => <Keywords { ...props } /> }
      />
      <Route
        path={ `${ match.url }/payments` }
        render={ (props) => <Payments { ...props } /> }
      />
      <Route
        path={ `${ match.url }/Subscribers` }
        render={ (props) => <Subsecribers { ...props } /> }
      />
      <Route
        path={ `${ match.url }/states` }
        render={ (props) => <States { ...props } /> }
      />
      <Route
        path={ `${ match.url }/faq` }
        render={ (props) => <FAQ { ...props } /> }
      />
      <Route
        path={ `${ match.url }/Contactus` }
        render={ (props) => <Contactus { ...props } /> }
      />
      <Route
        path={ `${ match.url }/slider` }
        render={ (props) => <Slider { ...props } /> }
      />
      <Route
        path={ `${ match.url }/Contactvendor` }
        render={ (props) => <Contactvendor { ...props } /> }
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Pages;
