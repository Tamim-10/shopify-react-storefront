import React, { useState, createContext, useEffect } from 'react';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: import.meta.env.VITE_SHOP_DOMAIN,
  apiVersion: '2024-04',
  publicAccessToken: import.meta.env.VITE_SHOP_TOKEN,
});

console.log("client:", client);
console.log("typeof client.request:", typeof client.request);

const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [checkout, setCheckout] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aboutContent, setAboutContent] = useState('');

  useEffect(() => {
    const existingCartId = localStorage.getItem('cart_id');
    if (existingCartId) {
      fetchCart(existingCartId);
    } else {
      createCart();
    }
    fetchAboutContent(); // fetch about us on mount
  }, []); 

const createCart = async () => {
    const mutation = `
      mutation {
        cartCreate {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            message
          }
        }
      }
    `;
    try {
      const response = await client.fetch(mutation);
      const result = await response.json();
      const cart = result.data.cartCreate.cart;

      if (cart?.id) {
        localStorage.setItem('cart_id', cart.id);
        setCheckout(cart);
      } else {
        console.error("Cart creation failed:", result.data.cartCreate.userErrors);
      }
    } catch (error) {
      console.error("Cart creation error:", error);
    }
  };

  const fetchCart = async (cartId) => {
    const query = `
      query GetCart($id: ID!) {
        cart(id: $id) {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    try {
      const response = await client.fetch(query, {
        variables: { id: cartId },
      });
      const result = await response.json();
      setCheckout(result.data.cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };


 const fetchAllProducts = async () => {
   const query = `
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
    try {
      const response = await client.fetch(query);
      const result = await response.json();
      const productsData = result.data.products.edges.map(edge => edge.node);
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching all products:', error);
    }
  };


  const fetchProductWithHandle = async (handle) => {
    
    const productQuery = `
    query ProductQuery($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        images(first: 5) {
          edges {
            node {
              id
              altText
              originalSrc
              transformedSrc
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
              image {
                id
                altText
                originalSrc
              }
            }
          }
        }
      }
    }
  `;

    try {
      const { data } = await client.request(productQuery, {
        variables: { handle },
      });

      console.log('product data',data.product);

      if (data?.product) {

        setProduct(data.product);
      } else {
        console.warn('Product not found for handle:', handle);
      }
    } catch (error) {
      console.error('Error fetching product by handle:', error);
    }
  }; 

  const addItemToCheckout = async (variantId, quantity = 1, attributes = []) => {

  let cartId = localStorage.getItem('cart_id');

  if (!cartId || !variantId) {
    console.error('Missing cartId or variantId');
    return;
  }

  const mutation = `
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                  product {
                    title
                  }
                }
              }
              attributes {
                key
                value
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
  `;

  const variables = {
    cartId,
    lines: [
      {
        merchandiseId: variantId,
        quantity, 
        attributes,
      },
    ],
  };

  try {
   const { data, errors } = await client.request(mutation, { variables });

    if (errors?.length) {
      console.error("GraphQL errors:", errors);
      return;
    }

    if (data?.cartLinesAdd?.userErrors?.length > 0) {
      data.cartLinesAdd.userErrors.forEach(error => {
        console.error(`User Error - ${error.field?.join('.') || 'unknown'}: ${error.message}`);
      });
      return;
    }

    const returnedCart = data?.cartLinesAdd?.cart;

    if (returnedCart) {
      setCheckout(returnedCart);
      openCart();
    } else {
      console.warn("Cart is missing in response. Attempting to recreate cart.");
      localStorage.removeItem('cart_id');
      await createCart(); // optionally re-add the item after recreation
    }

  } catch (error) {
    console.error("Request failed:", error);
  }
};

  const removeLineItem = async (lineId) => {
  const cartId = localStorage.getItem('cart_id');

  if (!cartId || !lineId) {
    console.error("Missing cart ID or line ID.");
    return;
  }

  console.log("cartId:", cartId);
  console.log("lineId:", lineId);

  const mutation = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                    product {
                      title
                    }
                  }
                }
                attributes {
                  key
                  value
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    cartId,
    lineIds: [lineId],
  };

  try {
    const { data, errors } = await client.request(mutation, { variables });

    if (errors?.length) {
      console.error("GraphQL errors:", errors);
      return;
    }

    const userErrors = data?.cartLinesRemove?.userErrors || [];
    if (userErrors.length > 0) {
      userErrors.forEach(err => {
        console.error(`User Error - ${err.field?.join('.') || 'unknown'}: ${err.message}`);
      });
      return;
    }

    const updatedCart = data?.cartLinesRemove?.cart;

    if (updatedCart?.id) {
      setCheckout(updatedCart); 
      console.log("Cart updated after line removal:", updatedCart);

      if (updatedCart.lines.edges.length === 0) {
        console.log("Cart is now empty.");
        // Optional: close cart or show empty message
        // setIsCartOpen(false);
      }
    } else {
      console.warn("No cart returned after removal.");
    }

  } catch (error) {
    console.error("Request failed:", error);
  }
  };

  const updateLineItemQuantity = async (lineId, quantity) => {
    const cartId = localStorage.getItem('cart_id');

    if (!cartId || !lineId || quantity < 1) {
      console.error("Missing cart ID, line ID, or invalid quantity.");
      return;
    }

    const mutation = `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      product {
                        title
                      }
                      image {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      cartId,
      lines: [
        {
          id: lineId,
          quantity: quantity,
        },
      ],
    };

    try {
      const { data, errors } = await client.request(mutation, { variables });

      if (errors?.length) {
        console.error("GraphQL errors:", errors);
        return;
      }

      const userErrors = data?.cartLinesUpdate?.userErrors;
      if (userErrors?.length > 0) {
        userErrors.forEach((error) => {
          console.error(`User Error - ${error.field?.join('.')}: ${error.message}`);
        });
        return;
      }

      const updatedCart = data?.cartLinesUpdate?.cart;
      if (updatedCart) {
        setCheckout(updatedCart);
      }

    } catch (error) {
      console.error("Error updating line item quantity:", error);
    }
  }; 

  const fetchAboutContent = async () => {
  const query = `
    query GetPage($handle: String!) {
      page(handle: $handle) {
        title
        body
      }
    }
  `;

  try {
    const { data } = await client.request(query, {
      variables: { handle: "about-us" }, // This is your Shopify page handle
    }); 

    if (data?.page?.body) {
      setAboutContent(data.page.body);
    } else {
      console.warn("No About Us content found.");
    }
  } catch (error) {
    console.error("Error fetching About Us content:", error);
  }
};

  const closeCart = () => setIsCartOpen(false);
  const openCart = () => setIsCartOpen(true);
  const closeMenu = () => setIsMenuOpen(false);
  const openMenu = () => setIsMenuOpen(true);
 
  return (
    <ShopContext.Provider
      value={{
        product,
        products,
        checkout,
        isCartOpen, 
        isMenuOpen,
        fetchAllProducts,
        fetchProductWithHandle,
        closeCart,
        openCart,
        closeMenu,
        openMenu,
        setCheckout,
        addItemToCheckout,
        removeLineItem,
        updateLineItemQuantity,
        aboutContent
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}; 
   
export { ShopContext };  
export default ShopProvider;