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

import image from '../Assets/machine.jpg';
import avatar from './avatar.jpg';

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

const getColorIntervention = (etat) => {
  switch (etat) {
    case "ouvert":
      return "#FC4445";
    case "encours":
      return "#E7A302";
    case "achieve":
      return "#5431F0";
    default:
      return "#5CDB95";
  }
};

const sousTraitantGridImage = (props) => (
  <div className="image flex gap-4">
    <img
      className="rounded-full w-10 h-10"
      src={avatar}
      alt="employee"
    />
  </div>
);

export const gridOrderStatus = (props) => (
  <button
    type="button"
    style={{ background: getColor(props.currentState), width: 100, height: 30 }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
    disabled
  >
    {props.currentState}
  </button>
);

export const gridInterventionMachine = (props) => (
  <button
    type="button"
    style={{ background: 'gray', width: 100, height: 30 }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
    disabled
  >
    {props.machine}
  </button>
  
  
);

export const gridInterventionStatus = (props) => (
  <button
    type="button"
    style={{ background: getColorIntervention(props.etatInterventions), width: 100, height: 30 }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
    disabled
  >
    {props.etatInterventions}
  </button>
  
  
);

const gridEmployeeProfile = (props) => (
  <div className="flex items-center gap-2">
    <img
      className="rounded-full w-10 h-10"
      src={avatar}
      alt="employee"
    />
    <p>{props.nom}</p>
  </div>
);

export const linksRes = [
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

export const linksPdg = [    
    {
      title: 'Pages',
      links: [
        {
          name: 'branches',
          icon: <MdOutlineSettings />,
        },
        {
          name: 'responsables',
          icon: <IoMdContacts />,
        }
      ]
    }
];

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
          name: 'interventions',
          icon: <MdOutlineMiscellaneousServices />,
        },
        {
          name: 'préventif',
          icon: <MdOutlineManageAccounts />,
        },
      ],
    }
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

  export const interventionsGrid = [
    {
      field: 'codeCuratif',
      headerText: 'Code',
      width: '150',
      editType: 'dropdownedit',
      textAlign: 'Center',
    },
    { headerText: 'Machine',
      //template: gridInterventionMachine,
      field: 'machine',
      width: '150',
      textAlign: 'Center',
    },
    {
      headerText: 'Statut',
      template: gridInterventionStatus,
      field: 'etatInterventions',
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

  export const techniciensGrid = [
    { headerText: 'Technicien',
      width: '80',
      template: gridEmployeeProfile,
      textAlign: 'Center' },
    { field: 'matricule',
      headerText: 'Matricule',
      width: '170',
      textAlign: 'Center',
    },
  
    { field: 'nom',
      headerText: 'Nom',
      width: '135',
      format: 'yMd',
      textAlign: 'Center' },
  
    { field: 'prenom',
      headerText: 'Prénom',
      width: '120',
      textAlign: 'Center' },
    { field: 'telephone',
      headerText: 'Téléphone',
      width: '125',
      textAlign: 'Center' },
  ];

  export const sousTraitantsGrid = [
    { type: 'checkbox', width: '50' },
    { headerText: 'Image',
      width: '80',
      template: sousTraitantGridImage,
      align: 'Center' },
    { field: 'sousTraitence',
      headerText: 'Sous Traitant',
      width: '150',
      textAlign: 'Center' },
    { field: 'nomRep',
      headerText: 'Nom de Responsable/Représentant',
      width: '220',
      format: 'yMd',
      textAlign: 'Center'},
    {
      field: 'adress',
      headerText: 'Adresse',
      width: '200',
      format: 'C2',
      textAlign: 'Center' },
    { field: 'telephone',
      headerText: 'Téléphone',
      width: '100',
      textAlign: 'Center' },
  
    { field: 'fax',
      headerText: 'Fax',
      width: '100',
      textAlign: 'Center',
    },
  
  ];

  export const themeColors = [
    {
      name: 'blue-theme',
      color: '#1A97F5',
    },
    {
      name: 'green-theme',
      color: '#03C9D7',
    },
    {
      name: 'purple-theme',
      color: '#7352FF',
    },
    {
      name: 'red-theme',
      color: '#FF5C8E',
    },
    {
      name: 'indigo-theme',
      color: '#1E4DB7',
    },
    {
      color: '#FB9678',
      name: 'orange-theme',
    },
  ];

  export const userProfileData = [
    {
      icon: <BsCurrencyDollar />,
      title: 'My Profile',
      desc: 'Account Settings',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
    },
    {
      icon: <BsShield />,
      title: 'My Inbox',
      desc: 'Messages & Emails',
      iconColor: 'rgb(0, 194, 146)',
      iconBg: 'rgb(235, 250, 242)',
    },
    {
      icon: <FiCreditCard />,
      title: 'My Tasks',
      desc: 'To-do and Daily Tasks',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
    },
  ];