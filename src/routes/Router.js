import { Route, Routes } from 'react-router-dom';

import React, { lazy } from 'react';
import Loadable from '../layouts/loader/Loadable';

import UserToken from '../components/UserToken';
import BlogDetails from '../views/detailTable/BlogDetails';
// import { Details } from '@material-ui/icons';

const FullLayout = Loadable(lazy(() => import('../layouts/FullLayout')));
// const BlankLayout = Loadable(lazy(() => import('../layouts/BlankLayout')));
/***** Pages ****/

// Modals
const EditCostingSummaryModal = Loadable(
  lazy(() => import('../components/tender/EditCostingSummaryModal')),
);
const AddLineItemModal = Loadable(lazy(() => import('../components/tender/AddLineItemModal')));
const EditQuoteModal = Loadable(lazy(() => import('../components/tender/EditQuoteModal')));
const EditLineItemModal = Loadable(lazy(() => import('../components/tender/EditLineItemModal')));
const InvoiceData = Loadable(lazy(() => import('../components/finance/InvoiceData')));
const CreateReceipt = Loadable(lazy(() => import('../components/finance/CreateReceipt')));
const CreateNote = Loadable(lazy(() => import('../components/finance/CreateNote')));

const InvoiceModal = Loadable(lazy(() => import('../components/finance/InvoiceModal')));
const ReceiptModal = Loadable(lazy(() => import('../components/finance/ReceiptModal')));

const PdfData = Loadable(lazy(() => import('../views/smartconTables/Tickets')));
const PdfNext = Loadable(lazy(() => import('../views/smartconTables/GeneratePdf')));

const TicketsComponent = Loadable(lazy(() => import('../views/smartconTables/TicketsComponent')));
const Classic = Loadable(lazy(() => import('../views/dashboards/Cubosale')));
const Crypto = Loadable(lazy(() => import('../views/dashboards/Crypto')));
const Ecommerce = Loadable(lazy(() => import('../views/dashboards/Ecommerce')));
const General = Loadable(lazy(() => import('../views/dashboards/General')));
const Extra = Loadable(lazy(() => import('../views/dashboards/Extra')));
const About = Loadable(lazy(() => import('../views/About')));

/***** Apps ****/
const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
const Chat = Loadable(lazy(() => import('../views/apps/chat/Chat')));
const Contacts = Loadable(lazy(() => import('../views/apps/contacts/Contacts')));
const Calendar = Loadable(lazy(() => import('../views/apps/calendar/CalendarApp')));
const Email = Loadable(lazy(() => import('../views/apps/email/Email')));
const Shop = Loadable(lazy(() => import('../views/apps/ecommerce/Shop')));
const ShopDetail = Loadable(lazy(() => import('../views/apps/ecommerce/ShopDetail')));
const Treeview = Loadable(lazy(() => import('../views/apps/treeview/TreeView')));
const TicketList = Loadable(lazy(() => import('../views/apps/ticket/TicketList')));
const TicketDetail = Loadable(lazy(() => import('../views/apps/ticket/TicketDetail')));

/***** Ui Elements ****/
const Alerts = Loadable(lazy(() => import('../views/ui/Alerts')));
const Badges = Loadable(lazy(() => import('../views/ui/Badges')));
const Buttons = Loadable(lazy(() => import('../views/ui/Buttons')));
const Cards = Loadable(lazy(() => import('../views/ui/Cards')));
const Grid = Loadable(lazy(() => import('../views/ui/Grid')));
const Tables = Loadable(lazy(() => import('../views/ui/Tables')));
const Forms = Loadable(lazy(() => import('../views/ui/Forms')));
const Breadcrumbs = Loadable(lazy(() => import('../views/ui/Breadcrumbs')));
const Dropdowns = Loadable(lazy(() => import('../views/ui/DropDown')));
const BtnGroup = Loadable(lazy(() => import('../views/ui/BtnGroup')));
const Collapse = Loadable(lazy(() => import('../views/ui/Collapse')));
const ListGroup = Loadable(lazy(() => import('../views/ui/ListGroup')));
const Modal = Loadable(lazy(() => import('../views/ui/Modal')));
const Navbar = Loadable(lazy(() => import('../views/ui/Navbar')));
const Nav = Loadable(lazy(() => import('../views/ui/Nav')));
const Pagination = Loadable(lazy(() => import('../views/ui/Pagination')));
const Popover = Loadable(lazy(() => import('../views/ui/Popover')));
const Progress = Loadable(lazy(() => import('../views/ui/Progress')));
const Spinner = Loadable(lazy(() => import('../views/ui/Spinner')));
const Tabs = Loadable(lazy(() => import('../views/ui/Tabs')));
const Toasts = Loadable(lazy(() => import('../views/ui/Toasts')));
const Tooltip = Loadable(lazy(() => import('../views/ui/Tooltip')));

