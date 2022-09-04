// import React from 'react';
// import scriptLoader from 'react-async-script-loader';
// import axios from 'axios';

// const StripeForm = ({ isScriptLoaded, isScriptLoadSucceed }) => {
//     const [stripe, setStripe] = React.useState(null);
//     const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us63.gitpod.io/api/"
//     React.useEffect(() => {
//         if (isScriptLoaded && isScriptLoadSucceed) {
//             setStripe(window.Stripe('pk_test_51LSE0wAXpuJpT3zyYnIpXAcmznF097VyDES5orM4tuDZ6RZ5ojl4PnphcAsPfkyNWwGg3KFdQ3ct5nj2qnjDXgnA00arMtGuQr'));
//         }
//     }, [isScriptLoaded, isScriptLoadSucceed]);

//     const handleSubmit = async event => {
//         event.preventDefault();

//         let checkoutResponse = await axios.post(url + "checkout", {
//             customer_email: checkoutDetails.customer_email,
//             block_street: checkoutDetails.block_street,
//             unit: checkoutDetails.unit,
//             postal: checkoutDetails.postal
//         });
//         console.log(checkoutResponse.data);

//         const result = await stripe.redirectToCheckout({
//             sessionId: checkoutResponse.data.id,
//         });

//         console.log(result.error.message);
//     };

//     if (!stripe) {
//         return null;
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <button type="submit">Checkout</button>
//         </form>
//     );
// };

// export default scriptLoader('https://js.stripe.com/v3/')(StripeForm);