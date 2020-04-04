import React from 'react';
import styles from './filter.module.css'

const Filter = ({filter, filterContact}) => (
    <div className={styles.filter}>
    <p className={styles.filterP}>Find contact by name</p>
    <input className={styles.filterInput} onChange={filterContact}
    type="text"
    name="filter"/>
    </div>
);

export default Filter;