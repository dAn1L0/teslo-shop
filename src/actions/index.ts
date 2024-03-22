

export { getUserAddress } from './address/get-user-address';
export { setUserAddress } from './address/set-user-address';
export { removeUserAddress } from './address/remove-user-address';

export { getCountries } from './country/get-countries';

export * from './products/product-pagination';
export { getProductBySlug } from './products/get-product-by-slug';
export { getStockBySlug } from './products/get-stock-by-slug';
export { createUpdateProduct } from './products/create-update-product';
export { removeProductImage } from './products/remove-product-image';

export { placeOrder } from './order/place-order';
export { getOrderById } from './order/get-order-by-id';
export { getOrdersByUser } from './order/get-orders-by-user';
export { getPaginatedOrders } from './order/get-paginated-orders';

export { getPaginatedUsers } from './user/get-paginated-users';
export { changeRoleUser } from './user/change-role-user';

export { setTransactionId } from './payments/set-transaction-id';
export { paypalCheckPayment } from './payments/paypal-check-payment';


export { login, authenticate } from './auth/login';
export { registerUser } from './auth/register';
export { logout } from './auth/logout';

export { getCategories } from './category/get-categories'