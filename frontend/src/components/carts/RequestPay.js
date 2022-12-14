import React,{useState} from 'react'
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { getPayId, completePay } from '../../api/pay';
import Alert from '../../components/Alert';

const StyledButton = styled.button`
  color: white;
  background-color: #ff2c55;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  width: 100%;
  height: 42px;
  border: none;
  cursor: pointer;
  &:hover {
    z-index: 100;
  }
`;

const RequestPay= (props)=> {

  const [modalOpen, setModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState('');
  const [modalMain, setModalMain] = useState('');

  const navigate = useNavigate();
  const requestPay = async () => {

    const { IMP } = window;
    IMP.init('imp73882568');
    
    /* 주문 이름 생성 */
    var pay_name="[CHUKKA]";
    if(props.payList.length > 1){
      pay_name += ` ${props.payList[0].lecTitle} 외 ${props.payList.length-1} 건`;
    }else if(props.payList.length == 1){
      pay_name += ` ${props.payList[0].lecTitle}` ;
    }else{
      setModalHeader('결제');
      setModalMain('결제할 강의를 선택해주세요.');
      openModal();
      return;
    }
    /* 주문번호 생성 */
    var merchant_uid ="";
    await getPayId().then((res)=>{

      merchant_uid = res.data;
    })
    console.log("주문번호 생성");
    /* 주문 강의 id 정보 */
    const payLecList = props.payList.map(item=> item.lecId);

    // IMP.request_pay(param, callback) 결제창 호출
    IMP.request_pay({ // param

      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: merchant_uid,
      name: pay_name, 
      amount: 100,
      buyer_email: props.user.userEmail,
      buyer_name: props.user.userName,
      buyer_tel: props.user.userPhone,
      buyer_addr: "",
      buyer_postcode: ""

    }, (res) => { // callback
      if (res.success) {
        console.log("결제 완료");
        /*
        결제 정보 DB에 저장하기
        */
        const data = {
          merchantUid: res.merchant_uid,
          payAmount: 100,
          payLecList: payLecList,
          payMethod: "card",
          payUid: res.imp_uid,
          userId: props.user.userId,
        }
        
        completePay(data).then((response)=>{
          if(response.message === "Success"){
            console.log("결제 정보 저장 완료");
            navigate("/accounts/pay",{state :{ list : props.payList, amount : res.paid_amount, merchant_uid:res.merchant_uid, user : props.user}});
          }else{
            setModalHeader('결제 에러');
            setModalMain('죄송합니다. 다시 시도해 주시기 바랍니다.');
            openModal();
          }
        });
      } else {
        setModalHeader('결제 에러');
        setModalMain('죄송합니다. 다시 시도해 주시기 바랍니다.');
        openModal();
      }
    });
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Alert open={modalOpen} close={closeModal} header={modalHeader}>
        {modalMain}
      </Alert>
    <StyledButton onClick={()=>requestPay(props)}>결제하기</StyledButton>
    </div>
  );
  
}

export default RequestPay;