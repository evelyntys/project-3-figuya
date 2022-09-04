# FIGU屋
The live demo of the site can be found [here](https://figuya.netlify.app/).

Github repository for admin panel can be found [here](https://github.com/evelyntys/project-3-express).

Test Accounts: 

    1. Admin at https://etys-figuya-express.herokuapp.com/
    * Username: admin
    * Password: admin123
    
    2. Customer at https://figuya.netlify.app/
    * Username: customer
    * Password: customer123

## Project Summary
FIGU屋 <i>(FIGUYA)</i> is an e-commerce platform meant for the sale of various kinds of figures. With the boom of social media platforms such as TikTok and Instagram, where people are able to share snippets of their lives & hobbies easily, there seems to be an increase in casual interest in figure collection. For example, blind boxes (where the figure you get remains a secret until the packaging is opened) has recently seen a great increase in general interest, possibly due to the mystery factor as well.

## The Five Planes of UI/UX
### <b>1. Strategy</b>
#### Organisation's Goals
Objective(s): To target figure collectors and the general crowd that have an interest in figures/figure collection.

#### Users's Goals:
Objective(s): To look for figures they are interested in, be it for collection or for general display for avid collections and/or individuals with a casual interest
* Needs: 
    * Search for figures for a specific character
    * Search for figures from a specific series and/or collection
    * Search for figures by a specific manufacturer
    * Search for figures by size (if figure is to be put in a specific position/display case)
* Pain point(s):
    * Unable to search by size of figures (especially if they have a designated spot to place the figure(s)

 User Stories    | Acceptance Criteria(s)    
 -------------   | ---------------------      
As someone with a casual interest, I would like to view the figures available and their price points.| <ul><li>Products to be searchable by price points.</li><li>Show newly listed products to know what is new on the market</li><li>Display similar products from same series</li></ul>
As an avid figure collector, I would like to be able to search for the size of the figure so that I could see if it would fit in my display case. | <ul><li>Products to have a field for size, and be searchable by size.</li></ul>

### <b> 2. Scope</b>

<b>Content</b>
Products will be provided by the shop owner and admins. A server is also required for communication between the front-end and back-end platform. Hence, an [express server](https://etys-figuya-express.herokuapp.com/) has been set up, which serves as an admin panel and provides the restful API endpoints at the same time.

<b>Functional Requirements</b>

1. eCommerce Platform
    * Search filters for figures including but not limited to: name, series, figure type, height
    * Customer registration & login
    * Password management
    * Cart functionalities, payment & orders

2. Admin panel
    * Search filters for figures including but not limited to: name, series, figure type, stock status
    * Login and password management
    * Product management: creation, reading, updating & deletion
    * Orders management: reading & updating

<b>Non-functional Requirements</b>
* Mobile responsiveness: the site's functionality should still remain on mobile version and their experience should still be optimized
* Loading gif to indicate that the site is still retrieving data from the restful API

### <b> 3. Structure</b>
![Structure of the website](/readme/structure.png)

### <b> 4. Skeleton</b>
An initial wireframe of the site layout has been attached [here]() for reference.


### <b> 5. Surface</b>
* The main colours used in this website include various shades of orange to achieve a bright and fun image, associated with that of hobbies.
* Fonts used in this website include:
    * Quicksand for general body text
    * Yomogi for site branding


## Testing

## Technologies Used
<b >Backend </b>
1. [Express & NodeJS](https://expressjs.com/) as the framework for API endpoints
2. [db-migrate](https://db-migrate.readthedocs.io/en/latest/) for database migration
3. [Bookshelf.js](https://bookshelfjs.org/api.html) for accessing database
4. [cors middleware](https://expressjs.com/en/resources/middleware/cors.html) to enable CORS
5. [dotenv](https://www.npmjs.com/package/dotenv) for .env file containing environment variables
6. [Caolan forms](https://github.com/caolan/forms) for creation and validation of forms
7. [MomentJS](https://momentjs.com/timezone/docs/) for date & datetime display
8. [express-session](https://www.npmjs.com/package/express-session) to manage sessions
9. [express-flash](https://github.com/RGBboy/express-flash) to display lflash messages
10. [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) for user authentication on front-end
11. [handlebars](https://handlebarsjs.com/) to generate templates
12. [Cloudinary](https://cloudinary.com/) for image upload
13. [Bootstrap v5.2](https://getbootstrap.com/) for general styling of the website
14. [Bootstrap icons](https://icons.getbootstrap.com/)
15. [Canva color wheel](https://www.canva.com/colors/color-wheel/) to help generate color palettes

<b> Frontend </b>
1. [ReactJS](https://reactjs.org/) for the frontend framework
2. [react-router-dom](https://v5.reactrouter.com/web/guides/quick-start) for path routing in React App
3. [Axios](https://github.com/axios/axios) for calling API and getting data from promises
4. [Bootstrap v5.2](https://getbootstrap.com/) for general styling of the website
5. [React Bootstrap](https://react-bootstrap.github.io/) for reactive components such as Accordions, Modals, Tooltips & Navbar.
6. [Bootstrap icons](https://icons.getbootstrap.com/)
7. [jwt_decode](https://github.com/auth0/jwt-decode) to check token validity
8. [Stripe](https://stripe.com/en-gb-sg) for payments & checkout
9. [MomentJS](https://momentjs.com/timezone/docs/) for date & datetime display
10. [React-Toastify](https://fkhadra.github.io/react-toastify/introduction/) for toasts
11. [Canva color wheel](https://www.canva.com/colors/color-wheel/) to help generate color palettes


<b> Platforms and Softwares </b>
1. [Github](https://github.com/) for the repository and version control
2. [Gitpod](https://gitpod.io/) for code editing
3. [Heroku](https://www.heroku.com/) to deploy Express server
4. [Netlify](https://www.netlify.com/) to deploy React App

## Credits
### Images and icons
1. Site logo: <a href="https://www.flaticon.com/free-icons/japan" title="japan icons">Japan icons created by Freepik - Flaticon</a>
2. [Landing page header](https://www.pexels.com/video/the-lucky-cat-1795797/)
3. User cat image: <a href="https://www.flaticon.com/free-icons/cute" title="cute icons">Cute icons created by BZZRINCANTATION - Flaticon</a>
4. Success checkout icon: <a href="https://www.flaticon.com/free-icons/commerce-and-shopping" title="commerce and shopping icons">Commerce and shopping icons created by Ubaid El-Ahyar Alyafizi - Flaticon</a>
5. Cancel checkout icon: <a href="https://www.flaticon.com/free-icons/cancel" title="cancel icons">Cancel icons created by Freepik - Flaticon</a>
6. [Google Fonts](https://www.fonts.google.com)
7. Images for Carousel: 
    1. https://blog.fromjapan.co.jp/en/anime/best-japanese-anime-figure-brands-for-beginning-collectors.html
    2. https://www.buyandship.com.sg/blog/2021/09/01/collect-the-iconic-funko-pop-figures-from-amazon/
    3. https://daxueconsulting.com/pop-mart-designer-toy-market-in-china/
8. [Justaway loader](https://lottiefiles.com/51373-justaway)
9. [Background image for Profile & Backend](https://images.unsplash.com/photo-1658233427921-ea472627412c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGFuaW1lJTIwZmlndXJlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60)
10. Product images & data from a variety of websites as listed (but not limited to):
    * [HakkenOnline](https://www.hakkenonline.com/)
    * [PopmartSg](https://popmart.sg/)
    * [OtakuHouse](https://shop.otakuhouse.com/)
    * [ToyOrGame](https://toyorgame.com.sg/)
11. Figure guides:
    * https://solarisjapan.com/blogs/news/anime-figure-collect-guide
    * https://medium.com/the-crown-writer/all-about-anime-figurines-62d42db514e#:~:text=To%20put%20it%20simply%2C%20a,in%20a%20variety%20of%20styles.


### Adapted codes/functionality
1. [Pagination](https://levelup.gitconnected.com/a-simple-guide-to-pagination-in-react-facd6f785bd0)


## Deployment
### <b>Backend</b>
Deployment for express server was completed using [Heroku](https://www.heroku.com/).

### <b>Frontend</b>
Deployment for React app was completed using [Netlify](https://www.netlify.com/).

Instructions for deploying with react-router-dom found from [FreeCodeCamp](https://www.freecodecamp.org/news/how-to-deploy-react-router-based-app-to-netlify/).