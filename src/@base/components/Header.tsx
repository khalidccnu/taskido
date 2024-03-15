import { imagePaths, paths } from '@lib/constant';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="wrapper">
          <div className="logo_container">
            <Link to={paths.root}>
              <img src={imagePaths.logo} alt="taskido logo" />
            </Link>
          </div>
          <div className="content_wrapper">
            <div className="avatar_container">
              <img src={imagePaths.avatar} alt="avatar" />
            </div>
            <p className="welcome_message">Welcome</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
