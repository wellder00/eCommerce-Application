import classNames from 'classnames';

import styles from './Button.module.scss';

type BtnProps = {
  children?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<BtnProps> = ({ children, onClick, disabled, className }) => (
  <button
    className={classNames(styles.root, className, {
      [styles.disabled]: disabled,
    })}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
