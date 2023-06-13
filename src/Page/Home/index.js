import {useState} from 'react'
import { 
  DatePicker,
  Input,
  Button,
  Tag,
  Spin,
  message,
} from 'antd';
import dayjs from 'dayjs';

import { 
  UserOutlined,
  PayCircleOutlined,
  EnvironmentOutlined,
  SearchOutlined,
  } from '@ant-design/icons';
  import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './index.css';
const { RangePicker } = DatePicker;

function Home() {
  const navigate = useNavigate();
  const [placeValue, setPlaceValue] = useState('');
  const [peopleNumber, setPeopleNumber] = useState(0);
  const [budget, setBudget] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [wants, setWants] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  // const formData = {
  //   "model": "gpt-3.5-turbo",
  //   "messages": [
  //     {
  //       "role": "user", 
  //       "content": `你是一名专业的旅行规划师。你在帮助我规划我的旅行。
  //       参与的人数是${peopleNumber}个成人。
  //       旅行从${startDate}开始，${endDate}结束。
  //       我想从${placeValue}出发，进行国内旅行，
  //       总预算约为人民币${budget}元。
  //       在旅行期间，我希望${wants}。
  //       \n\n请为我推荐一个目的地，并提供一份详尽的旅行计划，包括每天的行程地点和时间安排，和具体的酒店、航空公司和餐厅推荐，费用应在预算范围内。
  //       计划应包括早餐、午餐和晚餐的地点。如果可能的话，请在同一家酒店住宿。
  //       \n\n最后，请根据计划用markdown格式制作一张时间表并附在最后，
  //       时间表需符合以下要求：\n\n总共4列\n第一列是日期\n第二列是时间段\n第三列是活动\n第四列是预算`
  //     }
  //   ]
  // };

  const azureFormData = {
    "messages": [
        {
            "role": "user",
            "content": `你是一名专业的旅行规划师。你在帮助我规划我的旅行。
            参与的人数是${peopleNumber}个成人。
            旅行从${startDate}开始，${endDate}结束。
            我想从${placeValue}出发，进行国内旅行，
            总预算约为人民币${budget}元。
            在旅行期间，我希望${wants}。
            \n\n请为我推荐一个目的地，并提供一份详尽的旅行计划，包括每天的行程地点和时间安排，和具体的酒店、航空公司和餐厅推荐，费用应在预算范围内。
            计划应包括早餐、午餐和晚餐的地点。如果可能的话，请在同一家酒店住宿。\n\n最后，请制作一张表格，需符合以下要求：\n总共4列\n第一列是日期\n第二列是时间段\n第三列是活动\n第四列是预算`
        }
    ]
}

  const handlePlaceValue = (e) => {
    setPlaceValue(e.target.value);
  };

  const handlePeopleNumber = (e) => {
    setPeopleNumber(e.target.value);
  }

  const handleBudget = (e) => {
    setBudget(e.target.value);
  }

  const handleDate = (date, dateString) => {
    if (dateString) {
      const start = dateString[0].split('-');
      const end = dateString[1].split('-');
      setStartDate(`${start[0]}年${start[1]}月${start[2]}日`);
      setEndDate(`${end[0]}年${end[1]}月${end[2]}日`);
    }
  }

  const handleWants = (e) => {
    setWants(e.target.value);
  }

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  let list = [];
  const selectTag1 = () => {
    list.push('烧烤')
    list = unique(list);
    console.log(list)
  };

  const selectTag2 = () => {
    list.push('看日出')
    list = unique(list);
    console.log(list)
  };

  const selectTag3 = () => {
    list.push('吃海鲜')
    list = unique(list);
    console.log(list)
  };

  const selectTag4 = () => {
    list.push('登山')
    list = unique(list);
    console.log(list)
  };

  const selectTag5 = () => {
    list.push('游泳')
    list = unique(list);
    console.log(list)
  };

  const selectTag6 = () => {
    list.push('露营')
    list = unique(list);
    console.log(list)
  };

  const selectTag7 = () => {
    list.push('滑雪')
    list = unique(list);
    console.log(list)
  };

  const selectTag8= () => {
    list.push('潜水')
    list = unique(list);
    console.log(list)
  };

  const selectTag9 = () => {
    list.push('徒步')
    list = unique(list);
    console.log(list)
  };

  const unique = (arr) => {
    return Array.from(new Set(arr))
  }

  const clickConfirm = () => {
    setLoading(true);
    // const plusToken = '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';
    // const defaultToken = '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';
    // axios({
    //   url: "https://api.openai.com/v1/chat/completions",
    //   method: "POST",
    //   headers: {
    //     // authorization: `Bearer ${plusToken}`,
    //     authorization: `Bearer ${defaultToken}`,
    //   },
    //   data: formData,
    // })
    // .then((res) => {
    //   console.log('res', res);
    //   setLoading(false);
    //   console.log('res.data.choices[0].message.content',res.data.choices[0].message.content);
    //   if (res && res.data && res.data.choices && res.data.choices[0] && res.data.choices[0].message && res.data.choices[0].message.content) {
    //     localStorage.setItem('data', res.data.choices[0].message.content);
    //     navigate('/plan');
    //   }
    // })
    // .catch((err) => { 
    //   console.log('err', err);
    // });

    // azure API
    const azureApiKey = '';
    axios({
      url: "https://aigcopencommunity.openai.azure.com/openai/deployments/gpt_35_turbo/chat/completions?api-version=2023-05-15",
      method: "POST",
      headers: {
        'api-key': `${azureApiKey}`,
      },
      data: azureFormData,
    })
    .then((res) => {
      console.log('res', res);
      if (res.status === 200) {
        setLoading(false);
        if (res && res.data && res.data.choices && res.data.choices[0] && res.data.choices[0].message && res.data.choices[0].message.content) {
          localStorage.setItem('data', res.data.choices[0].message.content);
          navigate('/plan');
        }
      }
    })
    .catch((err) => { 
      setLoading(false);
      messageApi.open({
        type: 'error',
        content: err.message,
        duration: 6,
      });
      console.log('err', err);
    });
  };

  return (
    <Spin spinning={loading} tip="加载中..." size="large">
      {contextHolder}
      <div className="Home">
        <div className='home-wrapper'>
        <div className='header-wrapper'>
          <Input placeholder="出发地" className='hader-input' prefix={<EnvironmentOutlined/>} onChange={handlePlaceValue}/>
          <div className='header-time'>
            <RangePicker className='header-time-range' locale={locale} onChange={handleDate} disabledDate={disabledDate}/>
          </div>
          <Input placeholder="人数" className='hader-input' prefix={<UserOutlined />} onChange={handlePeopleNumber}/>
          <Input placeholder="预算" className='hader-input' prefix={<PayCircleOutlined />} onChange={handleBudget}/>
        </div>
        <div className='main-wrapper'>
          <div className='title'>我想。。。</div>
          <div className='search-wrapper'>
            <Input placeholder="请以顿号分隔" className='main-input' prefix={<SearchOutlined />} onChange={handleWants}/>
            <Button type="primary" className='confiim-button' onClick={clickConfirm}>确认</Button>
          </div>
          <div className='tag-list'>
            <Tag color="red" className='tag-item-bbq' onClick={selectTag1}>烧烤</Tag>
            <Tag color="volcano" className='tag-item-sun' onClick={selectTag2}>看日出</Tag>
            <Tag color="orange" className='tag-item-fish' onClick={selectTag3}>吃海鲜</Tag>
            <Tag color="gold" className='tag-item-climb' onClick={selectTag4}>登山</Tag>
            <Tag color="lime" className='tag-item-swim' onClick={selectTag5}>游泳</Tag>
            <Tag color="purple" className='tag-item-capping' onClick={selectTag6}>露营</Tag>
            <Tag color="geekblue" className='tag-item-ski' onClick={selectTag7}>滑雪</Tag>
            <Tag color="blue" className='tag-item-water' onClick={selectTag8}>潜水</Tag>
            <Tag color="green" className='tag-item-walk' onClick={selectTag9}>徒步</Tag>
          </div>
        </div>
        </div>
    </div>
    </Spin>
  );
}

export default Home;