/***** Form Layout Pages ****/
const FormBasic = Loadable(lazy(() => import('../views/form-layouts/FormBasic')));
const FormGrid = Loadable(lazy(() => import('../views/form-layouts/FormGrid')));
const FormGroup = Loadable(lazy(() => import('../views/form-layouts/FormGroup')));
const FormInput = Loadable(lazy(() => import('../views/form-layouts/FormInput')));

/***** Form Pickers Pages ****/
const Datepicker = Loadable(lazy(() => import('../views/form-pickers/DateTimePicker')));
const TagSelect = Loadable(lazy(() => import('../views/form-pickers/TagSelect')));

/***** Form Validation Pages ****/
const FormValidate = Loadable(lazy(() => import('../views/form-validation/FormValidation')));
const FormSteps = Loadable(lazy(() => import('../views/form-steps/Steps')));
const FormEditor = Loadable(lazy(() => import('../views/form-editor/FormEditor')));
/***** Table Pages ****/
const Basictable = Loadable(lazy(() => import('../views/tables/TableBasic')));
const CustomReactTable = Loadable(lazy(() => import('../views/tables/CustomReactTable')));
const ReactBootstrapTable = Loadable(lazy(() => import('../views/tables/ReactBootstrapTable')));

/***** Chart Pages ****/
const ApexCharts = Loadable(lazy(() => import('../views/charts/ApexCharts')));
const ChartJs = Loadable(lazy(() => import('../views/charts/ChartJs')));

/***** Sample Pages ****/
const StarterKit = Loadable(lazy(() => import('../views/sample-pages/StarterKit')));
const Profile = Loadable(lazy(() => import('../views/sample-pages/Profile')));
const Gallery = Loadable(lazy(() => import('../views/sample-pages/Gallery')));
const SearchResult = Loadable(lazy(() => import('../views/sample-pages/SearchResult')));
const HelperClass = Loadable(lazy(() => import('../views/sample-pages/HelperClass')));

/***** Icon Pages ****/
const Bootstrap = Loadable(lazy(() => import('../views/icons/Bootstrap')));
const Feather = Loadable(lazy(() => import('../views/icons/Feather')));

/***** Map Pages ****/
const CustomVectorMap = Loadable(lazy(() => import('../views/maps/CustomVectorMap')));

/***** Widget Pages ****/
const Widget = Loadable(lazy(() => import('../views/widget/Widget')));

/***** CASL Access Control ****/
const CASL = Loadable(lazy(() => import('../views/apps/accessControlCASL/AccessControl')));

/***** Auth Pages ****/
const Error = Loadable(lazy(() => import('../views/auth/Error')));
// const RegisterFormik = Loadable(lazy(() => import('../views/auth/RegisterFormik')));
const LoginFormik = Loadable(lazy(() => import('../views/auth/LoginFormik')));
// const Maintanance = Loadable(lazy(() => import('../views/auth/Maintanance')));
// const LockScreen = Loadable(lazy(() => import('../views/auth/LockScreen')));
// const RecoverPassword = Loadable(lazy(() => import('../views/auth/RecoverPassword')));

const DataTable = Loadable(lazy(() => import('../views/cubosale/Projects')));
const Reports = Loadable(lazy(() => import('../views/cubosale/Reports')));

// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token;
// }

const AddProjects = Loadable(lazy(() => import('../views/cubosale/AddProjects')));
const EditProject = Loadable(lazy(() => import('../views/cubosale/EditProject')));

