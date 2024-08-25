
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Theme from '../components/Theme';
import { useLocation } from 'react-router';
import { jwtDecode } from "jwt-decode";
import { ChevronDown,} from 'lucide-react';
import { deleteMailResponse, getMailList, getMailMasseges } from '../actions/actions';
import InboxEmailCard from '../components/InboxEmailCard';
import InboxHeader from '../components/InboxHeader';
import SearchBar from '../components/SearchBar';
import LoadingPage from '../components/LoadingPage';
import UserInfo from '../components/UserInfo';
import ReplySection from '../components/ReplySection';
import Modal from './Modal';

const DashBoard = () => {
    const [ColorMode, setColorMode] = useState(true);
    const [data , setData ]= useState([]);
    const [singleMail , setSingleMail ]= useState({});
    const [render , setRender]= useState(false)

    const location = useLocation();
    const [ showEmailDesktop,setShowEmailDesktop]= useState(0)

    let token =localStorage.getItem("reachinbox-auth") || takeToken();
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const fetchData =()=>{
        getMailList(token).then(res => {
        console.log(res)
           setData(res);
            if (res?.length > 0) {
               setSingleMail(res[0]);
                const id = res[0]?.threadId;
                if (id !== undefined)  return getMailMasseges(id);
                else  console.log("error id not found")
                
            } else  console.log("Email not Found")
            
        }).then(messages => setSingleMail(messages))
        .catch(error => console.error('Error:', error));
    }
    
    useEffect(()=>{
      token = location.search.split("?token=")?.join("") ;
      if(token)
      {
        let ParseData = jwtDecode(token);
        localStorage.setItem("reachinbox-auth",JSON.stringify(token));
        localStorage.setItem("reachinbox-auth-firstname",JSON.stringify((ParseData).user.firstName));
        localStorage.setItem("reachinbox-auth-lastname",JSON.stringify((ParseData).user.lastName));
        localStorage.setItem("reachinbox-auth-email",JSON.stringify((ParseData).user.email));
      }
      fetchData()
    },[token,render]);
  
    function takeToken() {
        try {
            const token = localStorage.getItem("reachinbox-auth");
            return token ? JSON.parse(token) : ""; 
        } catch (e) {
            console.log("Error:", e);
            return ""; 
        }
    }

    useEffect(()=>{},[singleMail,showEmailDesktop,isModalOpen])
   
    const handleChangeEmail = (id) => {
        getMailMasseges(id).then(messages =>{
            setSingleMail(messages);
        }) 
        .catch(error => console.error('Error:', error));
    }


    useEffect(() => {
        const handleKeyDown = (event) => {
          if(event.key === "d" || event.key === "D")
          {
            openModal();
          }
        };
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [isModalOpen]);

    const handleChange=(index)=> setShowEmailDesktop(index);

    const deleteEmail =()=>{
        const id = singleMail[0].threadId
        deleteMailResponse(id).then((res)=>{
            alert(`The ${id} has been Deleted Successful`);
            setRender(!render)
            closeModal()
        }).catch(err => alert("Error Please try again"))
        
    }


    let firstName = localStorage.getItem('reachinbox-auth-firstname');
    firstName = firstName ? JSON.parse(firstName):''
    let lastName = localStorage.getItem('reachinbox-auth-lastname') 
    lastName = lastName ? JSON.parse(lastName):''
    const username = firstName ? (firstName[0] + (lastName ? lastName[0] : '')) : '';

    return (
        <div className={`w-full h-full m-auto max-w-[1440px] ${ColorMode ? "bg-black" : "bg-white"} ${ColorMode ? "text-white" : "text-black"} h-10 flex`}>
            <div className='w-[56px] h-screen '>
                <NavBar ColorMode={ColorMode} username = {username} showEmailDesktop={showEmailDesktop} handleChange={handleChange} />
            </div>
            <div  className='w-full max-w-[1383]'>
                <div className={` h-[64px] flex justify-between py-4 pl-8 ${ColorMode ? "bg-[#1F1F1F]" : "bg-white"} border ${ColorMode ? "border-gray-700":"border-gray-300" } `}>
                    <p className={`w-full text-left text-xl ${ColorMode ? "text-white-900" : "text-black-900"} `}>Onebox</p>
                    <div className='w-[210px] h-8 mr-5 flex justify-center items-center gap-5'>
                      <Theme ColorMode={ColorMode} onClick={()=> setColorMode(!ColorMode)} />
                      <div className='flex justify-center items-center gap-2'>
                        <p className='text-[12px]'>Tim's Workspace </p>
                     <span> <ChevronDown /></span>
                    </div>
                    </div>
                </div>
                {
                showEmailDesktop != 5? <LoadingPage/>
                : <div className={`flex border ${ColorMode ? "border-gray-700" : "border-gray-300"} `}>
                    <div className='w-[275px] ml-5  pr-3'>
                        <div className='flex justify-between mt-4 items-center'>
                           <InboxHeader ColorMode={ColorMode}/>
                        </div>
                        <p className='text-left  text-[14px] mt-2.5'>25/25 <span className=' text-[#7F7F7F]'>Inboxes selected</span></p>
                        <div className=' mt-2 h-11 '>
                           <SearchBar ColorMode ={ColorMode}/>
                        </div>
                        <div className='flex justify-between  text-[14px]'>
                            <div className='flex items-center gap-2 '>
                                <p className={`text-blue-500 w-8 h-7 pt-0.5 rounded-2xl ${ ColorMode? 'bg-[#25262B]':'bg-[#e1e7ee]' }`}>26</p>
                                <p>New Replies</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p>Newest</p>
                                <ChevronDown/>
                            </div>
                        </div>
                        <hr className='mt-2.5'/>
                        <div className=' text-left'>
                            {
                                data?.length >0 && data.map((item) =>{
                                    return <div key={item.id}>
                                        <InboxEmailCard ColorMode = {ColorMode} {...item} handleChangeEmail={handleChangeEmail}/>
                                        <hr />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <ReplySection ColorMode={ColorMode} singleMail = {singleMail}/>
                    <UserInfo ColorMode={ColorMode}/>
                </div>
                }
            </div>
            <div>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <div className='w-[440px] h-[240px] text-white '>
                        <div className=' h-full '>
                            <h1 className='text-[24px] font-bold mt-8'>Are you Sure ?</h1>
                            <p className='mt-8 text-[#E8E8E8]'>Your selected email will be deleted.</p>
                            <div className='mt-8 flex justify-center gap-5 '>
                                <button className='w-[120px] h-12 bg-[#25262B] ' onClick={closeModal}>Cancel</button>
                                <button className='w-[140px] h-12 bg-[#FA5252] ' onClick={deleteEmail}>Delete</button>
                            </div>
                        </div>
                    </div>
                </Modal>

            </div>
        </div>
    );
}


export default DashBoard 
