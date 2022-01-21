import { BrowserRouter as Router } from "react-router-dom";
import Pages from "./pages/Pages.js";
import { AuthProvider } from "./helpers/contexts/AuthContext.js";
import { SidebarProvider } from "./helpers/contexts/SidebarContext.js";
import { CategoryProvider } from "./helpers/contexts/CategoryContext.js";
import { ProductProvider } from "./helpers/contexts/ProductContext.js";
import { WishListProvider } from "./helpers/contexts/WishListContext.js";
import { CartProvider } from "./helpers/contexts/CartContext.js";
import { CustomerProvider } from "./helpers/contexts/CustomerContext.js";
import { OrderProvider } from "./helpers/contexts/OrderContext.js";
import { ReviewProvider } from "./helpers/contexts/ReviewContext.js";

import { ScrollToTop } from "react-router-scroll-to-top";

function App() {
  return (
    <CategoryProvider>
      <ProductProvider>
        <WishListProvider>
          <CartProvider>
            <ReviewProvider>
              <AuthProvider>
                <CustomerProvider>
                  <OrderProvider>
                    <SidebarProvider>
                      <div className="App container-fluid min-vh-100 p-0">
                        <Router>
                          <ScrollToTop />
                          <Pages />
                        </Router>
                      </div>
                    </SidebarProvider>
                  </OrderProvider>
                </CustomerProvider>
              </AuthProvider>
            </ReviewProvider>
          </CartProvider>
        </WishListProvider>
      </ProductProvider>
    </CategoryProvider>
  );
}

export default App;