// Tender
const TenderTable = Loadable(lazy(() => import('../views/smartconTables/Tender')));
const TaskTable = Loadable(lazy(() => import('../views/smartconTables/Task')));
const ProjectTable = Loadable(lazy(() => import('../views/smartconTables/Project')));
const ClientTable = Loadable(lazy(() => import('../views/smartconTables/Client')));
const ProductTable = Loadable(lazy(() => import('../views/smartconTables/product')));
const TestTable = Loadable(lazy(() => import('../views/smartconTables/Test')));
const PurchaseOrderTable = Loadable(lazy(() => import('../views/smartconTables/PurchaseOrder')));
const StatementofAccountsReport = Loadable(lazy(() => import('../views/Reports/StatementofAccountsReport')));
const Blog = Loadable(lazy(() => import('../views/smartconTables/Blogs')));





// Details Table
const TenderDetailsTable = Loadable(lazy(() => import('../views/detailTable/TenderDetails')));
const ProductDetailsTable = Loadable(lazy(() => import('../views/detailTable/ProductDetails')));
const ClientDetailsTable = Loadable(lazy(() => import('../views/detailTable/ClientDetails')));
const TimesheetDetailsTable = Loadable(lazy(() => import('../views/detailTable/TimesheetDetails')));
// Finance Admin
const InventoryTable = Loadable(lazy(() => import('../views/smartconTables/Inventory')));

// PayrollHR
const TrainingTable = Loadable(lazy(() => import('../views/smartconTables/Training')));
const TrainingDetailsTable = Loadable(lazy(() => import('../views/detailTable/TrainingDetails')));
const EnquiryTable = Loadable(lazy(() => import('../views/smartconTables/Enquiry')));
const EnquiryDetailsTable = Loadable(
  lazy(() => import('../views/detailTable/EnquiryDetails')),
);
const PayrollManagementTable = Loadable(
  lazy(() => import('../views/smartconTables/PayrollManagement')),
);
const Employee = Loadable(lazy(() => import('../views/smartconTables/Employee')));
const EmployeeDetailsTable = Loadable(lazy(() => import('../views/detailTable/EmployeeDetails')));
const EmployeeDetailsData = Loadable(
  lazy(() => import('../views/detailTable/EmployeeDetailsData')),
);
const PayrollManagementDetails = Loadable(
  lazy(() => import('../views/detailTable/PayrollManagementDetails')),
);
const CPFCalculatorTable = Loadable(lazy(() => import('../views/smartconTables/CPFCalculator')));
const CPFCalculatorDetails = Loadable(
  lazy(() => import('../views/detailTable/CPFCalculatorDetails')),
);

// Admin
const StaffTable = Loadable(lazy(() => import('../views/smartconTables/Staff')));
const StaffDetailsTable = Loadable(lazy(() => import('../views/detailTable/StaffDetails')));
const Content = Loadable(lazy(() => import('../views/smartconTables/Content')));
const ContentDetailsTable = Loadable(lazy(() => import('../views/detailTable/ContentDetails')));
const SubCategoryTable = Loadable(lazy(() => import('../views/smartconTables/SubCategory')));
const SubCategoryDetailsTable = Loadable(
  lazy(() => import('../views/detailTable/SubCategoryDetails')),
);
const ValuelistTable = Loadable(lazy(() => import('../views/smartconTables/Valuelist')));
const ValuelistDetailsTable = Loadable(lazy(() => import('../views/detailTable/ValuelistDetails')));
const SettingTable = Loadable(lazy(() => import('../views/smartconTables/Setting')));
const Section = Loadable(lazy(() => import('../views/smartconTables/Section')));
const SectionDetails = Loadable(lazy(() => import('../views/detailTable/SectionDetails')));
const SettingDetails = Loadable(lazy(() => import('../views/detailTable/SettingDetails')));
const CategoryTable = Loadable(lazy(() => import('../views/smartconTables/Category')));
const CategoryDetails = Loadable(lazy(() => import('../views/detailTable/CategoryDetails')));
const UserGroupTable = Loadable(lazy(() => import('../views/smartconTables/UserGroup')));
const UserGroupDetails = Loadable(lazy(() => import('../views/detailTable/UserGroupDetails')));

//SupplierModal
const PurchaseOrderDetails = Loadable(
  lazy(() => import('../views/detailTable/PurchaseOrderDetails')),
);

