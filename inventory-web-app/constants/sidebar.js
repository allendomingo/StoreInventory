import {
  HomeOutlined,
  TableOutlined,
  InteractionOutlined,
  UserOutlined,
  CheckSquareOutlined,
  ToolOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';

// Maps what items each role can see
export const ROLES_TO_VISIBLE_SIDEMENU_ITEMS_MAP = {
  admin: ['home', 'inventory', 'transactions', 'suppliers-customers', 'order-service', 'repair-service', 'audit-center'],
  manager: ['home', 'inventory', 'transactions', 'suppliers-customers', 'order-service', 'repair-service', 'audit-center'],
  operator: ['home', 'inventory', 'transactions', 'suppliers-customers', 'order-service', 'repair-service', 'audit-center'],
  user: ['home', 'inventory', 'transactions', 'suppliers-customers', 'order-service', 'repair-service', 'audit-center'],
}

// Add in the object format below if you want to add a menu item to the sidebar
export const SIDEMENU_ITEMS = [
  { label: 'Home', key: 'home', icon: <HomeOutlined /> },
  { label: 'Inventory', key: 'inventory', icon: <TableOutlined /> },
  { label: 'Transactions', key: 'transactions', icon: <InteractionOutlined /> },
  { label: 'Suppliers/Customers', key: 'suppliers-customers', icon: <UserOutlined /> },
  { label: 'Order Service', key: 'order-service', icon: <CheckSquareOutlined /> },
  { label: 'Repair Service', key: 'repair-service', icon: <ToolOutlined /> },
  { label: 'Audit Center', key: 'audit-center', icon: <CreditCardOutlined /> }
]