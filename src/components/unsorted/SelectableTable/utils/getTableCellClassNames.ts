import clsx from 'clsx';

import styles from '../styles.module.scss';

export const getTableCellClassNames = (
  active: boolean,
  selectable: boolean,
  disabled = false,
) => {
  const defaultClassName = styles.tableCell;
  if (!selectable) {
    return defaultClassName;
  }
  if (active) {
    return clsx(defaultClassName, styles.tableCellActive);
  }

  if (disabled) {
    return clsx(defaultClassName, styles.tableCellDisabled);
  }

  return defaultClassName;
};
