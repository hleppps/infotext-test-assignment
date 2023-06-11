import clsx from 'clsx';
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

import styles from './styles.module.scss';

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: FC<ButtonProps> = ({ className, ...rest }) => {
  const buttonClassName = clsx(styles.button, className);
  return <button className={buttonClassName} {...rest}></button>;
};