// Table Edit's
const TenderEdit = Loadable(lazy(() => import('../views/EditData/TenderEdit')));
const ProductEdit = Loadable(lazy(() => import('../views/EditData/ProductEdit')));
const TrainingEdit = Loadable(lazy(() => import('../views/EditData/TrainingEdit')));
const ProjectEdit = Loadable(lazy(() => import('../views/EditData/ProjectEdit')));
const ClientEdit = Loadable(lazy(() => import('../views/EditData/ClientEdit')));
const ContentEdit = Loadable(lazy(() => import('../views/EditData/ContentEdit')));
const SectionEdit = Loadable(lazy(() => import('../views/EditData/SectionEdit')));
const EnquiryEdit = Loadable(lazy(() => import('../views/EditData/EnquiryEdit')));
const StaffEdit = Loadable(lazy(() => import('../views/EditData/StaffEdit')));
const Login = Loadable(lazy(() => import('../views/detailTable/Login')));
const ValueListEdit = Loadable(lazy(() => import('../views/EditData/ValueListEdit')));
const SubCategoryEdit = Loadable(lazy(() => import('../views/EditData/SubCategoryEdit')));
const CategoryEdit = Loadable(lazy(() => import('../views/EditData/CategoryEdit')));
const SettingEdit = Loadable(lazy(() => import('../views/EditData/SettingEdit')));
const InventoryEdit = Loadable(lazy(() => import('../views/EditData/InventoryEdit')));
const UserGroupEdit = Loadable(lazy(() => import('../views/EditData/UserGroupEdit')));
const PurchaseOrderEdit = Loadable(lazy(() => import('../views/EditData/PurchaseOrderEdit')));
const BlogEdit = Loadable(lazy(() => import('../views/EditData/BlogEdit')));




//Reports
const ProjectReportTable = Loadable(lazy(() => import('../views/Reports/ProjectReport')));
const OverallSalesReportTable = Loadable(lazy(() => import('../views/Reports/OverAllSalesSummaryReport')));
const InvoiceByYearTable = Loadable(lazy(() => import('../views/Reports/InvoiceByYear')));
// const TaskEdit= Loadable(lazy(() => import ('..')))


//Reports

