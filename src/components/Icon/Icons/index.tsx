import add from "./Add";
import addItem from "./AddItem";
import addUser from "./AddUser";
import addUsers from "./AddUsers";
import arrowDown from "./ArrowDown";
import archive from "./Archive";
import arrowUp from "./ArrowUp";
import asterisk from "./Asterisk";
import back from "./Back";
import bell from "./Bell";
import boxAdd from "./BoxAdd/index";
import calculator from "./Calculator";
import calendar from "./Calendar";
import camera from "./Camera";
import caretDown from "./CaretDown";
import checkmark from "./Checkmark";
import chevronDown from "./ChevronDown";
import chevronLeft from "./ChevronLeft";
import chevronRight from "./ChevronRight";
import circle from "./Circle";
import circleCheck from "./CircleCheck";
import circlePlus from "./CirclePlus";
import circlePlusInverted from "./CirclePlusInverted";
import circleRemove from "./CircleRemove";
import clock from "./Clock";
import close from "./Close";
import collectionDots from "./CollectionDots";
import columns from "./Columns";
import controlPanel from "./ControlPanel";
import count from "./Count";
import cube from "./Cube";
import dashboard from "./Dashboard";
import edit from "./Edit";
import ellipsis from "./Ellipsis";
import error from "./Error";
import errorOutline from "./ErrorOutline";
import exclamationTriangle from "./ExclamationTriangle";
import eye from "./Eye";
import filter from "./Filter";
import flashlight from "./Flashlight";
import forward from "./Forward";
import help from "./Help";
import history from "./History";
import importExport from "./ImportExport";
import laptop from "./Laptop";
import list from "./List";
import location from "./Location";
import menu from "./Menu";
import person from "./Person";
import print from "./Print";
import report from "./Report";
import rows from "./Rows";
import sales from "./Sales";
import save from "./Save";
import scales from "./Scales";
import scanBarcode from "./ScanBarcode";
import search from "./Search";
import settings from "./Settings";
import shipping from "./Shipping";
import star from "./Star";
import store from "./Store";
import subtract from "./Subtract";
import sync from "./Sync";
import tagDollar from "./TagDollar";
import trash from "./Trash";
import triangle from "./Triangle";
import triangleDown from "./TriangleDown";
import tripleDotsVertical from "./TripleDotsVertical";
import userGroup from "./UserGroup";
import user from "./User";
import { IIconProps } from "../index";

export type TIconName =
  | "add"
  | "addItem"
  | "addUser"
  | "addUsers"
  | "archive"
  | "arrowDown"
  | "arrowLeft"
  | "arrowRight"
  | "arrowUp"
  | "asterisk"
  | "back"
  | "bell"
  | "boxAdd"
  | "calculator"
  | "calendar"
  | "camera"
  | "caretDown"
  | "checkmark"
  | "chevronDown"
  | "chevronLeft"
  | "chevronRight"
  | "circle"
  | "circleCheck"
  | "circlePlus"
  | "circlePlusInverted"
  | "circleRemove"
  | "clock"
  | "close"
  | "collectionDots"
  | "columns"
  | "controlPanel"
  | "count"
  | "cube"
  | "dashboard"
  | "edit"
  | "ellipsis"
  | "error"
  | "errorOutline"
  | "exclamationTriangle"
  | "eye"
  | "filter"
  | "flashlight"
  | "forward"
  | "help"
  | "history"
  | "importExport"
  | "laptop"
  | "list"
  | "location"
  | "menu"
  | "person"
  | "print"
  | "report"
  | "rows"
  | "sales"
  | "save"
  | "scales"
  | "scanBarcode"
  | "search"
  | "settings"
  | "shipping"
  | "star"
  | "store"
  | "subtract"
  | "sync"
  | "tagDollar"
  | "trash"
  | "triangle"
  | "triangleDown"
  | "tripleDotsVertical"
  | "userGroup"
  | "user";

type TIconMap = { [key in TIconName]: (props: IIconProps) => JSX.Element };
const icons: TIconMap = {
  add,
  addItem,
  addUser,
  addUsers,
  archive,
  arrowDown,
  arrowLeft: back,
  arrowRight: forward,
  arrowUp,
  asterisk,
  bell,
  back,
  boxAdd,
  calculator,
  calendar,
  camera,
  caretDown,
  checkmark,
  chevronDown,
  chevronLeft,
  chevronRight,
  circle,
  circleCheck,
  circlePlus,
  circlePlusInverted,
  circleRemove,
  clock,
  close,
  collectionDots,
  columns,
  controlPanel,
  count,
  cube,
  dashboard,
  edit,
  ellipsis,
  error,
  errorOutline,
  exclamationTriangle,
  eye,
  filter,
  flashlight,
  forward,
  help,
  history,
  importExport,
  laptop,
  list,
  location,
  menu,
  person,
  print,
  report,
  rows,
  sales,
  save,
  scales,
  scanBarcode,
  search,
  settings,
  shipping,
  star,
  store,
  subtract,
  sync,
  tagDollar,
  trash,
  triangle,
  triangleDown,
  tripleDotsVertical,
  userGroup,
  user,
};
export default icons;
// For generating tests
export const iconNames = Object.keys(icons) as TIconName[];
