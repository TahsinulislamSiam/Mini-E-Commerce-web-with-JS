let cart= JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice= parseFloat(localStorage.getItem('totalPrice')) || 0;


const addToCartButtons= document.querySelectorAll('.add-to-cart');
 const cartItems=document.getElementById('cart-items');
 const totalPriceElement= document.getElementById('total-price');
 
 window.addEventListener('load',()=>{
    updateCartDisplay();
 });

addToCartButtons.forEach(button =>{
    button.addEventListener('click',()=>{
       const productName= button.getAttribute('data-name');
       const productPrice = parseFloat(button.getAttribute('data-price'));

     const existingProduct=  cart.find(item=> item.name === productName);
     if(existingProduct){
        existingProduct.quantity +=1;
     }
     else{
        cart.push({
            name:productName,
            price:productPrice,
            quantity:1
        });
     }

     totalPrice += productPrice;

     localStorage.setItem('cart', JSON.stringify(cart));
     localStorage.setItem('totalPrice',totalPrice.toFixed(2));
     updateCartDisplay();
    })
});


const updateCartDisplay=()=>{
    cartItems.innerHTML='';
    cart.forEach((item,index)=>{
      const li= document.createElement('li');  
      li.innerHTML=`
        ${item.name} - ${item.price} x ${item.quantity}
        <button class="remove-item" data-index="${index}"> Remove </button>

      `;

      cartItems.appendChild(li);
    });

    totalPriceElement.textContent=totalPrice.toFixed(2);

   const removeButtons= document.querySelectorAll('.remove-item');
   removeButtons.forEach(button =>{
    button.addEventListener('click',()=>{
      const index =  button.getAttribute('data-index');
      removeCartItem(index);
    })
   })
}

const removeCartItem=(index)=>{
   const item =  cart[index];
  totalPrice-= item.price*item.quantity;

  cart.splice(index,1);
  localStorage.setItem('cart',JSON.stringify(cart));
  localStorage.setItem('totalPrice',totalPrice.toFixed(2));

  updateCartDisplay();
}

buyNowButton.addEventListener('click',()=>{
    if(cart.length>0){
       alert('Thank You For PUrchase!'); 
       cart=[];
       totalPrice=0;
       localStorage.removeItem('cart');
       localStorage.removeItem('totalPrice');
       updateCartDisplay();
    }
    else{
        alert('Buy some Product. Your cart is empty!')
    }
});