const Routernew = () => {
  const { token, setToken } = UserToken();

  if (!token) {
    return <LoginFormik setToken={setToken} />;
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<FullLayout></FullLayout>}>
          {/* Tendar Modal */}
          <Route
            path="/editcostingsummary"
            name="editcostingsummary"
            element={<EditCostingSummaryModal />}
          ></Route>
          <Route path="/addlineitem" name="addlineitem" element={<AddLineItemModal />}></Route>
          <Route path="/editquote" name="editquote" element={<EditQuoteModal />}></Route>
          <Route path="/editlineitem" name="editlineitem" element={<EditLineItemModal />}></Route>
          <Route path="/invoicedata" name="invoicedata" element={<InvoiceData />}></Route>
          <Route path="/createreceipt" name="createreceipt" element={<CreateReceipt />}></Route>
          <Route path="/createnote" name="createnote" element={<CreateNote/>}></Route>
          <Route path="/invoiceModal/:id" name="invoiceModal" element={<InvoiceModal/>}></Route>
          <Route path="/receiptModal/:id" name="invoiceModal" element={<ReceiptModal/>}></Route>
      {/* Table Edit's */}
          <Route path="/TenderEdit/:id" name="clienttdata" element={<TenderEdit />}></Route>
          {/* <Route path="/ContentEdit/:title" name="clienttdata" element={<ContentEdit />}></Route> */}
          <Route path="/ProductEdit/:id" name="clienttdata" element={<ProductEdit />}></Route>
          {/* <Route path="/TaskEdit/:id" name="clienttdata" element={<TaskEdit />}></Route> */}
          <Route path="/TrainingEdit/:id" name="clienttdata" element={<TrainingEdit />}></Route>
          <Route path="/ContentEdit/:id" name="clienttdata" element={<ContentEdit />}></Route>
          <Route path="/projectEdit/:id" name="clienttdata" element={<ProjectEdit />}></Route>
          <Route path="/clientEdit/:id" name="clienttdata" element={<ClientEdit />}></Route>
          <Route path="/sectionEdit/:id" name="clienttdata" element={<SectionEdit />}></Route>

          
          <Route
            path="/EnquiryEdit/:id"
            name="clienttdata"
            element={<EnquiryEdit />}
          ></Route>
          <Route path="/StaffEdit/:id" name="clienttdata" element={<StaffEdit />}></Route>
          <Route path="/Login/:id" name="clienttdata" element={<Login />}></Route>
          <Route path="/ValueListEdit/:id" name="clienttdata" element={<ValueListEdit />}></Route>
          <Route
            path="/SubCategoryEdit/:id"
            name="clienttdata"
            element={<SubCategoryEdit />}
          ></Route>
          <Route path="/CategoryEdit/:id" name="clienttdata" element={<CategoryEdit />}></Route>
          <Route path="/SettingEdit/:id" name="clienttdata" element={<SettingEdit />}></Route>
          <Route path="/Inventory" name="clienttdata" element={<InventoryTable />}></Route>
          <Route path="/inventoryEdit/:id" name="clienttdata" element={<InventoryEdit />}></Route>
          <Route path="/UserGroupEdit/:id" name="clienttdata" element={<UserGroupEdit />}></Route>
          <Route
            path="/PurchaseOrderEdit/:id"
            name="clienttdata"
            element={<PurchaseOrderEdit />}
          ></Route>
           <Route
            path="/BlogEdit/:id"
            name="clienttdata"
            element={<BlogEdit />}
          ></Route>
          {/* Supplier Modal */}
          <Route
            path="/EnquiryEdit/:id"
            name="clienttdata"
            element={<EnquiryEdit />}
          ></Route>

          <Route path="/pdf/:id" name="pdfData" element={<PdfData />}></Route>
          <Route path="/pdfnext" name="pdfData" element={<PdfNext />}></Route>
          <Route path="/TicketsComponent" name="pdfData" element={<TicketsComponent />}></Route>
          <Route path="/projects" element={<DataTable />} />
          <Route path="/" element={<Classic />} />
          <Route path="/dashboards/crypto" name="Classic" element={<Crypto />}></Route>
          <Route path="/dashboards/ecommerce" name="ecommerce" element={<Ecommerce />}></Route>
          <Route path="/dashboards/general" name="general" element={<General />}></Route>
          <Route path="/dashboards/extra" name="extra" element={<Extra />}></Route>
          <Route path="/about" name="about" element={<About />}></Route>
          <Route path="/apps/notes" name="notes" element={<Notes />}></Route>
          <Route path="/apps/chat" name="chat" element={<Chat />}></Route>
          <Route path="/apps/contacts" name="contacts" element={<Contacts />}></Route>
          <Route path="/apps/calendar" name="calendar" element={<Calendar />}></Route>
          <Route path="/apps/email" name="email" element={<Email />}></Route>
          <Route path="/ecom/shop" name="email" element={<Shop />}></Route>
          <Route path="/ecom/shopdetail" name="email" element={<ShopDetail />}></Route>
          <Route path="/tickt/ticket-list" name="ticket list" element={<TicketList />}></Route>
          <Route
            path="/tickt/ticket-detail"
            name="ticket detail"
            element={<TicketDetail />}
          ></Route>
          <Route path="/apps/treeview" name="email" element={<Treeview />}></Route>
          <Route path="/ui/alerts" name="alerts" element={<Alerts />}></Route>
          <Route path="/ui/badges" name="badges" element={<Badges />}></Route>
          <Route path="/ui/buttons" name="buttons" element={<Buttons />}></Route>
          <Route path="/ui/cards" name="cards" element={<Cards />}></Route>
          <Route path="/ui/grid" name="grid" element={<Grid />}></Route>
          <Route path="/ui/table" name="table" element={<Tables />}></Route>
          <Route path="/ui/forms" name="forms" element={<Forms />}></Route>
          <Route path="/ui/breadcrumbs" name="breadcrumbs" element={<Breadcrumbs />}></Route>
          <Route path="/ui/dropdown" name="dropdown" element={<Dropdowns />}></Route>
          <Route path="/ui/button-group" name="button group" element={<BtnGroup />}></Route>
          <Route path="/ui/collapse" name="collapse" element={<Collapse />}></Route>
          <Route path="/ui/list-group" name="list-group" element={<ListGroup />}></Route>
          <Route path="/ui/modal" name="modal" element={<Modal />}></Route>
          <Route path="/ui/navbar" name="navbar" element={<Navbar />}></Route>
          <Route path="/ui/nav" name="nav" element={<Nav />}></Route>
          <Route path="/ui/pagination" name="pagination" element={<Pagination />}></Route>
          <Route path="/ui/popover" name="popover" element={<Popover />}></Route>
          <Route path="/ui/progress" name="progress" element={<Progress />}></Route>
          <Route path="/ui/spinner" name="spinner" element={<Spinner />}></Route>
          <Route path="/ui/tabs" name="tabs" element={<Tabs />}></Route>
          <Route path="/ui/toasts" name="toasts" element={<Toasts />}></Route>
          <Route path="/ui/tooltip" name="tooltip" element={<Tooltip />}></Route>
          <Route path="/form-layout/form-basic" name="form-basic" element={<FormBasic />}></Route>
          <Route path="/form-layout/form-grid" name="form-grid" element={<FormGrid />}></Route>
          <Route path="/form-layout/form-group" name="form-group" element={<FormGroup />}></Route>
          <Route path="/form-layout/form-input" name="form-input" element={<FormInput />}></Route>
          <Route path="/form-pickers/datepicker" name="datepicker" element={<Datepicker />} />
          <Route path="/form-pickers/tag-select" name="tag-select" element={<TagSelect />}></Route>
          <Route path="/form-validation" name="form-validation" element={<FormValidate />}></Route>
          <Route path="/form-steps" name="form-steps" element={<FormSteps />}></Route>
          <Route path="/form-editor" name="form-editor" element={<FormEditor />}></Route>

          <Route path="/tables/basic-table" name="basic-table" element={<Basictable />}></Route>
          <Route path="/tables/react-table" name="react-table" element={<CustomReactTable />} />
          <Route path="/tables/data-table" name="data-table" element={<ReactBootstrapTable />} />
          <Route path="/charts/apex" name="apex" element={<ApexCharts />}></Route>
          <Route path="/charts/chartjs" name="chartjs" element={<ChartJs />}></Route>
          <Route path="/sample-pages/profile" name="profile" element={<Profile />}></Route>
          <Route path="/sample-pages/helper-class" name="helper-class" element={<HelperClass />} />
          <Route path="/sample-pages/starterkit" name="starterkit" element={<StarterKit />} />
          <Route path="/sample-pages/gallery" name="gallery" element={<Gallery />}></Route>
          <Route
            path="/sample-pages/search-result"
            name="search-result"
            element={<SearchResult />}
          />
          <Route path="/icons/bootstrap" name="bootstrap" element={<Bootstrap />}></Route>
          <Route path="/icons/feather" name="feather" element={<Feather />}></Route>
          <Route path="/map/vector" name="vector" element={<CustomVectorMap />}></Route>
          <Route path="/widget" name="widget" element={<Widget />}></Route>
          <Route path="/casl" name="casl" element={<CASL />}></Route>
          <Route path="/auth/404" name="404" element={<Error />}></Route>
          <Route path="/projects/addproject" name="addproject" element={<AddProjects />}></Route>
          <Route
            path="/projects/editproject/:id"
            name="editproject"
            element={<EditProject />}
          ></Route>
          <Route path="/projects/projectreport" name="projectreport" element={<Reports />}></Route>
          <Route path="/OverAllSalesSummaryReport" name="clienttdata" element={<OverallSalesReportTable />}></Route>
          <Route path="/InvoiceByYear" name="clienttdata" element={<InvoiceByYearTable />}></Route>
          {/* Tender */}
          <Route path="/Tender" name="tenderdata" element={<TenderTable />}></Route>
          <Route path="/Task" name="tenderdata" element={<TaskTable />}></Route>
          <Route path="/TenderDetails" name="tenderdata" element={<TenderDetailsTable />}></Route>
          <Route path="/ProductDetails" name="tenderdata" element={<ProductDetailsTable />}></Route>
          <Route path="/BlogDetails" name="tenderdata" element={<BlogDetails />}></Route>


          <Route path="/Project" name="projectdata" element={<ProjectTable />}></Route>
          <Route path="/Client" name="clienttdata" element={<ClientTable />}></Route>
          <Route path="/ClientDetails" name="clienttdata" element={<ClientDetailsTable />}></Route>
          <Route path="/Product" name="clienttdata" element={<ProductTable />}></Route>
          <Route
            path="/TimesheetDetails"
            name="clienttdata"
            element={<TimesheetDetailsTable />}
          ></Route>

         
          <Route path="/Inventory" name="clienttdata" element={<InventoryTable />}></Route>
          <Route
            path="/TrainingDetails"
            name="clienttdata"
            element={<TrainingDetailsTable />}
          ></Route>
          <Route path="/Training" name="clienttdata" element={<TrainingTable />}></Route>
          <Route
            path="/Enquiry"
            name="clienttdata"
            element={<EnquiryTable />}
          ></Route>
          <Route
            path="/EnquiryDetails"
            name="clienttdata"
            element={<EnquiryDetailsTable />}
          ></Route>

          <Route path="/CPFCalculator" name="clienttdata" element={<CPFCalculatorTable />}></Route>
          <Route
            path="/CPFCalculatorDetails"
            name="clienttdata"
            element={<CPFCalculatorDetails />}
          ></Route>
          <Route path="/Staff" name="clienttdata" element={<StaffTable />}></Route>
          <Route path="/StaffDetails" name="clienttdata" element={<StaffDetailsTable />}></Route>
          <Route path="/SubCategory" name="clienttdata" element={<SubCategoryTable />}></Route>
          <Route path="/ProjectReport" name="clienttdata" element={<ProjectReportTable />}></Route>
          <Route
            path="/SubCategoryDetails"
            name="clienttdata"
            element={<SubCategoryDetailsTable />}
          ></Route>

          <Route path="/Valuelist" name="clienttdata" element={<ValuelistTable />}></Route>
          <Route
            path="/ValuelistDetails"
            name="clienttdata"
            element={<ValuelistDetailsTable />}
          ></Route>
          <Route path="/Section" name="clienttdata" element={<Section />}></Route>
          <Route path="/SectionDetails" name="clienttdata" element={<SectionDetails />}></Route>
          <Route path="/Setting" name="clienttdata" element={<SettingTable />}></Route>
          <Route path="/SettingDetails" name="clienttdata" element={<SettingDetails />}></Route>
          <Route path="/Category" name="tenderdata" element={<CategoryTable />}></Route>
          <Route path="/CategoryDetails" name="tenderdata" element={<CategoryDetails />}></Route>
          <Route path="/UserGroup" name="clienttdata" element={<UserGroupTable />}></Route>
          <Route path="/UserGroupDetails" name="clienttdata" element={<UserGroupDetails />}></Route>
          <Route path="/Employee" name="clienttdata" element={<Employee />}></Route>
          <Route
            path="/EmployeeDetails"
            name="clienttdata"
            element={<EmployeeDetailsTable />}
          ></Route>
          <Route
            path="/EmployeeDetailsData/:id"
            name="clienttdata"
            element={<EmployeeDetailsData />}
          ></Route>
          <Route
            path="/PayrollManagement"
            name="clienttdata"
            element={<PayrollManagementTable />}
          ></Route>
          <Route
            path="/PayrollManagementDetails/:id"
            name="clienttdata"
            element={<PayrollManagementDetails />}
          ></Route>
          <Route path="/Content" name="clienttdata" element={<Content />}></Route>
          <Route
            path="/ContentDetails"
            name="clienttdata"
            element={<ContentDetailsTable />}
          ></Route>
          <Route path="/test" name="clienttdata" element={<TestTable />}></Route>
          <Route path="/PurchaseOrder" name="clienttdata" element={<PurchaseOrderTable />}></Route>
          <Route path="/StatementofAccountsReport" name="clienttdata" element={<StatementofAccountsReport />}></Route>
          <Route path="/blog" name="clienttdata" element={<Blog/>}></Route>

          <Route
            path="/PurchaseOrderDetails"
            name="clienttdata"
            element={<PurchaseOrderDetails />}
          ></Route>
        </Route>

        
      </Routes>
    </div>
  );
};

export default Routernew;
