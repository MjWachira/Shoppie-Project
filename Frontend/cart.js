//const productContainer = document.getElementById('productContainer');
const cartContainer = document.getElementById('cartContainer');
const clearCart=document.querySelector('.clearCart')
const subTotal=document.querySelector('.subTotal')
    
    // Function to view the cart
    
    function viewCart() {
        axios.get(`http://localhost:4700/cart/viewCart/${localStorage.getItem('id')}`,
        {
          headers: {
            "token":localStorage.getItem('token')
          }
        })
          .then(response => {
            console.log(response.data)
            const cartItems = response.data.cart;
  const ItemsIn=cartItems.length
  localStorage.setItem('itemis',ItemsIn)

            // Clear previous cart items
            cartContainer.innerHTML = '';
  
            // Render cart items using forEach loop
            cartItems.forEach(cartItem => {
              const cartItemDiv = createCartItemElement(cartItem);
              cartContainer.appendChild(cartItemDiv);
            });
            //find total cost
            const totalCost = cartItems.reduce((total, cartItem) => {
              return total + cartItem.productCost;
            }, 0);
            subTotal.textContent=totalCost

          })
          .catch(error => {
            console.error('Error fetching cart items:', error);
          });
        }
        
            // Function to create a cart item element
    function createCartItemElement(cartItem) {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.className="cartItemDiv"
  
        const itemName = document.createElement('span');
        itemName.textContent = cartItem.productName;
  cartItem.className="cartItem"
        const itemImg=document.createElement('img')
        itemImg.src=cartItem.productImg
       console.log(cartItem.productImg)

        const itemCost = document.createElement('span');
        itemCost.textContent = `Ksh ${cartItem.productCost}`;
  
        const deleteButton = document.createElement('button');


        deleteButton.textContent = 'Remove';
        deleteButton.onclick = () => deleteOneFromCart(cartItem.productId);
  
       cartItemDiv.appendChild(itemImg);
        cartItemDiv.appendChild(itemName);
        cartItemDiv.appendChild(itemCost);
        cartItemDiv.appendChild(deleteButton);
        
  
        return cartItemDiv;
      }

          // Function to delete a single item from the cart
    function deleteOneFromCart(cartItemId) {
        axios.delete(`http://localhost:4700/cart/removeOne/${cartItemId}`,
        {
          headers: {
            "token":localStorage.getItem('token')
          }
        })
          .then(response => {
            console.log(`Deleted item with ID ${cartItemId} from the cart.`, response.data);
            viewCart(); // Refresh cart after deleting an item
          })
          .catch(error => {
            console.error(`Error deleting item with ID ${cartItemId} from the cart:`, error);
          });
      }

      // Function to delete all items from the cart
    function deleteAllFromCart() {
        axios.delete(`http://localhost:4700/cart/deleteAll/${localStorage.getItem('id')}`,
        {
          headers: {
            "token":localStorage.getItem('token')
          }
        })
          .then(response => {
            console.log('Deleted all items from the cart.', response.data);
            viewCart(); // Refresh cart after deleting all items
          })
          .catch(error => {
            console.error('Error deleting all items from the cart:', error);
          });
      }
  
      // Initial view of the cart
      viewCart()
      
  