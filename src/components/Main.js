import React, { useEffect, useState } from 'react'
import { Table, Input } from 'antd';
import { SearchOutlined } from "@ant-design/icons"


const  Main = ({getBookAction, books}) => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState(null)
  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          "https://fakestoreapi.com/products"
        )
      ).json();

      // set state when the data received
      setData(data);
    };

    dataFetch();
    console.log(data)
  }, [])

  const FilterByNameInput = (
    <div style={{textAlign: "center"}}>
      Title
      <hr />
      <Input
        placeholder="Search Name"
        value={value}
        onChange={e => {
          const currValue = e.target.value;
          setValue(currValue);
          const filteredData = data.filter(entry => 
              entry.title.toLowerCase().includes(currValue.toLowerCase())
          );
          setFilteredData(filteredData);
        }}
      />
    </div>
  );

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      width: '10%'
    },
    {
      title: FilterByNameInput,
      dataIndex: 'title',
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.title.toLowerCase().includes(value.toLowerCase()),
      width: '20%',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '20%',
    },
    {
      title: 'price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      width: "10%"
    },
    {
      title: 'image',
      dataIndex: 'image',
      render: theImageURL => <img alt={theImageURL} src={theImageURL} key={theImageURL} />
    },
    {
      title: 'rating',
      dataIndex: 'rating',
      sorter: (a, b) => a.rating.rate - b.rating.rate,
      render: rates => <p>{rates.rate}</p>
    },
  ];
  
  
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  
  
  return (
    <div>
       <Table columns={columns} dataSource={filteredData ? filteredData : data} onChange={onChange} />
    </div>
  )
}


export default  Main
