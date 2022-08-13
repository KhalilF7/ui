import React from 'react';
import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock } from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { BiColorFill } from 'react-icons/bi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';
import { MdOutlineBuild, MdOutlineHome, MdOutlineManageAccounts, MdOutlineMiscellaneousServices, MdOutlineSettings, MdOutlineSupervisorAccount } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { TiTick } from 'react-icons/ti';
import { GiLouvrePyramid } from 'react-icons/gi';
import { GrLocation } from 'react-icons/gr';

import image from '../Assets/machine.jpg'

export const gridOrderImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      //src={props.ProductImage}
      src={image}
      alt="order-item"
    />
  </div>
);

const getColor = (etat) => {
  switch (etat) {
    case "fonction":
      return "#5CDB95";

    case "degradee":
      return "#E7A302";

    default:
      return "#FC4445";
  }
};

export const gridOrderStatus = (props) => (
  <button
    type="button"
    style={{ background: getColor(props.currentState), width: 100, height: 30 }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.currentState}
  </button>
  
);

export const links = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'accueil',
          icon: <MdOutlineHome />,
        },
      ],
    },
  
    {
      title: 'Pages',
      links: [
        {
          name: 'machines',
          icon: <MdOutlineSettings />,
        },
        {
          name: 'techniciens',
          icon: <IoMdContacts />,
        },
        {
          name: 'interventions',
          icon: <MdOutlineMiscellaneousServices />,
        },
        {
          name: 'sous-traitants',
          icon: <MdOutlineManageAccounts />,
        },
      ],
    },
    {
      title: 'Apps',
      links: [
        {
          name: 'atelier',
          icon: <MdOutlineBuild />,
        },
      ],
    },
    {
      title: 'Charts',
      links: [
        {
          name: 'statistiques',
          icon: <AiOutlineStock />,
        },
      ],
    },
  ];

  export const earningData = [
    {
      icon: <MdOutlineSupervisorAccount />,
      amount: '39,354',
      percentage: '-4%',
      title: 'Interventions',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <BsBoxSeam />,
      amount: '4,396',
      percentage: '+23%',
      title: 'Products',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
    },
    {
      icon: <FiBarChart />,
      amount: '423,39',
      percentage: '+38%',
      title: 'Sales',
      iconColor: 'rgb(228, 106, 118)',
      iconBg: 'rgb(255, 244, 229)',
  
      pcColor: 'green-600',
    },
    {
      icon: <HiOutlineRefresh />,
      amount: '39,354',
      percentage: '-12%',
      title: 'Refunds',
      iconColor: 'rgb(0, 194, 146)',
      iconBg: 'rgb(235, 250, 242)',
      pcColor: 'red-600',
    },
  ];

  export const ordersGrid = [
    {
      headerText: 'Image',
      template: gridOrderImage,
      textAlign: 'Center',
      width: '120',
    },
    {
      field: 'code',
      headerText: 'Code',
      width: '150',
      editType: 'dropdownedit',
      textAlign: 'Center',
    },
    { field: 'brand',
      headerText: 'Marque',
      width: '150',
      textAlign: 'Center',
    },
    {
      field: 'model',
      headerText: 'Model',
      format: 'C2',
      textAlign: 'Center',
      editType: 'numericedit',
      width: '150',
    },
    {
      headerText: 'Statut',
      template: gridOrderStatus,
      field: 'currentState',
      textAlign: 'Center',
      width: '120',
    },
  ];

  export const ordersData = [
    {
      OrderID: 10248,
      CustomerName: 'Vinet',
  
      TotalAmount: 32.38,
      OrderItems: 'Machine',
      Location: 'USA',
      Status: 'pending',
      StatusBg: '#FB9678',
    },
    {
      OrderID: 345653,
      CustomerName: 'Carson Darrin',
      TotalAmount: 56.34,
      OrderItems: 'Moule',
      Location: 'Delhi',
      Status: 'complete',
      StatusBg: '#8BE78B',
    },
  ];