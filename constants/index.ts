

export const MAX_IMAGE_SIZE_MB = 10 * 1024 * 1024;
export const MAX_VIDEO_SIZE_MB = 50 * 1024 * 1024;

export const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
export const TREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
export const THIRTY_DAYS_IN_MS = 10 * TREE_DAYS_IN_MS;

export const adminSideBarLinks = [
  {
    img: "/icons/admin/home.svg",
    route: "/admin",
    text: "Home",
  },
  {
    img: "/icons/admin/users.svg",
    route: "/admin/users",
    text: "All Users",
  },
  {
    img: "/icons/admin/book.svg",
    route: "/admin/books",
    text: "All Books",
  },
  {
    img: "/icons/admin/bookmark.svg",
    route: "/admin/borrow-records",
    text: "Borrow Records",
  },
  {
    img: "/icons/admin/user.svg",
    route: "/admin/account-requests",
    text: "Account Requests",
  },
];

export const FIELD_NAMES = {
  fullName: "Full name",
  email: "Email",
  universityId: "University ID Number",
  password: "Password",
  universityCard: "Upload University ID Card",
};

export const FIELD_TYPES = {
  fullName: "text",
  email: "email",
  universityId: "number",
  password: "password",
};
