import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBell,
  faCheck,
  faCode,
  faCog,
  faExternalLinkAlt,
  faFileAlt,
  faFolder,
  faHome,
  faPlay,
  faSave,
  faShareAlt,
  faSignOutAlt,
  faTimes,
  faUser,
  faWindowMaximize,
} from '@fortawesome/free-solid-svg-icons';

export default () => {
  library.add(faFileAlt);
  library.add(faPlay);
  library.add(faUser);
  library.add(faBell);
  library.add(faCog);
  library.add(faSignOutAlt);
  library.add(faHome);
  library.add(faWindowMaximize);
  library.add(faCode);
  library.add(faShareAlt);
  library.add(faFolder);
  library.add(faSave);
  library.add(faCheck);
  library.add(faTimes);
  library.add(faExternalLinkAlt);
};
