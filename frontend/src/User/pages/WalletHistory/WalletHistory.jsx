import { RingLoader } from "react-spinners"
import { useGetWalletHistoryMutation } from "../../slices/api_slices/userMonetizationApiSlice"
import { useEffect,useState } from "react"
import {BsCoin} from "react-icons/bs"
import { useSelector } from "react-redux"
import moment from "moment"

const WalletHistory = ()=>{
    
    const [wallet,setWallet] = useState([])
    const [walletHistory,{isLoading}] = useGetWalletHistoryMutation()
    const userInfo = useSelector((state)=>state.auth.userInfo)


    useEffect(()=>{
        async function getWalletHistory(){
            try {
                const res = await walletHistory({sort:""}).unwrap()
                console.log(res);
            } catch (error) {
                console.log(error);
                
            }
        }
        getWalletHistory()
    },[])
    return (
        isLoading ? <div className="w-full flex justify-center h-full">
        <div className="py-52">
          <RingLoader color="#1bacbf"/>
        </div>
      </div>:
       <section className="h-screen">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
             <div className=" flex flex-col justify-evenly p-10 md:p-12 mb-8">
                <div className="w-full h-16 rounded-lg bg-slate-900 flex items-center content-center justify-center">
                     <div className="w-1/2 items-center text-center">
                        <div className="flex text-center items-center justify-center">
                         <h1 className="font-bold text-xl p-1">Gold :</h1>
                          <h1 className="font-bold text-xl p-1">5</h1>
                          <BsCoin color="#e27b05"/>
                        </div>  
                     </div>
                     <div className="w-px h-8 bg-white">
                     </div>
                     <div className="w-1/2 items-center text-center">
                        <div className="flex text-center items-center justify-center">
                           <h1 className="font-bold text-xl p-1">ReferCode :</h1>
                           <h1 className="font-bold text-l p-1">{userInfo?.referralCode}</h1>
                        </div>
                     </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-3/5 h-12 rounded-lg bg-slate-900 flex items-center content-center justify-center">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                         <tbody>
                         <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                              <th
                                scope="row"
                                className="px-6 py-4 font-bold text-m text-gray-900 whitespace-nowrap dark:text-white"
                              >
                              
                              </th>
                               <td className="px-6 py-4">
                                {moment('2023-10-02T10:30:00').format('MMM Do YYYY')}
                              </td>
                              <td className="px-6 py-4">credit</td>
                              <td className="px-6 py-4">5 coins</td>
                            </tr>
                         </tbody>
                    </table>
                </div>
            </div>
         </div>
        
       </section>
    )
}

export default WalletHistory