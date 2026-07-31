import { Input } from "antd"
import { useState } from "react"

const FilterServer = ({ handleSearchChange}) => {
    return (
        <Input
            placeholder="search servers by hostname..."
            allowClear
            onChange={(e) => handleSearchChange(e.target.value)}
            style={{ width: '250px', maxWidth: '300px' }}
        />
    )
}

export default FilterServer