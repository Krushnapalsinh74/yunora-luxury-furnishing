import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";

import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import Categories from "@/pages/Categories";
import Category from "@/pages/Category";
import Collections from "@/pages/Collections";
import Collection from "@/pages/Collection";
import NewArrivals from "@/pages/NewArrivals";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Wishlist from "@/pages/Wishlist";
import Checkout from "@/pages/Checkout";
import OrderSuccess from "@/pages/OrderSuccess";
import TrackOrder from "@/pages/TrackOrder";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import Profile from "@/pages/Profile";
import Orders from "@/pages/Orders";
import OrderDetails from "@/pages/OrderDetails";
import Addresses from "@/pages/Addresses";
import Warranty from "@/pages/Warranty";
import Feedback from "@/pages/Feedback";
import About from "@/pages/About";
import Manufacturing from "@/pages/Manufacturing";
import BecomeDealer from "@/pages/BecomeDealer";
import Blogs from "@/pages/Blogs";
import BlogDetail from "@/pages/BlogDetail";
import Contact from "@/pages/Contact";
import StoreLocator from "@/pages/StoreLocator";
import FAQ from "@/pages/FAQ";
import ShippingPolicy from "@/pages/ShippingPolicy";
import ReturnPolicy from "@/pages/ReturnPolicy";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsConditions from "@/pages/TermsConditions";
import Search from "@/pages/Search";
import Admin from "@/pages/Admin";
import Maintenance from "@/pages/Maintenance";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/categories" component={Categories} />
      <Route path="/collections" component={Collections} />
      <Route path="/collection/:slug" component={Collection} />
      <Route path="/new-arrivals" component={NewArrivals} />
      <Route path="/best-sellers" component={Shop} />
      
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/category/:slug" component={Category} />
      
      <Route path="/cart" component={Cart} />
      <Route path="/wishlist" component={Wishlist} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/order-success" component={OrderSuccess} />
      <Route path="/track-order" component={TrackOrder} />

      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />

      <Route path="/profile" component={Profile} />
      <Route path="/profile/orders" component={Orders} />
      <Route path="/profile/orders/:id" component={OrderDetails} />
      <Route path="/profile/addresses" component={Addresses} />
      <Route path="/profile/warranty" component={Warranty} />
      <Route path="/profile/feedback" component={Feedback} />

      <Route path="/about" component={About} />
      <Route path="/manufacturing" component={Manufacturing} />
      <Route path="/become-dealer" component={BecomeDealer} />
      <Route path="/blogs" component={Blogs} />
      <Route path="/blogs/:slug" component={BlogDetail} />
      <Route path="/contact" component={Contact} />
      <Route path="/store-locator" component={StoreLocator} />
      
      <Route path="/faq" component={FAQ} />
      <Route path="/shipping-policy" component={ShippingPolicy} />
      <Route path="/return-policy" component={ReturnPolicy} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-conditions" component={TermsConditions} />

      <Route path="/search" component={Search} />
      <Route path="/admin" component={Admin} />
      <Route path="/maintenance" component={Maintenance} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </CartProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
