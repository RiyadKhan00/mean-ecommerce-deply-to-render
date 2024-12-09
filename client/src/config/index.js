export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },

  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },

  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },

  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },

  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },

  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },

  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const brandOptionMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  zara: "Zara",
  levis: "Levis",
  "n&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "men", lable: "Men" },
    { id: "women", lable: "Women" },
    { id: "kids", lable: "Kids" },
    { id: "accessories", lable: "Accessories" },
    { id: "footwear", lable: "Footwear" },
  ],

  brand: [
    { id: "nike", lable: "Nike" },
    { id: "adidas", lable: "Adidas" },
    { id: "puma", lable: "Puma" },
    { id: "levis", lable: "Levi's" },
    { id: "zara", lable: "Zara" },
    { id: "h&m", lable: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
