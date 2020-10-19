const products = [
  {
    name: 'Cupcake',
    image:
      'https://res.cloudinary.com/sweetandsour/image/upload/w_600/v1603096370/cupcake_rebfs1.jpg',
    description: 'A tasty cupcake',
    brand: 'Johns Bakery',
    category: 'Baked Goods',
    price: 1.99,
    countInStock: 12,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Ice Cream Drumstick',
    image:
      'https://res.cloudinary.com/sweetandsour/image/upload/w_600,ar_1:1,c_fill,g_auto,e_art:hokusai/v1603096368/icecream_bsr3rj.jpg',
    description: 'Strawberry flavored ice cream drumstick',
    brand: 'Blue Bell',
    category: 'Ice cream',
    price: 1.49,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'Lollipop',
    image:
      'https://res.cloudinary.com/sweetandsour/image/upload/w_600,ar_1:1,c_fill,g_auto,e_art:hokusai/v1603096368/lollipop_ue6dxg.jpg',
    description: 'Lollipop of assorted colors and flavors',
    brand: 'Willy Wonka',
    category: 'Candy',
    price: 0.75,
    countInStock: 55,
    rating: 3,
    numReviews: 12,
  },
  {
    name: 'M&Ms',
    image:
      'https://res.cloudinary.com/sweetandsour/image/upload/w_600/v1603096368/mms_dshxa6.jpg',
    description: 'Americas favorite chocolate candy (price is per pound)',
    brand: 'Mars',
    category: 'Candy',
    price: 2.99,
    countInStock: 11,
    rating: 0.5,
    numReviews: 12,
  },
  {
    name: 'Apple cinnamon muffin',
    image:
      'https://res.cloudinary.com/sweetandsour/image/upload/w_600,ar_1:1,c_fill,g_auto,e_art:hokusai/v1603096368/muffin_zmjlhc.jpg',
    description: 'Tasty apple cinnamon flavored muffin topped with nuts',
    brand: 'Johns Bakery',
    category: 'Baked Goods',
    price: 2.19,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    name: 'Sour Worms',
    image:
      'https://res.cloudinary.com/sweetandsour/image/upload/w_600/v1603096367/worms_ycgi48.jpg',
    description: 'Super sour candy worms (price per pound)',
    brand: 'Willy Wonka',
    category: 'Candy',
    price: 3.79,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
  {
    name: 'Choco-Chip Cookies',
    image:
      'https://res.cloudinary.com/sweetandsour/image/upload/w_600/v1603096374/chocolatechipcookies_o1lswq.jpg',
    description: 'Just like your momma used to make them',
    brand: 'Johns Bakery',
    category: 'Cookies',
    price: 1.49,
    countInStock: 19,
    rating: 5,
    numReviews: 82,
  },
  {
    name: 'Beary Tasty Donut',
    image:
      'https://res.cloudinary.com/sweetandsour/image/upload/w_600/v1603096365/donut_nvbrue.jpg',
    description: 'Topped with chocolate and sprinkles',
    brand: 'Johns Baker',
    category: 'Donuts',
    price: 1.79,
    countInStock: 4,
    rating: 4.5,
    numReviews: 3,
  },
  {
    name: 'Heart Cookies',
    image:
      'https://res.cloudinary.com/sweetandsour/image/upload/w_600/v1603096368/heartcookies_rfblja.jpg',
    description: 'A powdered sugar outside, with a tangy raspberry center',
    brand: 'Mars',
    category: 'Cookies',
    price: 0.77,
    countInStock: 21,
    rating: 3.5,
    numReviews: 9,
  },
  {
    name: 'Sweet and Sours',
    image:
      'https://res.cloudinary.com/sweetandsour/image/upload/w_600,ar_1:1,c_fill,g_auto,e_art:hokusai/v1603096373/sourcandies_ag9g0x.jpg',
    description:
      'Our signature product, the perfect mix of sweets and sours (price per pound)',
    brand: 'Sweet and Sour',
    category: 'Candy',
    price: 2.49,
    countInStock: 38,
    rating: 5,
    numReviews: 52,
  },
  {
    name: 'Rainbow Cakes',
    image:
      'https://res.cloudinary.com/sweetandsour/image/upload/w_600/v1603096366/rainbowcakes_tkn0mx.jpg',
    description: 'Taste the rainbow',
    brand: 'Johns Bakery',
    category: 'Cakes',
    price: 1.99,
    countInStock: 8,
    rating: 5,
    numReviews: 15,
  },
  {
    name: 'Shamrock Cookies',
    image:
      'https://res.cloudinary.com/sweetandsour/image/upload/w_600/v1603096370/shamrockcookies_xgo4rs.jpg',
    description: 'The luck of the irish is in every bite',
    brand: 'Johns Bakery',
    category: 'Cookies',
    price: 0.88,
    countInStock: 45,
    rating: 4,
    numReviews: 19,
  },
  {
    name: 'I Love You Candies',
    image:
      'https://res.cloudinary.com/sweetandsour/image/upload/w_600/v1603096366/heartcandies_htjnxo.jpg',
    description: 'Surprise your valentine with these treats (price per pound)',
    brand: 'Willy Wonka',
    category: 'Candy',
    price: 1.15,
    countInStock: 25,
    rating: 4.5,
    numReviews: 7,
  },
];

export default products;
