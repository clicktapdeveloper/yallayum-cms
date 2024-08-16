import { TbCategory } from "react-icons/tb";
import { SlNotebook } from "react-icons/sl";
import { TbShoppingBagDiscount } from "react-icons/tb";
import { CiMedicalClipboard } from "react-icons/ci";
import { RiFolderAddLine } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { BiPackage } from "react-icons/bi";
import { LuPackagePlus } from "react-icons/lu";
import { LiaBlogSolid } from "react-icons/lia";
import { VscFeedback } from "react-icons/vsc";
import { GoReport } from "react-icons/go";
import { SlEnvolopeLetter } from "react-icons/sl";
import { CgWebsite } from "react-icons/cg";

const tabsdata = [
  
  {
    id: 4,
    no: 4,
    icon: <CgWebsite className="text-themeBtn-0  rounded-none text-2xl" />,
    name: "Things To Know",
    link: "/",

    subCategories: [
      {
        icon: <LiaBlogSolid className="" />,
        name: "Blogs",
        link: "/dashboard/management/blogs",
      },
      {
        icon: <LiaBlogSolid className="" />,
        name: "Recipes",
        link: "/dashboard/management/recipes",
      },
    ],
  },
  // {
  //   id: 5,
  //   no: 5,
  //   icon: <CgWebsite className="text-themeBtn-0  rounded-none text-2xl" />,
  //   name: "Newsletter",
  //   link: "/",

  //   subCategories: [
  //     {
  //       icon: <LiaBlogSolid className="" />,
  //       name: "newsletter",
  //       link: "/dashboard/newsletter",
  //     },
       
  //   ],
  // },
   
];
export { tabsdata };
