import { HEADING } from '../../constants/header';
import './header.scss';

export const Header = () => {
  return (
    <header className="header">
      <h1 className="header_title">{ HEADING.TITLE }</h1>
      <p className="header_description">{ HEADING.DESCRIPTION }</p>
    </header>
  )
};
