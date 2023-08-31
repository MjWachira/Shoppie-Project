'use strict'

const shirts=document.getElementById('shirts')
const jewellery=document.getElementById('jewellery')
const jackets=document.getElementById('jackets')
const shoes=document.getElementById('shoes')
const watches=document.getElementById('watches')
const userImage=document.querySelector('.profilePic')
const search=document.querySelector('.search')
userImage.src=localStorage.getItem('userImage')


//fetch items

const itemsin=document.querySelector('.itemsin')

const productContainer=document.querySelector('.bottom')
    // Fetch products from the API
    function fetchAndRenderProducts(category,searchQuery=''){
      productContainer.innerHTML=""
    axios.get(`http://localhost:4700/product/allProducts/${category}`,
    {
      headers: {
        "token":localStorage.getItem('token')
      }
    })
      .then(response => {
        const products = response.data.products
        console.log(response.data.products)
        //
        const filteredProducts = products.filter(product => {
          const productname = product.productName.toLowerCase();
          const query = searchQuery.toLowerCase();
          return productname.includes(query);
        });
        // Render products using forEach loop

        filteredProducts.forEach(product => {
          const productDiv = document.createElement('div');
          
          productDiv.classList.add('product');
          productDiv.className="productDiv"

          const productImg=document.createElement('img')
          productImg.src = product.productImg;
          productImg.className="productImg"

          const productName = document.createElement('h4');
          productName.textContent = product.productName;

          const productDescription = document.createElement('p');
          productDescription.textContent = product.productDescription;

          const productCost = document.createElement('p');
          productCost.className='cost'
          productCost.textContent = `Price: Ksh ${product.productCost}`;

          const addToCartButton = document.createElement('button');
          addToCartButton.textContent = 'Add to Cart';
          addToCartButton.onclick = () => addToCart(product);

          productDiv.appendChild(productImg)
          productDiv.appendChild(productName);
          productDiv.appendChild(productDescription);
          productDiv.appendChild(productCost);
          productDiv.appendChild(addToCartButton);
          

          productContainer.appendChild(productDiv);
        });
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
    }
    //
    fetchAndRenderProducts('Shoes');

shoes.addEventListener('click', () => {
  fetchAndRenderProducts('Shoes',search.value)
});
watches.addEventListener('click',async () => {

 fetchAndRenderProducts('Watches',search.value)
});
jackets.addEventListener('click', async() => {
fetchAndRenderProducts('Jackets',search.value)
});
jewellery.addEventListener('click',async () => {
  fetchAndRenderProducts('Jewellery',search.value);
});
shirts.addEventListener('click', () => {
  
  fetchAndRenderProducts('Shirts',search.value);
});

    // Function to add a product to the cart
    function addToCart(product) {
      const cartItem = {
        productName: product.productName,
        productCost: product.productCost,
        productImg:product.productImg,
        boughtBy:`${localStorage.getItem('id')}`
      };

      // Send a POST request to add the item to cartTable
      axios.post("http://localhost:4700/cart/add", cartItem,
      {
        headers: {
          "token":localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log(`Added ${product.name} to the cart.`, response.data);
          location.reload()
        })
        .catch(error => {
          console.error(`Error adding ${product.name} to the cart:`, error);
        });
    }


//redirect to cart
    const cart=document.querySelector('.cart')
    cart.addEventListener('click',()=>{
        window.location='./cart.html'
        console.log(fetchAndRenderProducts(''))
    })
//logout function
    const logout=document.querySelector('.logout')
    logout.addEventListener('click',()=>{
        window.location.replace('./login.html')
        localStorage.clear()
    })


    //show items in the cart
    axios.get(`http://localhost:4700/cart/viewCart/${localStorage.getItem('id')}`,
    {
      headers: {
        "token":localStorage.getItem('token')
      }
    })
    .then(response => {
      console.log(response.data)
      const cartItems = response.data.cart;
const itemsIn=cartItems.length
itemsin.textContent=itemsIn
itemsIn.style.color="green"
})

search.addEventListener('input', () => {
  // Filter products based on search query
  const searchQuery = search.value.toLowerCase();
  const productDivs = productContainer.querySelectorAll('div');
  
  productDivs.forEach(productDiv => {
    const productName = productDiv.textContent.toLowerCase();
    if (productName.includes(searchQuery)) {
      productDiv.style.display = 'block';
    } else {
      productDiv.style.display = 'none';
    }
  });
})







