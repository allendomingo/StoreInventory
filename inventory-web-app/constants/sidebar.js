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
  admin: ['home', 'inventory', 'transactions', 'customers', 'orders', 'repairs', 'audit-center'],
  manager: ['home', 'inventory', 'transactions', 'customers', 'orders', 'repairs', 'audit-center'],
  operator: ['home', 'inventory', 'transactions', 'customers', 'orders', 'repairs', 'audit-center'],
  user: ['home', 'inventory', 'transactions', 'suppliers', 'orders', 'repairs', 'audit-center'],
}

// Add in the object format below if you want to add a menu item to the sidebar
// The key will also be the path navigated to once the sidebar item is clicked
export const SIDEMENU_ITEMS = [
  { label: 'Home', key: 'home', icon: <HomeOutlined /> },
  { label: 'Inventory', key: 'inventory', icon: <TableOutlined /> },
  { label: 'Transactions', key: 'transactions', icon: <InteractionOutlined /> },
  { label: 'Suppliers', key: 'suppliers', icon: <UserOutlined /> },
  { label: 'Customers', key: 'customers', icon: <UserOutlined /> },
  { label: 'Order Service', key: 'orders', icon: <CheckSquareOutlined /> },
  { label: 'Repair Service', key: 'repairs', icon: <ToolOutlined /> },
  { label: 'Audit Center', key: 'audit-center', icon: <CreditCardOutlined /> }
]