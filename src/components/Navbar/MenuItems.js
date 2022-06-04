const isAdmin = localStorage.getItem("isAdmin")

export const MenuItems = [
  {
    title: "Home",
    url: "/",
    className: "nav-links",
  },
  {
    title: "Products",
    url: "/products",
    className: "nav-links",
  },
  {
    title: "Contact Us",
    url: "/contact",
    className: "nav-links",
  },
  {
    title: "Search",
    url: "/search",
    className: "nav-links",
  },
  {
    title: "Log In",
    url: "/login",
    className: "nav-links",
  },
  {
    title: "Cart",
    url: "/cart",
    className: "nav-links",
  },
];

if(isAdmin) MenuItems.push({
  title: "Admin",
  url: "/allUsers",
  className: "nav-links",
})