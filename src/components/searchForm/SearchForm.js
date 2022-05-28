import React, { useState } from 'react'
import { Select, Space, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const styles = {
  space: {
    marginBottom: '10px',
    float: 'right'
  },
  select: {
    width: '100px'
  }
}

const SearchForm = ({ selectSearch, callback }) => {
  const [searchType, setSearchType] = useState('all')
  const selectOptions = Object.assign([], selectSearch)
  const handelSelectChange = (value) => {
    setSearchType(value)
  }
  const handleSearch = (value) => {
    const searchModel = {
      search_type: searchType,
      search_word: value
    }
    callback(searchModel)
  }

  return (
    <>
      <Space style={styles.space}>
        <Select
          defaultValue="all"
          style={styles.select}
          onChange={handelSelectChange}
        >
          {selectOptions.map((item) => (
            <Select.Option key={item.value} value={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
        <Input.Search
          placeholder="검색어를 입력해주세요."
          enterButton="검색"
          allowClear
          size="middle"
          suffix={<SearchOutlined />}
          onSearch={handleSearch}
        />
      </Space>
    </>
  )
}

export default SearchForm
