import React, { useState } from 'react';
import { FilterTwoTone } from '@ant-design/icons';
import { Dropdown } from 'antd';

const FilterUser = ({ onSelectRole }) => {
    const [open, setOpen] = useState(false);

    const handleMenuClick = ({ key }) => {
        switch (key) {
            case '1':
                onSelectRole('superuser');
                break;
            case '2':
                onSelectRole('admin');
                break;
            case '3':
                onSelectRole('user');
                break;
            case '4':
                onSelectRole('all'); // Clear filter
                break;
            default:
                break;
        }
        setOpen(false); // Close dropdown on select
    };

    const items = [
        { label: 'Superuser', key: '1' },
        { label: 'Admin', key: '2' },
        { label: 'User', key: '3' },
        { type: 'divider' },
        { label: 'Clear Filter', key: '4' }
    ];

    return (
        <Dropdown
            menu={{
                items,
                onClick: handleMenuClick,
            }}
            onOpenChange={(nextOpen) => setOpen(nextOpen)}
            open={open}
            trigger={['click']}
        >
            <a onClick={(e) => e.preventDefault()} style={{ cursor: 'pointer' }}>
                <FilterTwoTone style={{ fontSize: '25px' }} />
            </a>
        </Dropdown>
    );
};

export default FilterUser;