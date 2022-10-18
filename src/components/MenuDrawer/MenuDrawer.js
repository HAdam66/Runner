import ClassName from '../../helpers/classname';
import styles from './MenuDrawer.module.css';
import { useEffect } from 'react';

const NOSCROLL_CLASS = 'noscroll';

const MenuDrawer = ({ open, children }) => {
  const containerClassName = new ClassName(styles.container);

  useEffect(() => {
    if (open) {
      document.body.classList.add(NOSCROLL_CLASS);
    } else {
      document.body.classList.remove(NOSCROLL_CLASS);
    }
  }, [open]);

  containerClassName.addIf(styles.open, open);

  return <div className={containerClassName.toString()}>{children}</div>;
};

export default MenuDrawer;
