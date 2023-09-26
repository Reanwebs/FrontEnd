import UsersChart from "../UsersChart/UsersChart";
import PageTitle from "../PageTitle/PageTitle";
import BasicDetails from "../BasicDetails/BasicDetails";

const Dashboard = ()=>{
    return (
        <div className=" w-full">
        <div className=" rounded-lg dark:border-gray-700 mt-14">
        <PageTitle title={'Admin Dashboard'}/>
        <BasicDetails/>
        <div className="flex-col w-full md:w-1/4">    
              <div className="flex justify-center mb-2">
                <h1 className="font-bold text-xl">Users</h1>
              </div>
              <UsersChart />
              
            </div>
        </div>
        </div>
       
    )
}

export default Dashboard;